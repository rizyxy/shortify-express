import { Router } from "express";
import redirect from "../controllers/redirect/redirect.controller";

const router = Router();

router.get('/:shortUrl', redirect);

export default router;
