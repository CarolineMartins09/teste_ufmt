import { CustomError } from "../error/BaseError";
import { TagCount, TagDatabase } from "../data/TagDatabase";
import * as cheerio from 'cheerio';
import axios from "axios";


const tagDatabase = new TagDatabase()

export class TagBussines {

    saveTagBussines = async (url: string): Promise<any> => {
        try {
            const response = await axios.get(url); //Faz um GET para a URL para obter o conteúdo da página
            const html = response.data; // Carrega o HTML da resposta para que possa ser analisado e manipulado
            const cheerioObjeto = cheerio.load(html); //HTML obtido na resposta é carregado no Cheerio
            const tags: { [tag: string]: number } = {};//armazenar informações sobre as tags HTML encontradas na página.

            cheerioObjeto('*').each((index, element) => { //O '*'seleciona todas as tags HTML na página 
                const tagName = cheerioObjeto(element).prop('tagName');
                if (tagName) {
                    const lowercaseTagName = tagName.toLowerCase();
                    tags[lowercaseTagName] = (tags[lowercaseTagName] || 0) + 1;
                }
            });

            //Método para retornar em pares (chave, valor) em formato de objeto e poder enviar em formato correto ao BD
            const tagCounts: TagCount[] = Object.entries(tags).map(([tag, count]) => ({ tag, count }));

            await tagDatabase.saveTag(url, tagCounts)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }

    getAllTags = async (url: string) => {
        try {
            if (!url) {
                throw new CustomError(400, "Params invalid!");
            }
            const getTag = await tagDatabase.getAllTag(url) //Simples GET para trazer as tags da URL enviada

            return getTag
        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }
}