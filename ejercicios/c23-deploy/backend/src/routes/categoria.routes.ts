import { Router } from "express";
import { getAll, create } from "../controllers/categoria.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { categoriaCreateSchema } from "../validations/categoria.validation";

const router = Router();

router.get("/", getAll);
router.post("/", authenticate, authorize("ADMIN"), validate(categoriaCreateSchema), create);

export default router;
