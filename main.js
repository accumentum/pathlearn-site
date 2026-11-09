document.documentElement.classList.remove('no-js');
const hdr=document.getElementById('hdr');
const btn=document.querySelector('.menu-btn');
const mn=document.getElementById('mnav');
let compact=false;
function apply(){
  const on=compact || (btn && btn.getAttribute('aria-expanded')==='true');
  hdr.classList.toggle('compact', on);
  hdr.classList.toggle('menu-open', btn && btn.getAttribute('aria-expanded')==='true');
}
function onScroll(){
  const y=window.scrollY;
  // MeritSOLV hysteresis: compact past 40px, expand under 12px
  const next=compact ? y>12 : y>40;
  if(next!==compact){compact=next;apply();}
}
let raf=0;
addEventListener('scroll',()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(onScroll);},{passive:true});
compact=window.scrollY>40;apply();
// Match the reference's expanded side offsets without changing row geometry.
const outer=document.getElementById('hdr-outer');
const row=hdr.querySelector('.hdr-row');
function measureHeader(){
  outer.style.setProperty('--nav-dx',`${Math.max(0,(outer.clientWidth-row.offsetWidth)/2-16)}px`);
}
measureHeader();
addEventListener('resize',measureHeader);
requestAnimationFrame(()=>requestAnimationFrame(()=>hdr.classList.add('ready')));

const background=[document.querySelector('main'),document.querySelector('footer'),document.querySelector('.skip'),hdr.querySelector('.brand')].filter(Boolean);
let previousOverflow='';
let previousFocus=null;
function setMenu(o,{restoreFocus=true}={}){
  const wasOpen=btn.getAttribute('aria-expanded')==='true';
  if(o===wasOpen)return;
  if(o){previousOverflow=document.body.style.overflow;previousFocus=document.activeElement;}
  mn.classList.toggle('open',o);
  btn.setAttribute('aria-expanded',String(o));
  btn.setAttribute('aria-label',o?'Close menu':'Open menu');
  mn.hidden=!o;
  background.forEach(el=>{el.inert=o;});
  document.body.style.overflow=o?'hidden':previousOverflow;
  apply();
  if(o)mn.querySelector('a').focus({preventScroll:true});
  else if(restoreFocus)(previousFocus && previousFocus.isConnected ? previousFocus : btn).focus({preventScroll:true});
}
btn.addEventListener('click',()=>setMenu(btn.getAttribute('aria-expanded')!=='true'));
mn.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  setMenu(false,{restoreFocus:false});
  // Keep keyboard focus at an in-page destination, not inside the now-hidden menu.
  const target=a.hash && document.getElementById(a.hash.slice(1));
  if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}
  else btn.focus({preventScroll:true});
}));
addEventListener('keydown',e=>{
  if(btn.getAttribute('aria-expanded')!=='true')return;
  if(e.key==='Escape'){e.preventDefault();setMenu(false);return;}
  if(e.key==='Tab'){
    const stops=[btn,...mn.querySelectorAll('a[href]')];
    const first=stops[0],last=stops[stops.length-1];
    if(e.shiftKey && (document.activeElement===first || !stops.includes(document.activeElement))){e.preventDefault();last.focus();}
    else if(!e.shiftKey && (document.activeElement===last || !stops.includes(document.activeElement))){e.preventDefault();first.focus();}
  }
});
matchMedia('(min-width:1024px)').addEventListener('change',e=>{
  if(e.matches && btn.getAttribute('aria-expanded')==='true'){
    setMenu(false,{restoreFocus:false});hdr.querySelector('.brand').focus({preventScroll:true});
  }
});
addEventListener('pagehide',()=>setMenu(false,{restoreFocus:false}));
document.querySelectorAll('.q button').forEach(b=>b.addEventListener('click',()=>{
  const q=b.closest('.q'),o=!q.hasAttribute('data-open'),answer=document.getElementById(b.getAttribute('aria-controls'));
  q.toggleAttribute('data-open',o);b.setAttribute('aria-expanded',String(o));
  answer.inert=!o;answer.setAttribute('aria-hidden',String(!o));
}));
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});document.querySelectorAll('.reveal').forEach(el=>io.observe(el))}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
const yr=document.getElementById('yr'); if(yr) yr.textContent=new Date().getFullYear();
