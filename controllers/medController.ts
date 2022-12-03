import {NextFunction, Request, Response} from "express";
import {translate} from "@vitalets/google-translate-api";
import logger from "../config/logger";
import {textAnalytics} from "../helpers/textAnalytics";

async function analysis(req: Request, res: Response, next: NextFunction) {
    const {data} = req.body;
    const translatedData: string[] = [];
    for (const text of data) {
        try {
            const res = await translate(text, {from: 'ru', to: 'en'});
            translatedData.push(res.text);
        } catch (e) {
            logger.error(`Analysis Translator: ${e}`);
        }
    }
    await textAnalytics(translatedData);
    res.send(translatedData);
    return next();
}

export {analysis};