/* LOADER */
window.addEventListener('load', () => setTimeout(() => document.getElementById('loader').classList.add('out'), 2000));

/* CURSOR */
const cur = document.getElementById('cur'), ring = document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; cur.style.cssText+=`;left:${mx}px;top:${my}px`; });
(function loop(){rx+=(mx-rx)*.11;ry+=(my-ry)*.11;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop)})();
document.querySelectorAll('a,button,.proj-card,.sk-card,.tl-card,.ach-card,.ct-card,.stat,.chip').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('hov'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('hov'));
});

/* PARTICLES */
(()=>{
  const cv=document.getElementById('pcv'),cx=cv.getContext('2d');
  const COLS=['rgba(99,102,241,.65)','rgba(236,72,153,.55)','rgba(6,182,212,.55)','rgba(245,158,11,.45)'];
  let W,H,pts=[];
  function resize(){W=cv.width=innerWidth;H=cv.height=innerHeight}
  function init(){pts=Array.from({length:85},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.28,vy:(Math.random()-.5)*.28,r:Math.random()*1.8+.4,c:COLS[Math.floor(Math.random()*4)]}))}
  resize();init();
  window.addEventListener('resize',()=>{resize();init()});
  (function draw(){
    cx.clearRect(0,0,W,H);
    for(let i=0;i<pts.length;i++){
      const p=pts[i];
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>W)p.vx*=-1;
      if(p.y<0||p.y>H)p.vy*=-1;
      cx.beginPath();cx.arc(p.x,p.y,p.r,0,Math.PI*2);cx.fillStyle=p.c;cx.fill();
      for(let j=i+1;j<pts.length;j++){
        const q=pts[j],d=Math.hypot(p.x-q.x,p.y-q.y);
        if(d<125){cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.strokeStyle=`rgba(99,102,241,${.16*(1-d/125)})`;cx.lineWidth=.5;cx.stroke()}
      }
    }
    requestAnimationFrame(draw);
  })();
})();

/* NAV */
const hbg=document.getElementById('hbg'),menu=document.getElementById('navMenu');
hbg.addEventListener('click',()=>menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));

/* SCROLL REVEAL */
const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.1});
document.querySelectorAll('.rv').forEach(el=>ro.observe(el));

/* SKILL BARS */
const bo=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.querySelectorAll('.bar-fill').forEach(b=>b.style.width=b.dataset.w+'%')}),{threshold:.25});
document.querySelectorAll('.sk-card').forEach(c=>bo.observe(c));

/* 3D CARD */
const c3=document.getElementById('c3');
if(c3){
  document.addEventListener('mousemove',e=>{
    const r=c3.getBoundingClientRect(),cx2=r.left+r.width/2,cy2=r.top+r.height/2;
    const dx=(e.clientX-cx2)/(innerWidth/2)*9,dy=(e.clientY-cy2)/(innerHeight/2)*-7;
    c3.style.transform=`rotateY(${dx}deg) rotateX(${dy}deg)`;
  });
}

/* ACTIVE NAV */
const secs=[...document.querySelectorAll('section[id]')],navAs=[...document.querySelectorAll('.nav-menu a')];
window.addEventListener('scroll',()=>{
  let active='';
  secs.forEach(s=>{if(scrollY>=s.offsetTop-90)active=s.id});
  navAs.forEach(a=>a.style.color=a.getAttribute('href')==='#'+active?'var(--indigo-l)':'');
},{passive:true});