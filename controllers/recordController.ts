import {NextFunction, Request, Response} from "express";
import {DI} from "../index";
import {Records} from "../entities";
import logger from "../config/logger";

async function createRecord(req: Request, res: Response, next: NextFunction) {
    try {
        const {title, fields} = req.body;
        const record = DI.em.create(Records, {title, fields: JSON.stringify(fields)});
        await DI.em.persistAndFlush(record);

        res.status(200).send(record);
        return next();
    } catch (e) {
        logger.error(`createRecord controller: ${e}`);
        return next();
    }
}

async function getAllRecords(req: Request, res: Response, next: NextFunction) {
    try {
        const records = await DI.em.find(Records, {});

        if (!records) {
            res.status(400).json({error: true, message: 'Records not found'});
            return next();
        }

        res.status(200).send(records);
        return next();
    } catch (e) {
        logger.error(`getAllRecords controller: ${e}`);
        return next();
    }
}

async function getRecordById(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params;

        const record = await DI.em.findOne(Records, {id: +id});

        if (!record) {
            res.status(400).json({error: true, message: 'Record not found'});
            return next();
        }

        res.status(200).send(record);
        return next();
    } catch (e) {
        logger.error(`getRecordById controller: ${e}`);
        return next();
    }
}

async function deleteRecordById(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params;

        const record = await DI.em.findOne(Records, {id: +id});

        if (!record) {
            res.status(400).json({error: true, message: 'Record not found'});
            return next();
        }

        await DI.em.removeAndFlush(record);

        res.status(200).send(record);
        return next();
    } catch (e) {
        logger.error(`deleteRecordById controller: ${e}`);
        return next();
    }
}


export {createRecord, getAllRecords, getRecordById, deleteRecordById};