const c=document.getElementById('c'),g=c.getContext('2d'),W=800,H=450,S=4;c.width=W;c.height=H;g.imageSmoothingEnabled=false;
const K={},L=['ArrowLeft','a','q'],R=['ArrowRight','d'],U=['ArrowUp','w','z',' '];
const any=a=>a.some(k=>K[k]),$=id=>document.getElementById(id);
addEventListener('keydown',e=>{const k=e.key.length>1?e.key:e.key.toLowerCase();K[k]=1;if(k.startsWith('Arrow')||k==' ')e.preventDefault();if(k=='Enter'&&scene=='cafe'&&letter&&!lOpen)openLetter()});
addEventListener('keyup',e=>{delete K[e.key.length>1?e.key:e.key.toLowerCase()]});
document.querySelectorAll('#pad button').forEach(b=>{const k=b.dataset.k,up=()=>{delete K[k];b.classList.remove('down')};b.onpointerdown=e=>{e.preventDefault();K[k]=1;b.classList.add('down')};['pointerup','pointerleave','pointercancel'].forEach(ev=>b['on'+ev]=up);b.oncontextmenu=e=>e.preventDefault()});
// sprites
const HE=[".hh.hh.","hwhhhhh","hhhhhhh",".hhhhh.","..hhh..","...h..."];
const LI=[".rr.rr.","rrrrrrr","rkkkkkr",".rrrrr.","..rrr.."];
function pix(rows,pal,s){let r='';rows.forEach((row,j)=>[...row].forEach((ch,i)=>{if(ch!='.')r+=`<rect x="${i}" y="${j}" width="1" height="1" fill="${pal[ch]}"/>`}));return `<svg viewBox="0 0 ${rows[0].length} ${rows.length}" width="${rows[0].length*s}" height="${rows.length*s}" shape-rendering="crispEdges" style="vertical-align:middle;margin:0 .4em">${r}</svg>`}
const hp={h:'#ff6f9a',w:'#fff'},lp={r:'#ff5f8f',k:'#c23365'};
const ap={a:'#8a4a73'};
$('bl').innerHTML=pix(["....a","...aa","..aaa",".aaaa","aaaaa",".aaaa","..aaa","...aa","....a"],ap,4);
$('br').innerHTML=pix(["a....","aa...","aaa..","aaaa.","aaaaa","aaaa.","aaa..","aa...","a...."],ap,4);
$('bu').innerHTML=pix(["....a....","...aaa...","..aaaaa..",".aaaaaaa.","aaaaaaaaa"],ap,4);
const CAT=[".........o..o...","........opoopo..","ooo....oooooooo.","obo....obebbebo.","obo....opbbnbpo.","obooooooooooooo.","obbbbbbbbbbbbbo.",".obbbbbbbbbbbbo.",".obbbbbbbbbbbbo.","..oobbbbbbbboo..","...obbo..obbo...","...oooo..oooo..."];
const LEG2=["..obbo....obbo..","..oooo....oooo.."];
function spr(rows,x,y,bs,pal,fl){rows.forEach((r,j)=>{for(let i=0;i<r.length;i++){const ch=r[fl?r.length-1-i:i];if(ch!='.'){g.fillStyle=pal[ch];g.fillRect(x+i*bs,y+j*bs,bs,bs)}}})}
function cat(x,y,w,o={}){
 const bs=Math.round(4*(o.s||1)),dk=w=='b',fl=o.f<0;
 const pal=dk?{o:'#2a2340',b:'#3d3455',e:'#ffe27a',p:'#ff9fbd',n:'#ff8fb0',z:'#ffe27a'}:{o:'#b49ccb',b:'#fffaf6',e:'#4a3a5c',p:'#ffb8cc',n:'#ff8fb0',z:'#4a3a5c'};
 const rows=CAT.slice();
 if(o.walk&&Math.floor(t/7)%2){rows[10]=LEG2[0];rows[11]=LEG2[1]}
 if(o.close){rows[3]=rows[3].replace(/e/g,'b');rows[4]=rows[4].slice(0,9)+'z'+rows[4].slice(10,12)+'z'+rows[4].slice(13)}
 const x0=Math.round(x-8*bs),y0=Math.round(y-12*bs);
 spr(rows,x0,y0,bs,pal,fl);
 if(!dk){g.fillStyle='#ff8fb0';[[14,0],[15,0],[14,1],[15,1]].forEach(([a,b])=>g.fillRect(x0+(fl?15-a:a)*bs,y0+b*bs,bs,bs));g.fillStyle='#ff5f8f';g.fillRect(x0+(fl?15-14:14)*bs,y0,bs,bs)}}
function heart(x,y,s,f){const b=Math.max(2,Math.round(s*2.5));HE.forEach((r,j)=>{for(let i=0;i<7;i++){const ch=r[i];if(ch!='.'){g.fillStyle=ch=='w'?'#fff':f;g.fillRect(Math.round(x-3.5*b)+i*b,Math.round(y-3*b)+j*b,b,b)}}})}
const rr=(x,y,w,h,r,f)=>{g.fillStyle=f;g.fillRect(Math.round(x/S)*S,Math.round(y/S)*S,Math.max(S,Math.round(w/S)*S),Math.max(S,Math.round(h/S)*S))};
const circ=(x,y,r,f)=>{g.fillStyle=f;for(let j=-r;j<=r;j+=S){const w=Math.sqrt(Math.max(0,r*r-j*j));g.fillRect(Math.round((x-w)/S)*S,Math.round((y+j)/S)*S,Math.max(S,Math.round(2*w/S)*S),S)}};
const cl=(x,y)=>{rr(x,y+16,88,16,0,'#fff');rr(x+12,y+8,56,8,0,'#fff');rr(x+28,y,24,8,0,'#fff')};
function band(y0,y1,cols){const h=Math.ceil((y1-y0)/cols.length/S)*S;cols.forEach((f,i)=>{g.fillStyle=f;g.fillRect(0,y0+i*h,W,h)})}
// game
let scene,t=0,fade=1,fd=-1,nx,p,hearts,got,letter,lOpen,lt=0,padOff=false,end,parts=[];
const LT_END=175,touch=true;
const PL=[{x:60,y:320,w:130},{x:250,y:260,w:120},{x:430,y:200,w:120},{x:600,y:270,w:130},{x:330,y:340,w:90}];
function go(s){if(fd)return;nx=s;fd=1}
function init(s){scene=s;lOpen=0;lt=0;parts=[];$('fin').classList.remove('on');$('letter').classList.remove('on','rdy');
 if(s=='street')p={x:70,y:380,f:1};
 if(s=='cafe'){p={x:70,y:400,vx:0,vy:0,f:1,on:1};got=0;letter=null;hearts=[[125,290],[310,230],[490,170],[665,240],[375,310],[215,372]].map(([x,y])=>({x,y,on:1}))}
 if(s=='end')end={bx:90,k:0,h:0}}
function openLetter(){lOpen=1;lt=matchMedia('(prefers-reduced-motion:reduce)').matches?LT_END-1:0;$('letter').classList.add('on')}
function ready(){$('letter').classList.add('rdy');$('go').focus()}
$('go').onclick=()=>{$('letter').classList.remove('on','rdy');go('end')};
$('again').onclick=()=>go('street');
c.addEventListener('pointerdown',e=>{if(scene!='cafe'||!letter||lOpen)return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)*W/r.width,y=(e.clientY-r.top)*H/r.height;if(Math.hypot(x-letter.x,y-letter.y)<80)openLetter()});
function burst(x,y,n,h){for(let i=0;i<n;i++)parts.push({x,y,vx:(Math.random()-.5)*4,vy:-Math.random()*3-1,l:50,h})}
function rise(x,y){parts.push({x,y,vx:(Math.random()-.5)*1.2,vy:-1.4-Math.random(),l:120,m:120,h:1,r:1,z:1.3})}
function update(){t++;
 if(fd==1){fade+=.05;if(fade>=1){fade=1;init(nx);fd=-1}}else if(fd==-1){fade-=.05;if(fade<=0){fade=0;fd=0}}
 if(fd==1)return;
 const dx=(any(R)?1:0)-(any(L)?1:0);
 if(scene=='street'){p.x=Math.max(30,Math.min(1280,p.x+dx*2.6));if(dx)p.f=dx;p.walk=dx!=0;if(p.x>=1150)go('cafe')}
 if(scene=='cafe'&&lOpen){p.walk=false;lt++;if(lt>=120&&lt%16==0)rise(260+Math.random()*280,300+Math.random()*40);if(lt==LT_END)ready();c.style.cursor='default'}
 else if(scene=='cafe'){
  p.vx=dx*3.2;if(dx)p.f=dx;
  if(any(U)&&p.on){p.vy=-12;p.on=0}
  const py=p.y;p.vy+=.6;p.x=Math.max(20,Math.min(780,p.x+p.vx));p.y+=p.vy;p.on=0;
  if(p.y>=400){p.y=400;p.vy=0;p.on=1}
  if(p.vy>=0)for(const q of PL)if(py<=q.y&&p.y>=q.y&&p.x>q.x-8&&p.x<q.x+q.w+8){p.y=q.y;p.vy=0;p.on=1}
  p.walk=dx!=0&&p.on;
  for(const h of hearts)if(h.on&&Math.hypot(h.x-p.x,h.y-(p.y-20))<28){h.on=0;got++;burst(h.x,h.y,10,1)}
  if(got==6&&!letter)letter={x:400,y:110};
  c.style.cursor=letter&&!lOpen?'pointer':'default'}
 if(scene=='end'){p={};if(end.bx<384){end.bx+=1.7}else{end.k++;if(end.k>25){end.h++;if(end.h%25==1)burst(415,290,3,1)}}if(end.h==150)$('fin').classList.add('on')}
 parts.forEach(q=>{q.x+=q.vx;q.y+=q.vy;q.vy+=q.r?-.01:(q.h&&scene=='end'?-.01:.08);q.l--});parts=parts.filter(q=>q.l>0)}
function street(){
 const cam=Math.max(0,Math.min(500,p.x-300));
 band(0,380,['#cfe6ff','#d8e9ff','#e3e6fb','#f1e3f4','#ffe9f1','#fff3e0']);
 for(let i=0;i<5;i++)cl(((i*230-cam*.2+t*.1)%1150+1150)%1150-150,50+i%3*35);
 g.save();g.translate(-cam,0);
 const PC=['#ffc9d9','#d6c8f5','#c4ecd9','#ffe2b8','#bfe0f7'],RC=['#ff9fbd','#a58be0','#7fd4ac','#ffc27a','#7fbfe8'];
 for(let i=0;i<5;i++){const x=i*200+20,h=150+(i%2)*40,w=170,y=380-h;
  rr(x,y,w,h,0,PC[i]);rr(x-8,y-8,w+16,8,0,RC[i]);rr(x+8,y-16,w-16,8,0,RC[i]);rr(x+28,y-24,w-56,8,0,RC[i]);
  [x+20,x+w-60].forEach(a=>{rr(a,y+32,40,44,0,'#fff8ee');rr(a+16,y+32,4,44,0,PC[i]);rr(a,y+52,40,4,0,PC[i]);rr(a-4,y+76,48,8,0,'#fff')});
  rr(x+w/2-16,322,32,58,0,'#fff8ee');rr(x+w/2+8,350,4,4,0,'#c26a8d');
  rr(x+6,368,16,12,0,'#e8b98f');circ(x+14,360,8,'#ff9fbd');rr(x+w-22,368,16,12,0,'#e8b98f');circ(x+w-14,360,8,'#fff')}
 [300,700].forEach(x=>{rr(x-2,250,4,130,0,'#b9a6d4');rr(x-12,234,24,20,0,'#fff3b8');rr(x-8,230,16,4,0,'#fff3b8')});
 [480,880].forEach(x=>{rr(x-8,300,16,80,0,'#c9a58a');circ(x,285,36,'#ffc2d6');circ(x-26,305,26,'#ffd3e1');circ(x+26,305,26,'#ffd3e1')});
 rr(1020,170,260,210,0,'#ffd9e4');rr(1010,158,280,12,0,'#ff9fbd');
 for(let k=0;k<8;k++){rr(1016+k*32,225,32,32,0,k%2?'#fff':'#ff9fbd');rr(1024+k*32,257,16,8,0,k%2?'#fff':'#ff9fbd')}
 rr(1070,176,160,44,0,'#8a4a73');rr(1074,180,152,36,0,'#fff8ee');
 g.fillStyle='#c26a8d';g.font='16px "Press Start 2P",monospace';g.textAlign='center';g.fillText('Café',1150,206);
 [1045,1215].forEach(a=>{rr(a,280,40,60,0,'#8a4a73');rr(a+4,284,32,52,0,'#fff8ee')});heart(1065,306,.9,'#ff9fbd');rr(1219,318,16,12,0,'#e8b98f');circ(1227,312,8,'#a8dfc0');
 rr(1120,300,60,80,0,'#b98ad9');rr(1132,312,36,24,0,'#e8d8f7');rr(1168,344,4,4,0,'#fff3b8');
 rr(0,380,1300,70,0,'#fbe3ea');rr(0,380,1300,8,0,'#f3c9d6');
 for(let x=0;x<1300;x+=48){rr(x,404+(x%96?0:24),24,4,0,'#f3c9d6')}
 cat(p.x,p.y,'b',{f:p.f,walk:p.walk,s:1.3});
 g.restore()}
function cafe(){
 g.fillStyle='#ffe3ec';g.fillRect(0,0,W,H);for(let x=0;x<W;x+=80)rr(x,0,40,300,0,'#ffd9e6');
 rr(0,300,W,100,0,'#ffc4d7');rr(0,300,W,8,0,'#ffb3cb');
 rr(324,44,152,140,0,'#ffb3cb');rr(336,56,128,116,0,'#d9eeff');cl(344,84);rr(396,56,8,116,0,'#fff');rr(336,108,128,8,0,'#fff');
 rr(308,40,28,152,0,'#ff9fbd');rr(464,40,28,152,0,'#ff9fbd');
 rr(56,66,128,92,0,'#8a6aa8');rr(64,74,112,76,0,'#e9dcf7');g.fillStyle='#8a4a73';g.font='12px "Press Start 2P",monospace';g.textAlign='center';g.fillText('MENU',120,100);rr(80,112,80,4,0,'#8a4a73');rr(80,128,52,4,0,'#8a4a73');
 [150,650].forEach(x=>{rr(x-2,0,4,50,0,'#b9a6d4');rr(x-20,50,40,16,0,'#fff3b8');rr(x-12,66,24,8,0,'#fff3b8')});
 rr(0,400,W,50,0,'#f2cfa8');for(let x=0;x<W;x+=72)rr(x,400,4,50,0,'#e6b98a');rr(0,400,W,4,0,'#e6b98a');
 PL.forEach((q,i)=>{rr(q.x,q.y,q.w,12,0,'#e8b98f');rr(q.x,q.y,q.w,4,0,'#f5d2ae');rr(q.x+4,q.y+12,8,16,0,'#d9a37a');rr(q.x+q.w-12,q.y+12,8,16,0,'#d9a37a');
  const a=q.x+q.w-36;rr(a,q.y-16,16,16,0,'#fff');rr(a+16,q.y-12,4,8,0,'#fff');rr(a+4,q.y-16,8,4,0,'#c98f6a');
  if(i%2==0){rr(q.x+12,q.y-12,16,12,0,'#d9a37a');circ(q.x+20,q.y-20,8,'#a8dfc0')}});
 hearts.forEach(h=>{if(!h.on)return;const y=Math.round(h.y+Math.sin(t*.07+h.x)*4);circ(h.x,y,18,'rgba(255,255,255,.45)');heart(h.x,y,1.5,'#ff6f9a')});
 if(letter&&!lOpen){const ly=Math.round(letter.y+Math.sin(t*.06)*6),lx=letter.x;circ(lx,ly,44+(t>>3&1)*4,'rgba(255,255,255,.5)');
  rr(lx-32,ly-20,64,40,0,'#e79ab8');rr(lx-28,ly-16,56,32,0,'#fffaf3');
  for(let i=0;i<7;i++){rr(lx-28+i*4,ly-16+i*3,4,4,0,'#e79ab8');rr(lx+24-i*4,ly-16+i*3,4,4,0,'#e79ab8')}
  heart(lx,ly+4,.7,'#ff6f9a')}
 cat(p.x,p.y,'b',{f:p.f,walk:p.walk,s:1.1});
 rr(12,12,188,44,0,'#8a4a73');rr(16,16,180,36,0,'#fff8ee');for(let i=0;i<6;i++)heart(36+i*28,34,1.2,i<got?'#ff6f9a':'#e6d3dc');if(lOpen)letterAnim()}
function letterAnim(){
 const T=lt,ez=x=>1-Math.pow(1-Math.max(0,Math.min(1,x)),3);
 g.fillStyle='rgba(90,50,100,'+(Math.round(Math.min(T/40,1)*4)/8)+')';g.fillRect(0,0,W,H);
 const e=Math.round(ez(T/60)*12)/12,s=1+3*e,w=Math.round(64*s/8)*8,h=Math.round(40*s/S)*S,cx=400,top=Math.round((110+180*e-h/2)/S)*S,dp=Math.round(h*.55/S)*S;
 const cr=(y,ww,hh,f)=>{ww=Math.max(8,Math.round(ww/8)*8);rr(cx-ww/2,y,ww,hh,0,f)};
 const open=T>=85,half=T>=75&&T<85;
 cr(top-S,w+8,h+2*S,'#8a4a73');cr(top,w,h,'#c9577f');
 if(open){for(let r=0;r<dp;r+=S)cr(top-r-S,w*(1-r/dp),S,'#d9769b')}
 else if(half)cr(top-2*S,w,2*S,'#d9769b');
 if(T>=88){
  const u=ez((T-90)/80),pw=Math.round((w-8*s)/8)*8,ph=Math.round(h*1.7/S)*S,pt=Math.round((top+h*.3-u*h*1.37)/S)*S;
  g.save();g.beginPath();g.rect(0,0,W,top+h-S);g.clip();
  cr(pt-S,pw+8,ph+8,'#8a4a73');cr(pt,pw,ph,'#fffaf3');
  g.fillStyle='#c2507f';g.font='20px "Press Start 2P",monospace';g.textAlign='center';
  g.fillText("Je t'aime",cx,pt+56);g.fillText('mon chat',cx,pt+90);
  heart(cx-64,pt+134,1.5,'#ff6f9a');spr(LI,cx-17,pt+122,5,lp);heart(cx+64,pt+134,1.5,'#ff6f9a');
  heart(cx-pw/2+28,pt+26,.8,'#ffb3cb');heart(cx+pw/2-28,pt+26,.8,'#ffb3cb');
  g.restore()}
 cr(top,w,h,'#f4a9c4');
 for(let k=0;k<w/2;k+=S){const y=top+h-Math.round(k*(h*.6)/(w/2)/S)*S;rr(cx-w/2+k,y-S,S,S,0,'#c9577f');rr(cx+w/2-k-S,y-S,S,S,0,'#c9577f')}
 if(!open&&!half){for(let r=0;r<dp;r+=S){const ww=Math.max(8,Math.round(w*(1-r/dp)/8)*8);cr(top+r,ww,S,'#e48aaf');rr(cx-ww/2,top+r,S,S,0,'#c9577f');rr(cx+ww/2-S,top+r,S,S,0,'#c9577f')}
  heart(cx,top+dp*.45,s*.4,'#ff6f9a')}}
function endScene(){
 band(0,300,['#c9b8f0','#d8bcf0','#f0bfe0','#ffc4d6','#ffd0c4','#ffdcb8','#ffe8c0']);
 circ(400,262,96,'rgba(255,240,190,.3)');circ(400,262,72,'rgba(255,240,190,.5)');circ(400,262,50,'#fff3b8');
 cl(80+Math.round(Math.sin(t*.01)*20),70);cl(560-Math.round(Math.sin(t*.01)*20),50);
 for(let x=0;x<W;x+=8){const h1=Math.round((30+16*Math.sin(x*.011)+10*Math.sin(x*.027))/S)*S,h2=Math.round((10+8*Math.sin(x*.02+1))/S)*S;rr(x,300-h1,8,h1+12,0,'#e0cbf0');rr(x,300-h2,8,h2+12,0,'#c9e8d4')}
 ['#ffd9c2','#f9d0d0','#f6c9dc','#f0c4e4'].forEach((f,i)=>rr(0,300+i*20,W,20,0,f));
 for(let k=0;k<7;k++){const w=88-k*10+Math.round(Math.sin(t*.05+k)*8);rr(400-w/2,304+k*10,w,4,0,'rgba(255,243,184,.9)')}
 for(let k=0;k<9;k++){rr((k*97+t*.3)%W,316+k%4*14,20,4,0,'rgba(255,255,255,.7)')}
 rr(0,376,W,74,0,'#c5ebd0');for(let x=0;x<W;x+=16)rr(x,(x/16)%2?368:372,16,12,0,'#c5ebd0');rr(0,424,W,26,0,'#a9dcb9');
 [60,740].forEach(x=>{rr(x-8,250,16,130,0,'#c9a58a');circ(x,235,48,'#ffb3cb');circ(x-34,265,34,'#ffd3e1');circ(x+34,265,34,'#ffd3e1')});
 for(let i=0;i<18;i++){const x=(i*47)%W,y=392+(i*31)%48;rr(x,y+8,4,8,0,'#7fd4ac');rr(x-2,y,8,8,0,['#ff9fbd','#fff','#ffe27a'][i%3])}
 for(let i=0;i<14;i++)if(((t>>4)+i)%3)rr((i*83+t*.4)%W,150+(i*53)%160+Math.round(Math.sin(t*.03+i)*10),4,4,0,'#fff');
 const arrived=end.bx>=384;
 cat(446,400,'w',{f:-1,s:1.25,close:arrived&&end.k>10});
 cat(end.bx,400,'b',{f:1,s:1.25,walk:!arrived,close:arrived&&end.k>10});
 if(end.h>0){const sc=Math.min(end.h/20,1),e=1+2.7*Math.pow(sc-1,3)+Math.pow(sc-1,2)*1.7;heart(415,300-Math.min(end.h,40)*.7+Math.sin(t*.08)*3,2.4*e,'#ff6f9a')}}
function draw(){
 if(scene=='street')street();else if(scene=='cafe')cafe();else if(scene=='end')endScene();
 parts.forEach(q=>{g.globalAlpha=Math.min(1,q.l/(q.m||50));heart(q.x,q.y,q.z||.8,'#ff6f9a')});g.globalAlpha=1;
 if(fade>0){g.fillStyle='rgba(255,246,250,'+Math.round(fade*4)/4+')';g.fillRect(0,0,W,H)}
 const h=scene=='street'?(touch?'Marche jusqu’au café avec les boutons':'Marche jusqu’au café avec ← →'):scene=='cafe'?(lOpen?'':letter?(touch?'Touche la lettre !':'Clique sur la lettre !'):(touch?'Attrape les 6 cœurs avec les boutons':'Attrape les 6 cœurs : ← → bouger, ↑ ou espace sauter')):'';
 if($('hint').textContent!==h)$('hint').textContent=h;
 const po=scene=='end'||!!lOpen;if(po!==padOff){padOff=po;$('pad').classList.toggle('off',po)}}
let last=performance.now(),acc=0;
function loop(n){acc+=Math.min(n-last,100);last=n;while(acc>=16.67){update();acc-=16.67}draw();requestAnimationFrame(loop)}
init('street');requestAnimationFrame(loop);