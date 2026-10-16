import {NextResponse} from 'next/server';
export const runtime='nodejs';
export async function POST(request:Request){
 let body:unknown;
 try {body=await request.json()} catch{return NextResponse.json({error:'Invalid JSON body'},{status:400})}
 if(!body||typeof body!=='object'||Array.isArray(body))return NextResponse.json({error:'Invalid input'},{status:400});
 const value=body as Record<string,unknown>;
 const {latitude,longitude}=value;
 if(typeof latitude!=='number'||typeof longitude!=='number'||!Number.isFinite(latitude)||!Number.isFinite(longitude)||latitude < -90||latitude > 90||longitude < -180||longitude > 180)return NextResponse.json({error:'Valid numeric latitude and longitude are required'},{status:400});
 return NextResponse.json({latitude,longitude,status:'Preliminary checklist only — not a geological assessment',warnings:['No authoritative geological datasets are currently connected.','Coordinates alone cannot determine groundwater depth, mineral deposits, drilling safety or geological hazards.','Location has not been checked against Nigerian administrative boundaries.'],nextSteps:['Confirm coordinates and coordinate reference system.','Identify licensed geological maps and survey data covering this location.','Request field verification by a qualified geoscientist.','Run validated scientific models only after suitable data are available.']},{headers:{'Cache-Control':'no-store'}});
}
