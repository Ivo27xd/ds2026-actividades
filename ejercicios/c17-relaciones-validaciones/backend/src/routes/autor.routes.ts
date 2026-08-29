import { Router } from "express";
import { getAll, getById, create, update, remove } from "../controllers/autor.controller";
import { validate, validateParams } from "../middlewares/validate.middleware";
import { autorCreateSchema, autorUpdateSchema } from "../validations/autor.validation";
import { idParamSchema } from "../validations/libro.validation";

const router = Router();

router.get("/", getAll);
router.get("/:id", validateParams(idParamSchema), getById);
router.post("/", validate(autorCreateSchema), create);
router.put("/:id", validateParams(idParamSchema), validate(autorUpdateSchema), update);
router.delete("/:id", validateParams(idParamSchema), remove);

export default router;