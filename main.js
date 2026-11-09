document.documentElement.classList.remove('no-js');
const hdr=document.querySelector('.hdr'),btn=document.querySelector('.menu-btn'),mn=document.getElementById('mnav');
addEventListener('scroll',()=>hdr.classList.toggle('scrolled',scrollY>8),{passive:true});
function setMenu(o){mn.classList.toggle('open',o);btn.setAttribute('aria-expanded',o);btn.setAttribute('aria-label',o?'Close menu':'Open menu');mn.hidden=!o}
btn.addEventListener('click',()=>setMenu(btn.getAttribute('aria-expanded')!=='true'));
mn.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
matchMedia('(min-width:960px)').addEventListener('change',e=>{if(e.matches)setMenu(false)});
document.querySelectorAll('.q button').forEach(b=>b.addEventListener('click',()=>{const q=b.closest('.q'),o=!q.hasAttribute('data-open');q.toggleAttribute('data-open',o);b.setAttribute('aria-expanded',o)}));
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});document.querySelectorAll('.reveal').forEach(el=>io.observe(el))}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
document.getElementById('yr').textContent=new Date().getFullYear();
