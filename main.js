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

function setMenu(o){
  mn.classList.toggle('open',o);
  btn.setAttribute('aria-expanded',o);
  btn.setAttribute('aria-label',o?'Close menu':'Open menu');
  mn.hidden=!o;
  document.body.style.overflow=o?'hidden':'';
  apply();
}
btn.addEventListener('click',()=>setMenu(btn.getAttribute('aria-expanded')!=='true'));
mn.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
matchMedia('(min-width:1024px)').addEventListener('change',e=>{if(e.matches)setMenu(false)});
document.querySelectorAll('.q button').forEach(b=>b.addEventListener('click',()=>{const q=b.closest('.q'),o=!q.hasAttribute('data-open');q.toggleAttribute('data-open',o);b.setAttribute('aria-expanded',o)}));
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});document.querySelectorAll('.reveal').forEach(el=>io.observe(el))}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
const yr=document.getElementById('yr'); if(yr) yr.textContent=new Date().getFullYear();
