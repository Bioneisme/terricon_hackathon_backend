import {NextFunction, Request, Response} from "express";
import translate from "google-translate-api-x";
import logger from "../config/logger";
import {textAnalytics} from "../helpers/textAnalytics";

async function analysis(req: Request, res: Response, next: NextFunction) {
    try {
        const {data} = req.body;
        let translatedData: string[] = [];
        try {
            const res = await translate(data, {from: 'ru', to: 'en'})
            for (let resKey in res) {
                // @ts-ignore
                translatedData.push(res[resKey].text)
            }
        } catch (e) {
            logger.error(`Analysis Translator: ${e}`);
        }
        await textAnalytics(translatedData);
        res.send(translatedData);
        return next();
    } catch (e) {
        logger.error(`Analysis: ${e}`);
        res.status(501).json({error: true, message: e});
        return next();
    }
}

export {analysis};