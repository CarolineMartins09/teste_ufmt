import express from "express";
import { TagControlller } from "../controller/TagController";

export const tagRouter = express.Router()

const tagControlller = new TagControlller()

tagRouter.post("/html", tagControlller.saveTag)

