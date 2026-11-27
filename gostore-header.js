(()=>{'use strict';
const h=document.querySelector('.site-header');if(!h)return;
const nav=h.querySelector('.site-nav');
const I={bag:'<path d="M6 7h12l-1 13H7z"/><path d="M9 7a3 3 0 0 1 6 0"/>',cart:'<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.5L22 8H6"/>',menu:'<path d="M4 7h16M4 12h16M4 17h10"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',home:'<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',chev:'<path d="M9 6l6 6-6 6"/>',down:'<path d="M6 9l6 6 6-6"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>'};
const svg=p=>'<svg viewBox="0 0 24 24" aria-hidden="true">'+p+'</svg>';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const mk=(tag,cls,html)=>{const n=document.createElement(tag);n.className=cls;if(html)n.innerHTML=html;return n};
const ib=(cls,label,icon)=>{const b=mk('button','gh-ib '+cls,svg(icon));b.type='button';b.setAttribute('aria-label',label);b.title=label;return b};
const hist=()=>nav&&nav.querySelector('.go-cart-toggle[aria-label="Ver mis compras"]');
const cartBtn=()=>nav&&nav.querySelector('.go-cart-toggle[aria-label="Abrir carrito de compras"]');
const count=()=>{const m=((cartBtn()||{}).textContent||'').match(/\((\d+)\)/);return m?+m[1]:0};

const brand=h.querySelector('.site-brand');
if(brand&&brand.textContent.includes('✦'))brand.innerHTML=esc(brand.textContent.replace('✦','').trim())+' <span class="gh-star" aria-hidden="true">✦</span>';

const acts=mk('div','gh-actions');
const bHist=ib('gh-hist','Mis compras',I.bag),bCart=ib('gh-cart','Carrito',I.cart),bMenu=ib('gh-menu','Abrir menú',I.menu);
const badge=mk('span','gh-badge');badge.setAttribute('aria-hidden','true');bCart.append(badge);
bMenu.setAttribute('aria-expanded','false');
acts.append(bHist,bCart,bMenu);h.append(acts);

const ov=mk('div','gh-overlay'),dr=mk('aside','gh-drawer');
dr.setAttribute('aria-label','Menú');dr.setAttribute('aria-hidden','true');dr.id='gh-drawer';bMenu.setAttribute('aria-controls','gh-drawer');
const links=[...h.querySelectorAll('.product-dropdown a')];
dr.innerHTML='<div class="gh-dtop"><strong>Menú</strong></div>'
+'<a class="gh-item" href="./"><span>'+svg(I.home)+'Inicio</span></a>'
+'<button class="gh-item gh-acc" type="button" aria-expanded="false"><span>'+svg(I.grid)+'Productos</span>'+svg(I.down)+'</button>'
+'<div class="gh-sub" hidden>'+links.map(a=>'<a href="'+esc(a.getAttribute('href'))+'">'+esc(a.textContent.trim())+'</a>').join('')+'</div>'
+'<button class="gh-item gh-dhist" type="button"><span>'+svg(I.bag)+'Mis compras</span>'+svg(I.chev)+'</button>'
+'<div class="gh-cartbox"><small>Tu carrito</small><strong class="gh-cnt">0 productos</strong><button type="button" class="gh-go">Ver carrito '+svg(I.arrow)+'</button></div>';
const bX=ib('gh-x','Cerrar menú',I.x);dr.querySelector('.gh-dtop').append(bX);
document.body.append(ov,dr);

function open(){dr.classList.add('open');ov.classList.add('open');dr.setAttribute('aria-hidden','false');bMenu.setAttribute('aria-expanded','true');document.body.classList.add('gh-lock');bX.focus()}
function close(){if(!dr.classList.contains('open'))return;dr.classList.remove('open');ov.classList.remove('open');dr.setAttribute('aria-hidden','true');bMenu.setAttribute('aria-expanded','false');document.body.classList.remove('gh-lock')}
bMenu.onclick=open;bX.onclick=close;ov.onclick=close;
document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
const acc=dr.querySelector('.gh-acc'),sub=dr.querySelector('.gh-sub');
acc.onclick=()=>{const o=acc.getAttribute('aria-expanded')!=='true';acc.setAttribute('aria-expanded',String(o));sub.hidden=!o};
sub.addEventListener('click',e=>{if(e.target.closest('a'))close()});
const openHist=()=>{close();const b=hist();if(b)b.click()},openCart=()=>{close();const b=cartBtn();if(b)b.click()};
bHist.onclick=openHist;dr.querySelector('.gh-dhist').onclick=openHist;
bCart.onclick=openCart;dr.querySelector('.gh-go').onclick=openCart;

if(!hist()){bHist.remove();dr.querySelector('.gh-dhist').remove()}
if(!cartBtn()){bCart.remove();dr.querySelector('.gh-cartbox').remove()}
const cnt=dr.querySelector('.gh-cnt');
function upd(){const n=count();badge.textContent=n;badge.hidden=!n;bCart.setAttribute('aria-label','Carrito ('+n+')');if(cnt)cnt.textContent=n+(n===1?' producto':' productos')}
upd();if(nav)new MutationObserver(upd).observe(nav,{subtree:true,childList:true,characterData:true});
h.classList.add('gh-ready');
})();
