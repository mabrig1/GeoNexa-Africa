import {NextResponse} from 'next/server';
export const runtime='nodejs';
export async function POST(request:Request){
 let body:unknown;try{body=await request.json()}catch{return NextResponse.json({error:'Invalid JSON body'},{status:400})}
 if(!body||typeof body!=='object'||Array.isArray(body))return NextResponse.json({error:'Invalid input'},{status:400});
 const {latitude,longitude}=body as Record<string,unknown>;
 if(typeof latitude!=='number'||typeof longitude!=='number'||!Number.isFinite(latitude)||!Number.isFinite(longitude)||latitude < -90||latitude > 90||longitude < -180||longitude > 180)return NextResponse.json({error:'Valid numeric latitude and longitude are required'},{status:400});
 const warnings=['Global public datasets may have incomplete coverage or coarse resolution in Nigeria.','Map geology and earthquake records cannot establish groundwater depth, mineral reserves or drilling safety.','A qualified geoscientist must verify any interpretation against local surveys.'];
 const nextSteps=['Check the mapped unit and its provenance before interpretation.','Compare with Nigerian Geological Survey Agency mapping and field observations.','Commission site-specific field and geophysical surveys before consequential decisions.'];
 const sources:Record<string,unknown>={};let connected=false;
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),9000);
 try{
  const u=new URL('https://macrostrat.org/api/v2/geologic_units/map');u.searchParams.set('lat',String(latitude));u.searchParams.set('lng',String(longitude));
  const response=await fetch(u.toString(),{signal:controller.signal,headers:{Accept:'application/json'},cache:'no-store'});
  if(!response.ok)throw new Error('Dataset HTTP '+response.status);
  const data:unknown=await response.json();const obj=(data&&typeof data==='object'&&!Array.isArray(data))?data as Record<string,unknown>:{};
  const success=obj.success!==false;const rows=Array.isArray(obj.data)?obj.data:[];
  const units=rows.slice(0,5).map(row=>{if(!row||typeof row!=='object')return {};const r=row as Record<string,unknown>;return {name:typeof r.name==='string'?r.name:null,age:typeof r.age==='string'?r.age:null,lith:typeof r.lith==='string'?r.lith:null,source_id:typeof r.source_id==='number'?r.source_id:null}});
  sources.macrostrat={provider:'Macrostrat',endpoint:u.toString(),attribution:'Macrostrat geologic map API; verify individual source maps and licences.',coverage:rows.length?'records_returned':'no_mapped_unit_returned',units,rawRecordCount:rows.length};
  connected=success&&rows.length>0;
 }catch{sources.macrostrat={provider:'Macrostrat',status:'temporarily_unavailable',message:'External map data could not be retrieved. No geology inferred.'}}finally{clearTimeout(timer)}
 return NextResponse.json({latitude,longitude,status:connected?'Public geological map records retrieved — unverified':'No verified mapped geology returned',geologicalDataConnected:connected,sources,warnings,nextSteps},{headers:{'Cache-Control':'no-store'}});
}
