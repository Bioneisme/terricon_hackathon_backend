import {Router} from "express";
import {createRecord, deleteRecordById, getAllRecords, getRecordById} from "../controllers/recordController";

const router: Router = Router();

router.post('/createRecord', createRecord);

router.get('/getAllRecords', getAllRecords);
router.get('/getRecordById/:id', getRecordById);

router.delete('/deleteRecordById/:id', deleteRecordById);

export default router;