import {Router} from "express";
import {analysis} from "../controllers/medController";

const router: Router = Router();

router.post('/analysis', analysis);

export default router;