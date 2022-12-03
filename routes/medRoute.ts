import {Router} from "express";
import {analysis, getAllForms, getFormById} from "../controllers/medController";

const router: Router = Router();

router.post('/analysis', analysis);

router.get('/getAllForms', getAllForms);
router.get('/getFormById/:id', getFormById);

export default router;