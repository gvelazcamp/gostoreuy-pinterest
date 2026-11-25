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
 const p={id,title,category,cents,img};products.set(id,p);
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
document.querySelectorAll('#colorear .book-card').forEach(c=>register(c,'Libros para colorear',499));
document.querySelectorAll('#galeria .remera-extra, #galeria .taza-extra').forEach(c=>register(c,c.classList.contains('taza-extra')?'Tazas':'Remeras',c.classList.contains('taza-extra')?249:399));
register(document.querySelector('#producto-remeras'),'Remeras',399,{title:'Tom y Jerry'});
placeholder(document.querySelector('#producto-tazas'),249);
placeholder(document.querySelector('#producto-biblioratos'),199);
const pets=document.querySelector('#rv-mascotas .rv-layout>div:first-child');register(pets,'Dibujá y revelá',499,{title:'Mascotas tiernas · Colección'});
const waterfall=document.querySelector('#paisajes-antiestres .pa-controls');register(waterfall,'Dibujá y revelá',199,{title:'Valle de las cascadas',img:'assets/paisaje-a4-guia.webp'});
document.querySelectorAll('.pa-destination').forEach(c=>register(c,'Dibujá y revelá',199));
function load(){try{const raw=JSON.parse(localStorage.getItem(KEY)||'[]');return new Set(Array.isArray(raw)?raw.filter(id=>products.has(id)):[])}catch{return new Set()}}
let cart=load(),mode='cart';
const header=document.querySelector('.site-nav'),toggle=button('','go-cart-toggle',()=>open('cart'));toggle.setAttribute('aria-label','Abrir carrito de compras');header?.append(toggle);
const toast=el('div','go-toast');toast.setAttribute('role','status');document.body.append(toast);let toastTimer;
function announce(msg){toast.textContent=msg;toast.classList.add('go-show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('go-show'),2600)}
const dialog=el('dialog','go-cart-dialog');dialog.setAttribute('aria-labelledby','go-cart-title');
const bar=el('div','go-cart-bar'),heading=el('h2','','Tu carrito');heading.id='go-cart-title';const close=button('×','go-close',()=>dialog.close());close.setAttribute('aria-label','Cerrar carrito');bar.append(heading,close);
const note=el('p','go-cart-note','Solo archivos digitales para imprimir. No se envían productos físicos.');
const list=el('div','go-cart-list'),footer=el('div','go-cart-footer'),totalLine=el('div','go-total'),totalLabel=el('span','','Total (USD)'),total=el('strong');totalLine.append(totalLabel,total);
const payNote=el('p','go-payment-note','Compra en demostración: todavía no se realizan cobros ni se entregan archivos.');
const buyAll=button('Comprar','go-checkout',()=>{mode='checkout';render()});
const back=button('Seguir explorando','go-back',()=>{if(mode==='checkout'){mode='cart';render()}else dialog.close()});
footer.append(totalLine,payNote,buyAll,back);dialog.append(bar,note,list,footer);document.body.append(dialog);
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
function persist(){try{localStorage.setItem(KEY,JSON.stringify([...cart]))}catch{}}
function render(){
 toggle.textContent='🛒 Carrito ('+cart.size+')';
 for(const [id,b] of views){b.textContent=cart.has(id)?'✓ En carrito':'Agregar al carrito';b.setAttribute('aria-pressed',String(cart.has(id)))}
 list.replaceChildren();let sum=0;
 for(const id of cart){const p=products.get(id);if(!p)continue;sum+=p.cents;const row=el('div','go-cart-item');const img=el('img');img.src=p.img;img.alt='';const info=el('div','go-cart-info');info.append(el('strong','',p.title),el('small','',p.category+' · Digital'));const end=el('div','go-cart-end');end.append(el('strong','',money(p.cents)));const remove=button('Quitar','go-remove',()=>{cart.delete(id);persist();render()});remove.setAttribute('aria-label','Quitar '+p.title);end.append(remove);row.append(img,info,end);list.append(row)}
 if(!cart.size)list.append(el('p','go-empty','Todavía no agregaste diseños al carrito.'));
 total.textContent=money(sum);heading.textContent=mode==='checkout'?'Resumen de compra':'Tu carrito';payNote.textContent=mode==='checkout'?'Próximamente: pago seguro con PayPal. Esta es una vista previa; no se realizará ningún cobro.':'Compra en demostración: PayPal todavía no está conectado.';
 buyAll.textContent=mode==='checkout'?'Pagar con PayPal · Próximamente':'Comprar';buyAll.disabled=!cart.size||mode==='checkout';back.textContent=mode==='checkout'?'Volver al carrito':'Seguir explorando';
}
function open(next){mode=next;render();if(!dialog.open)dialog.showModal()}
function addProduct(id,checkout){if(!cart.has(id)){cart.add(id);persist();announce('Diseño agregado al carrito')}else if(!checkout){open('cart');return}render();if(checkout)open('checkout')}
window.addEventListener('storage',e=>{if(e.key===KEY){cart=load();render()}});
render();
})();