import {NextFunction, Request, Response} from "express";
import translate from "google-translate-api-x";
import {textAnalytics} from "../helpers/textAnalytics";
import logger from "../config/logger";
import {DI} from "../index";
import {Doctors, MedicalForms, Records} from "../entities";
import {convertToPdf} from "../helpers/convertToPdf";
import {wrap} from "@mikro-orm/core";

async function translator(data: any): Promise<string[]> {
    try {
        let translatedData: string[] = [];

        const res = await translate(data, {from: 'ru', to: 'en', forceTo: true});
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
        const {data, form_type, doctor_id, ptn_name, ptn_gender, ptn_dd, ptn_number, ptn_address, ptn_iin} = req.body;
        const translatedData: string[] = await translator(data);
        const info = await textAnalytics(translatedData);
        if (info.error || info.data == null) {
            res.status(400).send(info.message);
            return next();
        }

        const doctor = await DI.em.findOne(Doctors, {id: doctor_id});
        if (!doctor) {
            res.status(400).json({error: true, message: 'Incorrect doctor id'});
            return next();
        }

        const record = await DI.em.findOne(Records, {id: form_type});

        const form = DI.em.create(MedicalForms, {
            original_text: data, translated_text: translatedData,
            ptn_number, ptn_name, ptn_gender, ptn_dd, ptn_iin, ptn_address,
            form_type: record?.title || form_type, doctor, ...info.data
        });


        const url = await convertToPdf(form, doctor);

        wrap(form).assign({
            pdf_url: url || ""
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

async function getNumberOfForms(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params;
        const forms = await DI.em.find(MedicalForms, {doctor: +id});
        if (!forms) {
            res.send(0);
        } else {
            res.send(forms.length);
        }
    } catch (e) {
        logger.error(`getNumberOfForms controller: ${e}`);
        return next();
    }
}


export {analysis, getAllForms, getFormById, deleteFormById, getNumberOfForms};