import {NextFunction, Request, Response} from "express";
import translate from "google-translate-api-x";
import {textAnalytics} from "../helpers/textAnalytics";
import logger from "../config/logger";
import {DI} from "../index";
import {MedicalForms} from "../entities";
import {convertToPdf} from "../helpers/convertToPdf";
import {wrap} from "@mikro-orm/core";

async function translator(data: any): Promise<string[]> {
    try {
        let translatedData: string[] = [];

        const res = await translate(data, {from: 'ru', to: 'en'});
        for (let resKey in res) {
            // @ts-ignore
            translatedData.push(res[resKey].text)
        }

        return translatedData;
    } catch (e) {
        logger.error(`Analysis Translator: ${e}`);
        return translator(data);
    }
}

async function analysis(req: Request, res: Response, next: NextFunction) {
    try {
        const {data, form_type, doctor_id} = req.body;
        const translatedData: string[] = await translator(data);
        const info = await textAnalytics(translatedData);
        if (info.error || info.data == null) {
            res.status(400).send(info.message);
            return next();
        }

        const form = DI.em.create(MedicalForms, {original_text: data, translated_text: translatedData,
            form_type, doctor: doctor_id, ...info.data});

        const url = await convertToPdf(form);
        wrap(form).assign({
            pdf_url: url
        });

        await DI.em.persistAndFlush(form);
        res.send(form);
        return next();
    } catch (e) {
        logger.error(`Analysis: ${e}`);
        res.status(501).json({error: true, message: e});
        return next();
    }
}

async function getAllForms(req: Request, res: Response, next: NextFunction) {
    try {
        const forms = await DI.em.find(MedicalForms, {}, {fields: ['id', 'created_at', 'form_type', 'doctor']});

        if (!forms) {
            res.status(400).json({error: true, message: 'Forms not found'});
            return next();
        }

        res.status(200).send(forms);
        return next();
    } catch (e) {
        logger.error(`getAllForms controller: ${e}`);
        return next();
    }
}

async function getFormById(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params;

        const form = await DI.em.findOne(MedicalForms, {id: +id});

        if (!form) {
            res.status(400).json({error: true, message: 'Form not found'});
            return next();
        }

        res.status(200).send(form);
        return next();
    } catch (e) {
        logger.error(`getFormById controller: ${e}`);
        return next();
    }
}

async function deleteFormById(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params;

        const form = await DI.em.findOne(MedicalForms, {id: +id});

        if (!form) {
            res.status(400).json({error: true, message: 'Form not found'});
            return next();
        }

        await DI.em.removeAndFlush(form);

        res.status(200).send(form);
        return next();
    } catch (e) {
        logger.error(`deleteFormById controller: ${e}`);
        return next();
    }
}


export {analysis, getAllForms, getFormById, deleteFormById};