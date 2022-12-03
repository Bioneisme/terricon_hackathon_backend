import {Router} from "express";
import {createRecord, getAllRecords, getRecordById} from "../controllers/recordController";

const router: Router = Router();

router.post('/createRecord', createRecord);

router.get('/getAllRecords', getAllRecords);
router.get('/getRecordById/:id', getRecordById);

export default router;