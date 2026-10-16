import {NextResponse} from 'next/server';
import {getDatabase} from '../../../../lib/mongodb';
import {timingSafeEqual} from 'node:crypto';
export const runtime='nodejs';
export async function GET(req:Request){const secret=process.env.GEOCARE_ADMIN_TOKEN;const token=req.headers.get('authorization')?.replace(/^Bearer /,'')||'';if(!secret||secret.length<32||Buffer.byteLength(secret)!==Buffer.byteLength(token)||!timingSafeEqual(Buffer.from(secret),Buffer.from(token)))return NextResponse.json({error:'Unauthorized'},{status:401});try{const db=await getDatabase();await db.command({ping:1});return NextResponse.json({database:'connected'},{headers:{'Cache-Control':'no-store'}})}catch{return NextResponse.json({database:'unavailable'},{status:503,headers:{'Cache-Control':'no-store'}})}}
