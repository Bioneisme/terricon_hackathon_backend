import {DI} from "../index";
import {generateJWT, verifyJWT} from "../helpers/jwt";
import {NextFunction, Request, Response} from "express";
import {UserRequest} from "../types";
import bcryptjs from "bcryptjs";
import {Doctors} from "../entities";
import logger from "../config/logger";

async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const {name, IIN, password, role, id} = req.body;

        if (!name || !password || !IIN || !role) {
            res.status(400).json({error: true, message: 'Missing something'});
            return next();
        }

        const existingUser = await DI.em.findOne(Doctors, {id});

        if (existingUser) {
            res.status(400).json({error: true, message: 'User with this ID already exists'});
            return next();
        }

        const slat = bcryptjs.genSaltSync(10);
        const hashedPassword = await bcryptjs.hash(password, slat);

        const user = DI.em.create(Doctors, {
            IIN,
            id,
            name,
            role,
            password: hashedPassword
        });

        await DI.em.persistAndFlush(user);

        if (!user) {
            res.status(500).json({error: true, message: 'Cannot create user'});
            return next();
        }

        res.status(201).send({...user, token: generateJWT(user.id)});
        return next();
    } catch (e) {
        logger.error(`Register controller: ${e}`);
        return next();
    }
}

async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const {IIN, password} = req.body;

        if (!IIN || !password) {
            res.status(400).json({error: true, message: 'Missing IIN or password'});
            return next();
        }

        const user = await DI.em.findOne(Doctors, {IIN});

        if (!user) {
            res.status(400).json({error: true, message: 'User does not exist'});
            return next();
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(400).json({error: true, message: 'Invalid password'});
            return next();
        }

        res.status(201).send({...(user), token: generateJWT(user.id)});
        return next();
    } catch (e) {
        logger.error(`Login controller: ${e}`);
        return next();
    }
}

async function logout(req: Request, res: Response, next: NextFunction) {
    try {
        (req as UserRequest).user = undefined;
        res.status(200);
        return next();
    } catch (e) {
        logger.error(`Logout controller: ${e}`);
        return next();
    }
}

async function getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
        const id = (req as UserRequest).user?.id;
        const user = await DI.em.findOne(Doctors, {id});

        if (!user) {
            res.status(400).json({error: true, message: 'User not found'});
            return next();
        }

        res.status(200).send(user);
        return next();
    } catch (e) {
        logger.error(`getCurrentUser controller: ${e}`);
        return next();
    }
}

async function validate(req: Request, res: Response, next: NextFunction) {
    try {
        const {token} = req.body;
        const decoded = verifyJWT(token);

        const id: number = (decoded as { id: number }).id;

        const user = await DI.em.findOne(Doctors, {id});
        if (!user) {
            res.status(400).json({error: true, message: 'User not found'});
            return next();
        }
        (req as UserRequest).user = user;

        res.status(200).json({token, user});
        return next();
    } catch (e) {
        logger.error(`Validate controller: ${e}`);
        return next();
    }
}

export {register, login, logout, getCurrentUser, validate};
