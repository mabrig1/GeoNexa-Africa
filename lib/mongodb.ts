import {MongoClient, type Db} from 'mongodb';
let clientPromise:Promise<MongoClient>|undefined;
export async function getDatabase():Promise<Db>{const uri=process.env.MONGODB_URI;if(!uri)throw new Error('MONGODB_URI is not configured');if(!clientPromise)clientPromise=new MongoClient(uri,{maxPoolSize:5,serverSelectionTimeoutMS:5000}).connect().catch(e=>{clientPromise=undefined;throw e});const client=await clientPromise;return client.db(process.env.MONGODB_DB_NAME||'geonexa');}
