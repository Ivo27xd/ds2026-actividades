import { Router } from "express";
import { getAll } from "../controllers/categoria.controller";

const router = Router();

router.get("/", getAll);

export default router;
