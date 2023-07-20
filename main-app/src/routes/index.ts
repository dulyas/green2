import { postRequest } from "@/controllers/postRequest";
import { Router } from "express";

const router = Router();

router.post("/post-request", postRequest);

export default router;
