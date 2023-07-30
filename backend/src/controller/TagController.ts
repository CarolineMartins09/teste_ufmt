import { Request, Response } from "express";
import { TagBussines } from "../bussines/TagBussines";

const tagBusiness = new TagBussines();

export class TagControlller {

    saveTag = async (req: Request, res: Response) => {

        try {
            const { url } = req.body

            const result = await tagBusiness.saveTagBussines(url)

            res.status(200).send(result)
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    getAllTag = async (req: Request, res: Response) => {
        try {
            const { url } = req.body

            const result = await tagBusiness.getAllTags(url)

            res.status(200).send(result)

        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }


    }
}