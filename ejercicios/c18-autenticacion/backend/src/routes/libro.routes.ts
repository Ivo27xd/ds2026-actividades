import { Router } from "express";
import { getAll, getById, create, update, remove } from "../controllers/libro.controller";
import { validate, validateParams } from "../middlewares/validate.middleware";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { libroCreateSchema, libroUpdateSchema, idParamSchema } from "../validations/libro.validation";

const router = Router();

// Lectura pública
router.get("/", getAll);
router.get("/:id", validateParams(idParamSchema), getById);

// Escritura resguardada (solo ADMIN)
router.post("/", authenticate, authorize("ADMIN"), validate(libroCreateSchema), create);
router.put("/:id", authenticate, authorize("ADMIN"), validateParams(idParamSchema), validate(libroUpdateSchema), update);
router.delete("/:id", authenticate, authorize("ADMIN"), validateParams(idParamSchema), remove);

export default router;