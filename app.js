const menu=document.querySelector('.menu-toggle'),nav=document.getElementById('primary-nav');
if(menu&&nav){menu.addEventListener('click',()=>{let isOpen=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(isOpen));menu.setAttribute('aria-label',isOpen?'Cerrar menú':'Abrir menú')});}
let lastTrigger=null;
function showDialog(id,trigger){const d=document.getElementById(id);if(!d)return;lastTrigger=trigger||document.activeElement;d.showModal();}
document.addEventListener('click',e=>{
const op=e.target.closest('[data-open]');if(op){const parent=op.closest('dialog');if(op.hasAttribute('data-close-current')&&parent)parent.close();showDialog(op.dataset.open,op);return;}
const close=e.target.closest('[data-close]');if(close){close.closest('dialog')?.close();lastTrigger?.focus();return;}
const toggle=e.target.closest('[data-prompt]');if(toggle){const el=document.getElementById(toggle.dataset.prompt);if(el){el.hidden=!el.hidden;toggle.setAttribute('aria-expanded',String(!el.hidden));toggle.querySelector('span').textContent=el.hidden?'＋':'−';}return;}
const copy=e.target.closest('[data-copy]');if(copy){const el=document.getElementById(copy.dataset.copy);if(el)copyText(el.querySelector('blockquote')?.innerText||el.innerText,copy);return;}
if(e.target.id==='copy-ficha'){const x=document.getElementById('ficha-contenido');if(x)copyText(x.innerText,e.target);}
});
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d)d.close()}));
async function copyText(text,btn){try{await navigator.clipboard.writeText(text);let old=btn.textContent;btn.textContent='Copiado';setTimeout(()=>btn.textContent=old,1600)}catch(e){const area=document.createElement('textarea');area.value=text;document.body.appendChild(area);area.select();document.execCommand('copy');area.remove();btn.textContent='Copiado';}}
if(location.hash==='#reflexion'&&document.getElementById('ficha')){showDialog('ficha');}
