import {Router} from "express";
import {analysis, deleteFormById, getAllForms, getFormById} from "../controllers/medController";

const router: Router = Router();

router.post('/analysis', analysis);

router.get('/getAllForms', getAllForms);
router.get('/getFormById/:id', getFormById);

router.delete('/deleteFormById/:id', deleteFormById);

export default router;