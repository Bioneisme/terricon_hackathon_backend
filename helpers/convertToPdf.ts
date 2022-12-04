import PDFDocument from "pdfkit";
import * as fs from "fs";
import {Doctors, MedicalForms} from "../entities";
import moment from "moment";
import {v2 as cloudinary} from 'cloudinary'
import {CLOUD_API_KEY, CLOUD_API_SECRET, CLOUD_NAME} from "../config/settings";
import logger from "../config/logger";

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET,
    secure: true
});

const exceptions = ['original_text', 'translated_text', 'created_at', 'updated_at', 'id', 'toJSON', 'pdf_url', 'doctor',
    'form_type', 'ptn_name', 'ptn_address', 'ptn_iin', 'ptn_number', 'ptn_dd', 'ptn_gender']

export async function convertToPdf(obj: MedicalForms, doctor: Doctors): Promise<string> {
    try {
        const doc = new PDFDocument({autoFirstPage: false, size: 'A4'});
        moment.locale('ru');

        doc.pipe(fs.createWriteStream(`doc.pdf`));

        doc.addPage();

        doc.font('./fonts/Montserrat-Regular.ttf');

        doc.fontSize(27)
            .text(`Медицинская запись`, 100, 100);

        doc.fontSize(20)
            .text(`${obj.form_type}`, 100, 123);

        doc.fontSize(10)
            .text(moment(obj.created_at).format('LLLL'));

        doc.lineCap('butt')
            .moveTo(100, 160)
            .lineTo(500, 160)
            .stroke();

        doc.fontSize(12)
            .text(`Доктор: ${doctor.name}, ${doctor.role}`);

        doc.fontSize(12)
            .text(`Пациент: ${obj.ptn_name}`);
        doc.text(`Пол: ${obj.ptn_gender}, Дата рождения: ${obj.ptn_dd}, ИИН: ${obj.ptn_iin}`);
        doc.text(`Адрес: ${obj.ptn_address}, Номер телефона: ${obj.ptn_number}`);

        doc.text("|");
        doc.fontSize(14).text(`Оригинальный текст: `);
        doc.fontSize(10).text(`${obj.original_text}`);
        doc.text("");
        doc.fontSize(14).text(`Переведенный текст:`);
        doc.fontSize(10).text(`${obj.translated_text}`);

        for (let objKey in obj) {
            if (!exceptions.includes(objKey) && obj[objKey as keyof typeof obj]?.toString() != "") {
                doc.fontSize(14).text(`${objKey}:`);
                doc.fontSize(10).text(`${obj[objKey as keyof typeof obj]}`);
            }
        }

        doc.end();
        const res = await cloudinary.uploader.upload(`doc.pdf`);
        return res.url;
    } catch (e) {
        logger.error(`convertToPdf: ${e}`);
        return "";
    }
}