import { CustomError } from "../error/BaseError";
import { TagCount, TagDatabase } from "../data/TagDatabase";
import * as cheerio from 'cheerio';
import axios from "axios";


const tagDatabase = new TagDatabase()

export class TagBussines {

    saveTagBussines = async (url: string): Promise<any> => {
        try {
            const response = await axios.get(url);
            const html = response.data;
            const cheerioObjeto = cheerio.load(html);
            const tags: { [tag: string]: number } = {};

            cheerioObjeto('*').each((index, element) => {
                const tagName = cheerioObjeto(element).prop('tagName');
                if (tagName) {
                    const lowercaseTagName = tagName.toLowerCase();
                    tags[lowercaseTagName] = (tags[lowercaseTagName] || 0) + 1;
                }
            });

            const tagCounts: TagCount[] = Object.entries(tags).map(([tag, count]) => ({ tag, count }));

            await tagDatabase.saveTag(url, tagCounts)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }

    getAllTags = async (url: string) => {
        try {
            if(!url){
                throw new CustomError(400, "Body invalid! 'url'");
            }
            const getTag = await tagDatabase.getAllTag(url)
        
            return getTag
        } catch (error: any) {
            throw new CustomError(400, error.message);
        }

    }
}