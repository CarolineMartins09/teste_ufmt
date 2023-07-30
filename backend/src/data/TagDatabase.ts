import { BaseDataBase } from "./BaseDatabase";
export interface TagCount {
    tag: string;
    count: number;
  }

export class TagDatabase extends BaseDataBase{
  private static TABLE_NAME= "tags";
    saveTag = async(url:string, tagCount: TagCount[]):Promise<void>=>{
        try {
          const values = tagCount.map((tagCount) => ({
            url:url,
            tag: tagCount.tag,
            count: tagCount.count,
          }));       
          await TagDatabase.connection(TagDatabase.TABLE_NAME).insert(values);

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
          }
        }
      
      getAllTag = async(url:string)=>{
        try{
          const result = await TagDatabase.connection.raw(`
            SELECT tag, count FROM ${TagDatabase.TABLE_NAME} WHERE url="${url}"
          
          `)
          return result[0]
        }catch(error:any){
          throw new Error(error.sqlMessage || error.message);
        }
      }
        
      }
