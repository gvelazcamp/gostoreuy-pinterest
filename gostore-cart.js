(()=>{'use strict';
const KEY='gostoreuy-cart-v1', money=c=>'US$ '+(c/100).toFixed(2), products=new Map(), views=new Map();
const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n};
function button(label,cls,fn){const b=el('button',cls,label);b.type='button';if(fn)b.addEventListener('click',fn);return b}
function register(card,category,cents,opts={}){
 if(!card)return;
 const title=opts.title||card.querySelector('h3,h4')?.textContent.trim(),img=opts.img||card.querySelector('img')?.getAttribute('src');
 if(!title||!img)return;
 const id=category+':'+img, target=opts.target||card.querySelector('.shop-details,.sticker-collection-info,.pa-destination-info')||card;
 if(products.has(id))return;
 const p={id,title,category,cents,img,count:opts.count||1};products.set(id,p);
 const status=target.querySelector('.shop-status');if(status)status.hidden=true;
 const panel=el('div','go-buy-panel'),price=el('strong','go-price',money(cents)),caption=el('small','go-digital','Archivo digital · No incluye producto físico');
 const actions=el('div','go-buy-actions'),add=button('Agregar al carrito','go-add',()=>addProduct(id,false)),buy=button('Comprar','go-buy',()=>addProduct(id,true));
 actions.append(add,buy);panel.append(price,caption,actions);target.append(panel);views.set(id,add);
}
function placeholder(card,cents){
 if(!card)return;const target=card.querySelector('.shop-details')||card;
 const p=el('div','go-buy-panel');p.append(el('strong','go-price','Desde '+money(cents)),el('small','go-digital','Archivo digital · Próximamente'));
 const b=button('Agregar al carrito','go-add');b.disabled=true;const buy=button('Comprar','go-buy');buy.disabled=true;const actions=el('div','go-buy-actions');actions.append(b,buy);p.append(actions);target.append(p);
}
document.querySelectorAll('#coleccion-stickers .sticker-collection-card').forEach(c=>register(c,'Stickers',299));
document.querySelectorAll('#cuadernos article.card').forEach(c=>register(c,'Hojas ilustradas',199));
document.querySelectorAll('#colorear .book-card').forEach(c=>register(c,'Libros para colorear',499,{count:parseInt(c.querySelector('.go-pack-badge')?.textContent)||10}));
document.querySelectorAll('#galeria .remera-extra, #galeria .taza-extra').forEach(c=>register(c,c.classList.contains('taza-extra')?'Tazas':'Remeras',c.classList.contains('taza-extra')?249:399));
register(document.querySelector('#producto-remeras'),'Remeras',399,{title:'Tom y Jerry'});
placeholder(document.querySelector('#producto-tazas'),249);
placeholder(document.querySelector('#producto-biblioratos'),199);
const pets=document.querySelector('#rv-mascotas .rv-layout>div:first-child');register(pets,'Dibujá y revelá',499,{title:'Mascotas tiernas · Colección',count:20});
const waterfall=document.querySelector('#paisajes-antiestres .pa-controls');register(waterfall,'Dibujá y revelá',199,{title:'Valle de las cascadas',img:'assets/paisaje-a4-guia.webp'});
document.querySelectorAll('.pa-destination').forEach(c=>register(c,'Dibujá y revelá',199));
function load(){try{const raw=JSON.parse(localStorage.getItem(KEY)||'[]');return new Set(Array.isArray(raw)?raw.filter(id=>products.has(id)):[])}catch{return new Set()}}
let cart=load(),mode='cart',paymentBusy=false,paymentMessage='';
const paypalCfg=window.GOSTORE_PAYPAL||{},isLive=paypalCfg.mode==='live',paypalReady=['sandbox','live'].includes(paypalCfg.mode)&&/^https:\/\/[a-z0-9]+\.supabase\.co\/functions\/v1\/gostoreuy-paypal$/.test(paypalCfg.endpoint||'');
const PAY_KEY='gostoreuy-paypal-sandbox-v1', RECEIPT_KEY='gostoreuy-sticker-receipt-v1';
let receipt=null;
const petPack=document.getElementById('go-pet-pack-select'),petId=[...products.values()].find(p=>p.count===20&&p.category==='Dibujá y revelá')?.id;
if(petPack&&petId)petPack.addEventListener('click',()=>{if(cart.has(petId)){cart.delete(petId);persist();render()}else addProduct(petId,false)});
const header=document.querySelector('.site-nav'),toggle=button('','go-cart-toggle',()=>open('cart'));toggle.setAttribute('aria-label','Abrir carrito de compras');header?.append(toggle);
const toast=el('div','go-toast');toast.setAttribute('role','status');document.body.append(toast);let toastTimer;
function announce(msg){toast.textContent=msg;toast.classList.add('go-show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('go-show'),2600)}
const dialog=el('dialog','go-cart-dialog');dialog.setAttribute('aria-labelledby','go-cart-title');
const bar=el('div','go-cart-bar'),heading=el('h2','','Tu carrito');heading.id='go-cart-title';const close=button('×','go-close',()=>dialog.close());close.setAttribute('aria-label','Cerrar carrito');bar.append(heading,close);
const note=el('p','go-cart-note','Solo archivos digitales para imprimir. No se envían productos físicos.');
const list=el('div','go-cart-list'),footer=el('div','go-cart-footer'),totalLine=el('div','go-total'),totalLabel=el('span','','Total (USD)'),total=el('strong');totalLine.append(totalLabel,total);
const payNote=el('p','go-payment-note',(isLive?'Pago seguro con PayPal.':'Compra de prueba · sin dinero real.'));
const buyAll=button('Comprar','go-checkout',()=>{if(mode==='checkout'){startPayment();return}mode='checkout';paymentMessage='';render()});
const back=button('Seguir explorando','go-back',()=>{if(mode==='checkout'){mode='cart';render()}else dialog.close()});
const deliveryPanel=el('div','go-delivery-panel');deliveryPanel.hidden=true;footer.append(totalLine,payNote,deliveryPanel,buyAll,back);dialog.append(bar,note,list,footer);document.body.append(dialog);
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
function persist(){try{localStorage.setItem(KEY,JSON.stringify([...cart]))}catch{}}
function render(){
 toggle.textContent='🛒 Carrito ('+cart.size+')';
 if(petPack&&petId){const selected=cart.has(petId);petPack.setAttribute('aria-pressed',String(selected));petPack.querySelector('span').firstChild.textContent=selected?'✓ Pack seleccionado':'Seleccionar pack completo'}
 for(const [id,b] of views){b.textContent=cart.has(id)?'✓ En carrito':'Agregar al carrito';b.setAttribute('aria-pressed',String(cart.has(id)))}
 list.replaceChildren();let sum=0;
 for(const id of cart){const p=products.get(id);if(!p)continue;sum+=p.cents;const row=el('div','go-cart-item');const img=el('img');img.src=p.img;img.alt='';const info=el('div','go-cart-info');info.append(el('strong','',p.title),el('small','',p.category+' · Digital'+(p.count>1?' · ×'+p.count+' diseños':'')));const end=el('div','go-cart-end');end.append(el('strong','',money(p.cents)));const remove=button('Quitar','go-remove',()=>{cart.delete(id);persist();render()});remove.setAttribute('aria-label','Quitar '+p.title);end.append(remove);row.append(img,info,end);list.append(row)}
 if(!cart.size)list.append(el('p','go-empty','Todavía no agregaste diseños al carrito.'));
 total.textContent=money(sum);heading.textContent=mode==='checkout'?'Resumen de compra':'Tu carrito';payNote.textContent=paymentMessage||(mode==='checkout'?(paypalReady?(isLive?'Pago seguro con PayPal. La descarga se habilita al confirmar el pago.':'PayPal Sandbox · sin dinero real. Descarga habilitada tras confirmar el pago; otras categorías aún sin entrega.'):'PayPal · conexión pendiente. No se realizan cobros.'):'Compra en demostración · PayPal Sandbox');
 buyAll.textContent=paymentBusy?'Conectando…':mode==='checkout'?(paypalReady?(isLive?'Pagar con PayPal':'Pagar con PayPal (prueba)'):'Pagar con PayPal · Configuración pendiente'):'Comprar';buyAll.disabled=paymentBusy||!cart.size||(mode==='checkout'&&!paypalReady);buyAll.classList.toggle('go-paypal',mode==='checkout');back.textContent=mode==='checkout'?'Volver al carrito':'Seguir explorando';
}
function open(next){mode=next;paymentMessage='';render();if(!dialog.open)dialog.showModal()}
function addProduct(id,checkout){if(!cart.has(id)){cart.add(id);persist();announce('Diseño agregado al carrito')}else if(!checkout){open('cart');return}render();if(checkout)open('checkout')}
window.addEventListener('storage',e=>{if(e.key===KEY){cart=load();render()}});
async function paymentApi(payload){const response=await fetch(paypalCfg.endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const data=await response.json();if(!response.ok)throw Error(data.error||'Error de conexión');return data}
async function startPayment(){if(!paypalReady||paymentBusy||!cart.size)return;paymentBusy=true;paymentMessage=(isLive?'Preparando tu pago…':'Preparando tu pago de prueba…');render();try{const ids=[...cart],d=await paymentApi({action:'create',ids}),u=new URL(d.approval);if(u.protocol!=='https:'||u.hostname!==(isLive?'www.paypal.com':'www.sandbox.paypal.com')||d.mode!==paypalCfg.mode)throw Error('Pago no autorizado');sessionStorage.setItem(PAY_KEY,JSON.stringify({orderId:d.orderId,token:d.token,ids}));location.assign(u.href)}catch(e){paymentMessage=e.message||'No se pudo iniciar el pago';paymentBusy=false;render()}}
async function finishPayment(){const url=new URL(location.href),state=url.searchParams.get('paypal');if(!['return','cancel'].includes(state))return;const returned=url.searchParams.get('token');for(const k of ['paypal','token','PayerID'])url.searchParams.delete(k);history.replaceState(null,'',url);open('checkout');if(state==='cancel'){sessionStorage.removeItem(PAY_KEY);paymentMessage=(isLive?'Pago cancelado. Tu carrito sigue intacto.':'Pago de prueba cancelado. Tu carrito sigue intacto.');render();return}if(!paypalReady){paymentMessage='PayPal todavía no está configurado.';render();return}try{const saved=JSON.parse(sessionStorage.getItem(PAY_KEY)||'null');if(!saved||returned!==saved.orderId)throw Error('No se encontró la sesión de pago original.');paymentBusy=true;paymentMessage=(isLive?'Verificando el pago…':'Verificando pago de prueba…');render();const d=await paymentApi({action:'capture',orderId:returned,token:saved.token});if(d.status!=='COMPLETED'||d.mode!==paypalCfg.mode)throw Error('Pago pendiente de confirmar.');for(const id of saved.ids)cart.delete(id);persist();sessionStorage.removeItem(PAY_KEY);mode='cart';receipt={orderId:saved.orderId,token:saved.token,hasStickers:saved.ids.some(id=>id.startsWith('Stickers:')||/^Libros para colorear:colorear\/portada-(goku|vegeta|piccolo|gohan|trunks)\.png$/.test(id)||id==='Dibujá y revelá:assets/revela-portada.webp'||/^Dibujá y revelá:assets\/paisajes-a4\/1[1-5]-/.test(id)||/^Remeras:assets\/remeras\/(batman|bob-esponja-anime|dexter|kobe-bryant|pokemon-pikachu|wolverine-weapon-x|sabandija)\.webp$/.test(id))};try{sessionStorage.setItem(RECEIPT_KEY,JSON.stringify(receipt))}catch{}showDelivery(d);paymentMessage=(isLive?'Pago confirmado: US$ '+d.total+'.':'Pago de prueba confirmado: US$ '+d.total+'. No se cobró dinero real.')+(d.undelivered?' Algunos productos aún no tienen entrega automática.':'');}catch(e){paymentMessage=e.message||'No se pudo verificar el pago'}finally{paymentBusy=false;render()}}
let pdfBusy=false;
async function downloadStickerPdf(action,productId,btn){
 if(!receipt||pdfBusy)return;
 const original=btn.textContent;pdfBusy=true;btn.disabled=true;btn.textContent='Preparando PDF…';
 try{
  const endpoint=new URL('/functions/v1/gostoreuy-stickers-pdf',paypalCfg.endpoint);
  const response=await fetch(endpoint.href,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,orderId:receipt.orderId,token:receipt.token,productId})});
  if(!response.ok){let e;try{e=await response.json()}catch{}throw Error(e?.error||'No se pudo descargar el PDF')}
  if(!response.headers.get('Content-Type')?.includes('application/pdf'))throw Error('Formato de descarga inesperado');
  const blob=await response.blob(),url=URL.createObjectURL(blob),a=document.createElement('a');
  const suggested=response.headers.get('Content-Disposition')?.match(/filename="([A-Za-z0-9.-]+\.pdf)"/)?.[1];
  a.href=url;a.download=suggested||(action==='package'?'GoStoreUY-pedido.pdf':'GoStoreUY-lamina.pdf');document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
 }catch(e){announce(e.message||'No se pudo descargar el PDF')}finally{pdfBusy=false;btn.disabled=false;btn.textContent=original}
}
function pdfButton(label,action,productId,primary=false){const b=button(label,primary?'go-checkout go-paypal':'go-back',()=>downloadStickerPdf(action,productId,b));b.style.display='block';b.style.width='100%';b.style.marginTop='8px';return b}
function showDelivery(d){
 deliveryPanel.replaceChildren();deliveryPanel.hidden=false;
 deliveryPanel.append(el('strong','',(isLive?'¡Gracias por tu compra!':'¡Gracias por tu compra de prueba!')));
 const links=Array.isArray(d.downloads)?d.downloads:[];
 if(links.length){
 deliveryPanel.append(pdfButton('Descargar compra completa (PDF)','package',undefined,true));
 deliveryPanel.append(el('small','','Comprobante + agradecimiento + láminas compradas.'));
 for(const item of links)deliveryPanel.append(pdfButton((item.kind==='book'?'PDF solo libro · ':'PDF solo lámina · ')+item.title,'sheet',item.id));
 deliveryPanel.append(el('small','','Solo lámina: lista para imprimir y recortar, sin hojas extras.'));
 }
 for(const item of links){try{const u=new URL(item.url),endpoint=new URL(paypalCfg.endpoint);if(u.origin!==endpoint.origin||!u.pathname.startsWith('/storage/v1/object/sign/stickers-originales/')||!u.searchParams.has('token'))continue;const a=el('a','go-add','Imagen original · '+item.title);a.href=u.href;a.style.display='block';a.style.marginTop='8px';a.style.textAlign='center';a.rel='noreferrer';deliveryPanel.append(a)}catch{}}
 for(const item of links)for(const f of (item.files||[])){try{const u=new URL(f.url),endpoint=new URL(paypalCfg.endpoint);if(u.origin!==endpoint.origin||!u.pathname.startsWith('/storage/v1/object/sign/stickers-originales/')||!u.searchParams.has('token'))continue;const a=el('a','go-add',f.label+' · '+item.title+' (PNG)');a.href=u.href;a.style.cssText='display:block;margin-top:8px;text-align:center';a.rel='noreferrer';deliveryPanel.append(a)}catch{}}
 if(d.deliveryPending)deliveryPanel.append(el('p','','El pago está confirmado. La descarga está pendiente; podés reintentar sin pagar de nuevo.'));
 if(links.length)deliveryPanel.append(el('small','','Enlaces privados válidos durante 15 minutos.'));
 if(d.undelivered)deliveryPanel.append(el('small','','Las demás categorías todavía no tienen entrega automática.'));
 if(receipt?.hasStickers)deliveryPanel.append(button('Actualizar enlaces de descarga','go-back',refreshDownloads));
 window.GoStoreHistory?.offer(deliveryPanel,receipt);
}
async function refreshDownloads(){
 if(!receipt||paymentBusy)return;paymentBusy=true;render();
 try{const d=await paymentApi({action:'downloads',orderId:receipt.orderId,token:receipt.token});if(d.status!=='COMPLETED'||d.mode!==paypalCfg.mode)throw Error('Pago pendiente');showDelivery(d)}catch(e){deliveryPanel.hidden=false;deliveryPanel.append(el('p','','No se pudieron renovar los enlaces: '+e.message))}finally{paymentBusy=false;render()}
}
try{receipt=JSON.parse(sessionStorage.getItem(RECEIPT_KEY)||'null');if(receipt?.orderId){deliveryPanel.hidden=false;if(receipt.hasStickers)deliveryPanel.append(button('Recuperar descargas de la última compra','go-back',refreshDownloads));window.GoStoreHistory?.offer(deliveryPanel,receipt)}}catch{}
render();finishPayment();
})();