import {NextResponse} from 'next/server';
export function GET(){return NextResponse.json({service:'geonexa-web',status:'ok',scientificEnginesConnected:false,geologicalDataConnected:false},{headers:{'Cache-Control':'no-store'}})}
