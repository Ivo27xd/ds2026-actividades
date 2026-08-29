import { Router } from "express";
import { getAll, getById, create, update, remove } from "../controllers/libro.controller";
import { validate, validateParams } from "../middlewares/validate.middleware";
import { libroCreateSchema, libroUpdateSchema, idParamSchema } from "../validations/libro.validation";

const router = Router();

router.get("/", getAll);
router.get("/:id", validateParams(idParamSchema), getById);
router.post("/", validate(libroCreateSchema), create);
router.put("/:id", validateParams(idParamSchema), validate(libroUpdateSchema), update);
router.delete("/:id", validateParams(idParamSchema), remove);

export default router;