import {Router} from "express";
import {
    getCurrentUser,
    login,
    register,
    validate,
    logout,
    getAllDoctors,
    getDoctorById, deleteDoctorById
} from "../controllers/userController";
import protectedRoute from "../middleware/authMiddleware";

const router: Router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/getMe", protectedRoute, getCurrentUser);
router.get("/getAllDoctors", getAllDoctors);
router.get("/getDoctorById/:id", getDoctorById);

router.delete("/deleteDoctorById/:id", deleteDoctorById);

router.post("/validate", validate);

export default router;