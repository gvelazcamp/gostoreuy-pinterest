// Sandbox only. Never change to live until delivery, licensing, taxes and security are ready.
const CATALOG = {
  "Stickers:assets/sticker-thumbs/stickers-dragon-ball.webp": {
    "title": "Dragon Ball",
    "cents": 299
  },
  "Stickers:assets/sticker-thumbs/stickers-dexter.webp": {
    "title": "El laboratorio de Dexter",
    "cents": 299
  },
  "Stickers:assets/sticker-thumbs/stickers-garfield.webp": {
    "title": "Garfield",
    "cents": 299
  },
  "Stickers:assets/sticker-thumbs/stickers-snoopy.webp": {
    "title": "Snoopy",
    "cents": 299
  },
  "Stickers:assets/sticker-thumbs/stickers-gatitos-kawaii.webp": {
    "title": "Gatitos kawaii",
    "cents": 299
  },
  "Stickers:assets/sticker-thumbs/stickers-perros-aventureros.webp": {
    "title": "Perros aventureros",
    "cents": 299
  },
  "Stickers:assets/sticker-thumbs/stickers-dinosaurios-tiernos.webp": {
    "title": "Dinosaurios tiernos",
    "cents": 299
  },
  "Stickers:assets/sticker-thumbs/stickers-espacio-magico.webp": {
    "title": "Espacio mágico",
    "cents": 299
  },
  "Stickers:assets/sticker-thumbs/stickers-comida-feliz.webp": {
    "title": "Comida feliz",
    "cents": 299
  },
  "Stickers:assets/sticker-thumbs/stickers-verano.webp": {
    "title": "Verano tropical",
    "cents": 299
  },
  "Stickers:assets/sticker-thumbs/stickers-flores-mariposas.webp": {
    "title": "Flores y mariposas",
    "cents": 299
  },
  "Stickers:assets/sticker-thumbs/stickers-gaming-retro.webp": {
    "title": "Gaming retro",
    "cents": 299
  },
  "Stickers:assets/sticker-thumbs/stickers-monstruos-divertidos.webp": {
    "title": "Monstruos divertidos",
    "cents": 299
  },
  "Stickers:assets/sticker-thumbs/stickers-vehiculos.webp": {
    "title": "Vehículos kawaii",
    "cents": 299
  },
  "Hojas ilustradas:cuaderno-pluto.svg": {
    "title": "Pluto",
    "cents": 199
  },
  "Hojas ilustradas:cuaderno-zorrito-bosque.svg": {
    "title": "Zorrito del bosque",
    "cents": 199
  },
  "Hojas ilustradas:cuaderno-garfield.png": {
    "title": "Garfield",
    "cents": 199
  },
  "Hojas ilustradas:cuaderno-snoopy.png": {
    "title": "Snoopy",
    "cents": 199
  },
  "Remeras:assets/remeras/johnny-bravo.webp": {
    "title": "Johnny Bravo · HUNK",
    "cents": 399
  },
  "Remeras:assets/remeras/breaking-bad.webp": {
    "title": "Breaking Bad",
    "cents": 399
  },
  "Remeras:assets/remeras/the-mask.webp": {
    "title": "The Mask",
    "cents": 399
  },
  "Remeras:assets/remeras/kairo.webp": {
    "title": "Kairo · Blazen · Dravaron",
    "cents": 399
  },
  "Remeras:assets/remeras/goku.webp": {
    "title": "Dragon Ball Z · Goku",
    "cents": 399
  },
  "Remeras:assets/remeras/super-saiyan.webp": {
    "title": "Dragon Ball Z · Super Saiyan",
    "cents": 399
  },
  "Libros para colorear:colorear/portada-goku.png": {
    "title": "Goku",
    "cents": 499
  },
  "Libros para colorear:colorear/portada-vegeta.png": {
    "title": "Vegeta",
    "cents": 499
  },
  "Libros para colorear:colorear/portada-piccolo.png": {
    "title": "Piccolo",
    "cents": 499
  },
  "Libros para colorear:colorear/portada-gohan.png": {
    "title": "Gohan",
    "cents": 499
  },
  "Libros para colorear:colorear/portada-trunks.png": {
    "title": "Trunks",
    "cents": 499
  },
  "Dibujá y revelá:assets/paisajes-a4/01-nueva-york.webp": {
    "title": "Nueva York",
    "cents": 199
  },
  "Dibujá y revelá:assets/paisajes-a4/02-paris.webp": {
    "title": "París",
    "cents": 199
  },
  "Dibujá y revelá:assets/paisajes-a4/03-londres.webp": {
    "title": "Londres",
    "cents": 199
  },
  "Dibujá y revelá:assets/paisajes-a4/04-venecia.webp": {
    "title": "Venecia",
    "cents": 199
  },
  "Dibujá y revelá:assets/paisajes-a4/05-japon.webp": {
    "title": "Japón",
    "cents": 199
  },
  "Dibujá y revelá:assets/paisajes-a4/06-egipto.webp": {
    "title": "Egipto",
    "cents": 199
  },
  "Dibujá y revelá:assets/paisajes-a4/07-china.webp": {
    "title": "China",
    "cents": 199
  },
  "Dibujá y revelá:assets/paisajes-a4/08-rio-de-janeiro.webp": {
    "title": "Río de Janeiro",
    "cents": 199
  },
  "Dibujá y revelá:assets/paisajes-a4/09-paises-bajos.webp": {
    "title": "Países Bajos",
    "cents": 199
  },
  "Dibujá y revelá:assets/paisajes-a4/10-santorini.webp": {
    "title": "Santorini",
    "cents": 199
  },
  "Remeras:remera-tom-jerry-campo.png": {
    "title": "Tom y Jerry",
    "cents": 399
  },
  "Dibujá y revelá:assets/revela-portada.webp": {
    "title": "Mascotas tiernas · Colección",
    "cents": 499
  },
  "Dibujá y revelá:assets/paisaje-a4-guia.webp": {
    "title": "Valle de las cascadas",
    "cents": 199
  }
};
const SITE='https://gvelazcamp.github.io/gostoreuy-pinterest/';
const ORIGIN=new URL(SITE).origin;
const BASE='https://api-m.sandbox.paypal.com';
const headers={'Access-Control-Allow-Origin':ORIGIN,'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'content-type','Vary':'Origin','Cache-Control':'no-store','Content-Type':'application/json'};
const reply=(body,status=200)=>new Response(JSON.stringify(body),{status,headers});
const cents=n=>(n/100).toFixed(2);
const enc=new TextEncoder();
const b64url=bytes=>btoa(String.fromCharCode(...bytes)).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');
const un64=s=>Uint8Array.from(atob(s.replaceAll('-','+').replaceAll('_','/').padEnd(Math.ceil(s.length/4)*4,'=')),c=>c.charCodeAt(0));
async function key(){const secret=Deno.env.get('CHECKOUT_SIGNING_KEY');if(!secret||secret.length<32)throw Error('Missing signing key');return crypto.subtle.importKey('raw',enc.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign','verify'])}
async function sign(payload){const data=b64url(enc.encode(JSON.stringify(payload)));return data+'.'+b64url(new Uint8Array(await crypto.subtle.sign('HMAC',await key(),enc.encode(data))))}
async function verify(token){if(typeof token!=='string'||token.length>12000)throw Error('Invalid token');const parts=token.split('.');if(parts.length!==2||!await crypto.subtle.verify('HMAC',await key(),un64(parts[1]),enc.encode(parts[0])))throw Error('Invalid token');const data=JSON.parse(new TextDecoder().decode(un64(parts[0])));if(data.exp<Date.now())throw Error('Expired order');return data}
async function access(){const id=Deno.env.get('PAYPAL_CLIENT_ID')?.trim(),secret=Deno.env.get('PAYPAL_CLIENT_SECRET')?.trim();if(!id||!secret)throw Error('Missing PayPal settings');const r=await fetch(BASE+'/v1/oauth2/token',{method:'POST',headers:{Authorization:'Basic '+btoa(id+':'+secret),'Content-Type':'application/x-www-form-urlencoded'},body:'grant_type=client_credentials'});const d=await r.json();if(!r.ok||!d.access_token){const code=['invalid_client','invalid_request','unauthorized_client','invalid_grant','unsupported_grant_type','invalid_scope','server_error','temporarily_unavailable'].includes(d.error)?d.error:'unknown';throw Error('PayPal auth failed: HTTP '+r.status+' '+code)}return d.access_token}
async function paypal(path,token,method='GET',body,requestId){const h={Authorization:'Bearer '+token,'Content-Type':'application/json',Prefer:'return=representation'};if(requestId)h['PayPal-Request-Id']=requestId;const r=await fetch(BASE+path,{method,headers:h,...(body===undefined?{}:{body:JSON.stringify(body)})});return {ok:r.ok,data:await r.json()}}
function verifyAmount(order,total){const u=order.purchase_units;if(!Array.isArray(u)||u.length!==1||u[0].custom_id!=='gostoreuy-sandbox'||u[0].amount?.currency_code!=='USD'||u[0].amount?.value!==cents(total))throw Error('Order mismatch');return u[0]}
// Private stickers: only signed, completed Sandbox orders can receive download URLs.
async function deliverStickers(signed,captureId){
 const ids=signed.ids.filter(id=>id.startsWith('Stickers:'));
 if(!ids.length)return {delivery:false,downloads:[],deliveryPending:false,undelivered:signed.ids.length};
 const base=Deno.env.get('SUPABASE_URL'),key=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
 if(!base||!key)throw Error('Delivery configuration missing');
 const h={Authorization:'Bearer '+key,apikey:key,'Content-Type':'application/json'};
 const receipt=await fetch(base+'/rest/v1/sticker_sandbox_orders?on_conflict=order_id',{method:'POST',headers:{...h,Prefer:'resolution=ignore-duplicates,return=minimal'},body:JSON.stringify({order_id:signed.orderId,capture_id:captureId,total_cents:signed.total,product_ids:signed.ids,mode:'sandbox'})});
 if(!receipt.ok)throw Error('Receipt storage failed');
 const downloads=[];
 for(const id of ids){
  const q=new URLSearchParams({select:'title,object_path,price_cents',product_id:'eq.'+id,file_ready:'eq.true'});
  const res=await fetch(base+'/rest/v1/sticker_catalog?'+q,{headers:h});
  if(!res.ok)throw Error('Sticker catalog lookup failed');
  const rows=await res.json();
  if(rows.length!==1||rows[0].price_cents!==CATALOG[id].cents||!/^stickers-[a-z0-9-]+\.(png|jpg)$/.test(rows[0].object_path))throw Error('Sticker not ready');
  const row=rows[0],path='/object/sign/stickers-originales/'+encodeURIComponent(row.object_path);
  const sr=await fetch(base+'/storage/v1'+path,{method:'POST',headers:h,body:JSON.stringify({expiresIn:900})});
  if(!sr.ok)throw Error('Download signing failed');
  const sd=await sr.json();
  const relative=sd.signedURL;
  if(typeof relative!=='string'||!relative.startsWith(path+'?token='))throw Error('Unexpected signed URL');
  const link=new URL(base+'/storage/v1'+relative);link.searchParams.set('download',row.object_path);
  downloads.push({id,title:row.title,url:link.href,filename:row.object_path,expiresIn:900});
 }
 return {delivery:true,downloads,deliveryPending:false,undelivered:signed.ids.length-ids.length};
}
Deno.serve(async req=>{
 if(req.headers.get('origin')!==ORIGIN)return reply({error:'Origen no autorizado'},403);
 if(req.method==='OPTIONS')return new Response(null,{status:204,headers});
 if(req.method!=='POST')return reply({error:'Método no permitido'},405);
 try{
 const raw=await req.text();if(raw.length>18000)return reply({error:'Solicitud demasiado grande'},413);
 const body=JSON.parse(raw);
 if(body.action==='create'){
 const ids=body.ids;if(!Array.isArray(ids)||!ids.length||ids.length>50||new Set(ids).size!==ids.length||ids.some(id=>typeof id!=='string'||!Object.hasOwn(CATALOG,id)))return reply({error:'Carrito inválido'},400);
 const items=ids.map(id=>CATALOG[id]),total=items.reduce((sum,p)=>sum+p.cents,0);
 await key();
 const auth=await access();
 const requestId=crypto.randomUUID();
 const {ok,data}=await paypal('/v2/checkout/orders',auth,'POST',{intent:'CAPTURE',purchase_units:[{custom_id:'gostoreuy-sandbox',description:'Gostoreuy · diseños digitales (prueba)',amount:{currency_code:'USD',value:cents(total),breakdown:{item_total:{currency_code:'USD',value:cents(total)}}},items:items.map(p=>({name:p.title,quantity:'1',category:'DIGITAL_GOODS',unit_amount:{currency_code:'USD',value:cents(p.cents)}}))}],payment_source:{paypal:{experience_context:{brand_name:'Gostoreuy',shipping_preference:'NO_SHIPPING',user_action:'PAY_NOW',return_url:SITE+'?paypal=return',cancel_url:SITE+'?paypal=cancel'}}}},requestId);
 const approval=data.links?.find(l=>l.rel==='payer-action'||l.rel==='approve')?.href;
 if(!ok||!data.id||!approval||new URL(approval).hostname!=='www.sandbox.paypal.com')throw Error('Order creation failed');
 return reply({orderId:data.id,approval,token:await sign({orderId:data.id,total,ids,exp:Date.now()+3*60*60*1000}),total:cents(total),mode:'sandbox'});
 }
 if(body.action==='capture'||body.action==='downloads'){
 let signed;try{signed=await verify(body.token)}catch{return reply({error:'Sesión de pago inválida o vencida'},400)}
 if(body.orderId!==signed.orderId||!/^[A-Z0-9]{8,32}$/.test(signed.orderId))return reply({error:'Pedido inválido'},400);
 const auth=await access(),path='/v2/checkout/orders/'+signed.orderId;
 let result=await paypal(path,auth);
 if(!result.ok)throw Error('Order lookup failed');
 verifyAmount(result.data,signed.total);
 if(body.action==='capture'&&result.data.status==='APPROVED'){result=await paypal(path+'/capture',auth,'POST',{},'capture-'+signed.orderId);if(!result.ok)result=await paypal(path,auth)}
 if(!result.ok)throw Error('Capture failed');
 const u=verifyAmount(result.data,signed.total),captures=u.payments?.captures||[];
 if(result.data.status!=='COMPLETED'||captures.length!==1||captures[0].status!=='COMPLETED'||captures[0].amount?.currency_code!=='USD'||captures[0].amount?.value!==cents(signed.total))return reply({error:'Pago aún no confirmado'},409);
 let delivery={delivery:false,downloads:[],deliveryPending:false,undelivered:signed.ids.length};
 try{delivery=await deliverStickers(signed,captures[0].id)}catch{console.error('Gostoreuy sticker delivery pending');delivery.deliveryPending=true;}
 return reply({status:'COMPLETED',orderId:signed.orderId,captureId:captures[0].id,total:cents(signed.total),mode:'sandbox',...delivery});
 }
 return reply({error:'Acción inválida'},400);
 }catch(e){console.error('Gostoreuy sandbox checkout:',e instanceof Error?e.message:'unknown');return reply({error:'No se pudo completar el pago de prueba. Volvé a intentarlo.'},502)}
});