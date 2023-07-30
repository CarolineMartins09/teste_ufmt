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
          console.log(values);
          
          await TagDatabase.connection(TagDatabase.TABLE_NAME).insert(values);
          console.log("Data inserted successfully.");

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
          }
        }
        
        
      }
