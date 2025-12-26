import { Router } from "express";
import { createLink, getLinks, deleteLink } from "../controllers/link/link.controller";

const router = Router();

router.get('/', getLinks);
router.post('/create', createLink);
router.delete('/delete', deleteLink);

export default router;