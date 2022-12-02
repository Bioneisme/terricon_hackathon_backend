import {DI} from "../index";
import {generateJWT, verifyJWT} from "../helpers/jwt";
import {NextFunction, Request, Response} from "express";
import {UserRequest} from "../types";
import bcryptjs from "bcryptjs";
import {Users} from "../entities";

async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const {name, email, password, repeat_password} = req.body;

        if (!name || !password || !name) {
            res.status(400).send("Missing name, email or password");
            return next();
        }

        if (password != repeat_password) {
            res.status(400).send("Passwords don't match");
            return next();
        }

        const existingUser = await DI.em.findOne(Users, {email});

        if (existingUser) {
            res.status(400).send("User already exists");
            return next();
        }

        const slat = bcryptjs.genSaltSync(10);
        const hashedPassword = await bcryptjs.hash(password, slat);

        const user = DI.em.create(Users, {
            email,
            name,
            password: hashedPassword
        });

        await DI.em.persistAndFlush(user);

        if (!user) {
            res.status(500).send("Cannot create user");
            return next();
        }

        res.status(201).send({...user, token: generateJWT(user.id)});
        return next();
    } catch (e) {
        return next();
    }
}

async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            res.status(400).send("Missing email or password");
            return next();
        }

        const user = await DI.em.findOne(Users, {email});

        if (!user) {
            res.status(400).send("User does not exist");
            return next();
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(400).send("Invalid password");
            return next();
        }

        res.status(201).send({...(user), token: generateJWT(user.id)});
        return next();
    } catch (e) {
        return next();
    }
}

async function logout(req: Request, res: Response, next: NextFunction) {
    try {
        (req as UserRequest).user = undefined;
        res.status(200);
        return next();
    } catch (e) {
        return next();
    }
}

async function getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
        const id = (req as UserRequest).user?.id;
        const user = await DI.em.findOne(Users, {id});

        if (!user) {
            res.status(404).send("User not found");
            return next();
        }

        res.status(200).send(user);
        return next();
    } catch (e) {
        return next();
    }
}

async function validate(req: Request, res: Response, next: NextFunction) {
    try {
        const {jwt} = req.body;
        const decoded = verifyJWT(jwt);

        const id: number = (decoded as { id: number }).id;

        const user = await DI.em.findOne(Users, {id});
        if (!user) {
            res.status(400).send("User not found");
            return next();
        }
        (req as UserRequest).user = user;

        res.status(200).json({jwt, user});
        return next();
    } catch (e) {
        return next();
    }
}

export {register, login, logout, getCurrentUser, validate};
