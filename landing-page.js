(function(){
var ID='tdv-landing',HID='tdv-landing-hide',C='#d71920',w=window,d=document;
if(w.tdvLanding&&w.tdvLanding._v)return;

/* ---- Edit the landing content here ---- */
var CFG={
/* Pick a direction: 'monolith' (dark, full-bleed, giant type)
                     'gallery'  (ivory, framed image, museum-wall layout)
                     'triptych' (dark, tall centre image, text either side) */
layout:'monolith',
kicker:'Discover',
lead:'The',
title:'Villages',
subtitle:'by LIMA Estate',
tagline:'A modern community designed for a brighter, more connected tomorrow.',
cta:'Explore The Villages',
/* Text only, not clickable */
places:['Brook','Sierra','Meadow'],
caption:'360° Virtual Tour',
/* IMAGE: paste a URL or data URI to replace the placeholder (landscape ~2400x1400 for monolith/gallery, portrait ~1200x1800 for triptych). */
image:'',
placeholder:'Image placeholder'
};
var LAY={monolith:'la',gallery:'lb',triptych:'lc'};

var F="'Inter','Inter Web',sans-serif";
function ensureInter(){
/* Inter from Google Fonts. tdv-font.js embeds the same font as an offline fallback. */
if(d.getElementById('tdv-gf'))return;
var h=d.head||d.documentElement,l;
l=d.createElement('link');l.rel='preconnect';l.href='https://fonts.googleapis.com';h.appendChild(l);
l=d.createElement('link');l.rel='preconnect';l.href='https://fonts.gstatic.com';l.crossOrigin='anonymous';h.appendChild(l);
l=d.createElement('link');l.id='tdv-gf';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&display=swap';h.appendChild(l);
/* Second Inter source (jsDelivr) in case Google Fonts is blocked, plus a page-wide rule so every tour element uses Inter too. */
var ff='';
[200,300,400,500,600,700].forEach(function(n){ff+="@font-face{font-family:'Inter Web';font-style:normal;font-weight:"+n+";font-display:swap;src:url(https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-"+n+"-normal.woff2) format('woff2')}";});
ff+="html body,html body *:not(.material-icons):not([class^='fa']){font-family:'Inter','Inter Web',sans-serif!important}";
var st=d.createElement('style');st.id='tdv-ff';st.textContent=ff;h.appendChild(st);
}
function ensureLight(){
/* If the nav script created the font links first, make sure weight 200 is available too. */
if(d.getElementById('tdv-gf-l'))return;
var h=d.head||d.documentElement,l,st;
l=d.createElement('link');l.id='tdv-gf-l';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Inter:wght@200&display=swap';h.appendChild(l);
st=d.createElement('style');st.id='tdv-ff-l';
st.textContent="@font-face{font-family:'Inter Web';font-style:normal;font-weight:200;font-display:swap;src:url(https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-200-normal.woff2) format('woff2')}";
h.appendChild(st);
}
function chk(tag){
/* Logs whether a real Inter face (Google or embedded) has loaded. */
setTimeout(function(){try{Promise.all([d.fonts.load('200 16px Inter'),d.fonts.load('600 16px Inter'),d.fonts.load('200 16px "Inter Web"'),d.fonts.load('600 16px "Inter Web"')]).then(function(){
var ok=false;d.fonts.forEach(function(f){if(/^Inter( Web)?$/.test(String(f.family).replace(/["']/g,''))&&f.status==='loaded')ok=true;});
console.log('['+tag+'] Inter active:',ok);
});}catch(e){}},2500);
}
var root=null,isOpen=false,timer=null;

/* Hide the nav the moment this script loads so it never flashes before the landing page. */
function head(){return d.head||d.documentElement;}
function addHide(){
if(d.getElementById(HID))return;
var s=d.createElement('style');s.id=HID;
s.textContent='#tdv-nav{visibility:hidden!important}';
head().appendChild(s);
}
function delHide(){var s=d.getElementById(HID);if(s&&s.parentNode)s.parentNode.removeChild(s);}

function css(){
if(d.getElementById(ID+'-css'))return;
var s=d.createElement('style');s.id=ID+'-css';
s.textContent=[
'&{--m:clamp(18px,2.4vw,40px);--it:clamp(200px,32vh,300px);--ib:clamp(112px,16vh,150px);--cw:clamp(280px,31vw,600px);--g:clamp(24px,3vw,56px);--ink:#14161a;--mute:#6a6e75;--paper:#f3f0ea;--red:$C;--ease:cubic-bezier(.22,.8,.2,1);position:fixed;left:0;top:0;right:0;bottom:0;z-index:2147483647;display:none;overflow:hidden;background:#0a0c10;font-family:$F;color:#fff;opacity:0;transition:opacity .8s ease;pointer-events:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}',
'&.show{opacity:1}',
'& *{box-sizing:border-box;border-radius:0}',
'&,& *{font-family:$F!important}',
'& button{margin:0;padding:0;border:0;background:none;color:inherit;font:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent}',
/* ---------- shared pieces ---------- */
'& .img{position:absolute;overflow:hidden;background:#232a33}',
'& .ph{position:absolute;left:0;top:0;right:0;bottom:0;background:center/cover no-repeat,linear-gradient(140deg,#1d232b 0%,#364050 52%,#242b35 100%)}',
'& .ph:before{content:"";position:absolute;left:0;top:0;right:0;bottom:0;background:repeating-linear-gradient(135deg,rgba(255,255,255,.035) 0 1px,transparent 1px 24px)}',
'&.set .ph:before,&.set .lbl{display:none}',
'& .gr{position:absolute;left:0;top:0;right:0;bottom:0;display:none}',
'& .fr{position:absolute;left:var(--fi,16px);right:var(--fi,16px);top:var(--fi,16px);bottom:var(--fi,16px);border:1px solid rgba(255,255,255,.3);pointer-events:none}',
'& .fr i{position:absolute;width:12px;height:12px;border:0 solid var(--red)}',
'& .fr i:nth-child(1){left:-1px;top:-1px;border-left-width:2px;border-top-width:2px}',
'& .fr i:nth-child(2){right:-1px;bottom:-1px;border-right-width:2px;border-bottom-width:2px}',
'& .lbl{position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;align-items:center;gap:16px;text-align:center;font-size:clamp(10.5px,.82vw,12.5px);font-weight:600;letter-spacing:.4em;text-transform:uppercase;color:rgba(255,255,255,.72)}',
'& .lbl svg{width:clamp(40px,3.6vw,60px);height:clamp(40px,3.6vw,60px);fill:none;stroke:rgba(255,255,255,.6);stroke-width:1;stroke-linecap:round;stroke-linejoin:round}',
'& .lbl small{font-size:.86em;font-weight:400;letter-spacing:.24em;color:rgba(255,255,255,.4)}',
'& .logo{position:absolute;display:none;align-items:center;padding:clamp(12px,1.7vh,20px) clamp(22px,2vw,36px);background:#fff;box-shadow:0 22px 52px rgba(0,0,0,.4),0 2px 6px rgba(0,0,0,.2)}',
'& .logo.has{display:flex}',
'& .lg{display:block;height:auto;width:auto;max-height:clamp(44px,7vh,74px);max-width:clamp(160px,16vw,260px)}',
'& .cap{position:absolute;display:flex;align-items:center;gap:16px;font-size:clamp(10px,.78vw,12px);font-weight:600;letter-spacing:.38em;text-transform:uppercase;color:#fff;text-shadow:0 1px 14px rgba(0,0,0,.5)}',
'& .cap:before{content:"";width:clamp(28px,3vw,52px);height:2px;background:var(--red)}',
'& .ac{width:clamp(36px,3vw,52px);height:3px;margin-bottom:clamp(16px,2.6vh,28px);background:var(--red)}',
'& .k{margin-bottom:clamp(12px,2vh,22px);font-size:clamp(10.5px,.78vw,12px);font-weight:600;letter-spacing:.5em;text-transform:uppercase;color:rgba(255,255,255,.7)}',
'& .ld{font-size:clamp(12.5px,1.05vw,17px);font-weight:500;letter-spacing:.5em;text-transform:uppercase;color:#fff}',
'& .t{margin:0;font-weight:200;color:inherit}',
'& .s{margin-top:clamp(12px,2vh,22px);font-size:clamp(10.5px,.84vw,13px);font-weight:500;letter-spacing:.42em;text-transform:uppercase;color:rgba(255,255,255,.66)}',
'& .p{margin:0;font-size:clamp(13.5px,1.02vw,16.5px);line-height:1.7;font-weight:300;letter-spacing:.01em;color:rgba(255,255,255,.78)}',
'& .pf{display:flex;gap:clamp(22px,3vw,48px);font-size:clamp(9.5px,.76vw,11.5px);font-weight:500;letter-spacing:.3em;text-transform:uppercase;color:rgba(255,255,255,.82)}',
'& .pf b{margin-right:.9em;font-weight:600;letter-spacing:.12em;color:#fff}',
/* the one interactive element */
'& .go{position:relative;overflow:hidden;display:inline-flex;align-items:center;gap:clamp(16px,1.5vw,26px);padding:clamp(16px,1.6vw,21px) clamp(26px,2.4vw,42px);background:var(--red);color:#fff;font-size:clamp(11.5px,.88vw,13px);font-weight:600;letter-spacing:.28em;text-transform:uppercase;box-shadow:0 16px 38px rgba(215,25,32,.34),0 2px 6px rgba(0,0,0,.25);transition:transform .5s var(--ease),box-shadow .5s var(--ease),background .3s}',
'& .go:after{content:"";position:absolute;top:0;bottom:0;left:-60%;width:40%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.3),transparent);transform:skewX(-20deg);transition:left 1s var(--ease);pointer-events:none}',
'& .go:hover,& .go:focus-visible{transform:translateY(-3px);background:#e11f27;box-shadow:0 24px 50px rgba(215,25,32,.46),0 2px 6px rgba(0,0,0,.25)}',
'& .go:hover:after,& .go:focus-visible:after{left:130%}',
'& .go:active{transform:translateY(-1px)}',
'& .go:focus-visible{outline:1px solid #fff;outline-offset:5px}',
'& .ar{display:block;flex:none;width:clamp(30px,2.6vw,44px);height:12px;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;transition:transform .5s var(--ease)}',
'& .go:hover .ar,& .go:focus-visible .ar{transform:translateX(7px)}',

/* ---------- A  MONOLITH: dark, full-bleed, giant type ---------- */
'&.la .img{left:0;top:0;right:0;bottom:0}',
'&.la .gr{display:block;background:linear-gradient(180deg,rgba(8,10,14,.55) 0%,rgba(8,10,14,0) 20%,rgba(8,10,14,.3) 44%,rgba(8,10,14,.95) 100%),linear-gradient(90deg,rgba(8,10,14,.5) 0%,rgba(8,10,14,0) 62%)}',
'&.la .fr{--fi:var(--m)}',
'&.la .lbl{top:28%}',
'&.la .logo{left:calc(var(--m) + 26px);top:calc(var(--m) + 26px)}',
'&.la .cap{right:calc(var(--m) + 28px);top:calc(var(--m) + 32px)}',
'&.la .cn{position:absolute;left:calc(var(--m) + 28px);right:calc(var(--m) + 28px);bottom:calc(var(--m) + 24px);display:flex;flex-direction:column}',
'&.la .t{margin-left:-.05em;font-size:clamp(60px,min(15.5vw,27vh),290px);line-height:.88;letter-spacing:-.055em}',
'&.la .ttl .s{margin-top:clamp(10px,1.8vh,20px)}',
'&.la .bt{display:flex;align-items:flex-end;justify-content:space-between;gap:clamp(20px,3vw,56px);margin-top:clamp(18px,3.2vh,36px);padding-top:clamp(16px,2.6vh,26px);border-top:1px solid rgba(255,255,255,.24)}',
'&.la .bd{display:contents}',
'&.la .p{order:1;max-width:27em}',
'&.la .pf{order:2}',
'&.la .go{order:3}',

/* ---------- B  GALLERY: ivory, framed image, museum-wall layout ---------- */
'&.lb{background:var(--paper);color:var(--ink)}',
'&.lb .img{left:calc(var(--m)*2);right:calc(var(--m)*2);top:var(--it);bottom:var(--ib)}',
'&.lb .logo{left:calc(var(--m)*2);top:var(--m);box-shadow:0 0 0 1px rgba(20,22,26,.07),0 14px 36px rgba(20,22,26,.1)}',
'&.lb .cap{right:calc(var(--m)*2);top:calc(var(--m) + 14px);color:var(--mute);text-shadow:none}',
'&.lb .cn{display:contents}',
'&.lb .ttl{position:absolute;left:0;right:0;top:calc(var(--m) + 4px);height:calc(var(--it) - var(--m) - 28px);display:flex;flex-wrap:wrap;align-content:center;justify-content:center;align-items:baseline;column-gap:.55em;padding:0 calc(var(--m)*2)}',
'&.lb .intro{display:none}',
'&.lb .ld{color:var(--ink)}',
'&.lb .t{font-size:clamp(46px,min(7vw,12vh),128px);line-height:1;letter-spacing:-.045em;color:var(--ink)}',
'&.lb .s{flex-basis:100%;margin-top:clamp(10px,1.8vh,20px);text-align:center;color:var(--mute)}',
'&.lb .bt,&.lb .bd{display:contents}',
'&.lb .p{position:absolute;left:calc(var(--m)*2);bottom:calc((var(--ib) - 56px)/2);max-width:27em;font-weight:400;color:#3b3f46}',
'&.lb .go{position:absolute;right:calc(var(--m)*2);bottom:calc((var(--ib) - 58px)/2);box-shadow:0 16px 36px rgba(215,25,32,.28),0 2px 6px rgba(20,22,26,.16)}',
'&.lb .go:focus-visible{outline-color:var(--ink)}',
'&.lb .pf{position:absolute;left:calc(var(--m)*2 + 34px);bottom:calc(var(--ib) + 30px)}',
'&.lb .fr{--fi:16px}',

/* ---------- C  TRIPTYCH: dark, tall centre image, text either side ---------- */
'&.lc{background:#0b0d11}',
'&.lc .img{left:50%;transform:translateX(-50%);width:var(--cw);top:var(--m);bottom:var(--m)}',
'&.lc .gr{display:block;background:linear-gradient(180deg,rgba(8,10,14,.25) 0%,rgba(8,10,14,0) 30%,rgba(8,10,14,.55) 100%)}',
'&.lc .logo{left:var(--m);top:var(--m)}',
'&.lc .cap{right:var(--m);top:calc(var(--m) + 6px)}',
'&.lc .cn,&.lc .bt{display:contents}',
'&.lc .ttl{position:absolute;left:var(--m);right:calc(50% + var(--cw)/2 + var(--g));top:50%;transform:translateY(-50%);text-align:right}',
'&.lc .ac{margin-left:auto}',
'&.lc .t{font-size:clamp(40px,min(5.6vw,11vh),112px);line-height:.98;letter-spacing:-.045em}',
'&.lc .bd{position:absolute;left:calc(50% + var(--cw)/2 + var(--g));right:var(--m);top:50%;transform:translateY(-50%);display:flex;flex-direction:column;align-items:stretch}',
'&.lc .p{margin-bottom:clamp(22px,3.6vh,38px);padding-left:clamp(14px,1.4vw,22px);border-left:2px solid var(--red)}',
'&.lc .go{width:100%;justify-content:space-between}',
'&.lc .pf{position:absolute;left:var(--m);bottom:calc(var(--m) + 4px)}',

/* ---------- entrance ---------- */
'@keyframes tdvUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}',
'@keyframes tdvFd{from{opacity:0}to{opacity:1}}',
'@keyframes tdvKen{from{transform:scale(1.07)}to{transform:none}}',
'&.show .img{animation:tdvFd 1.4s ease .1s both}',
'&.show .ph{animation:tdvKen 24s ease-out both}',
'&.show .logo{animation:tdvUp 1s var(--ease) .5s both}',
'&.show .ac,&.show .k{animation:tdvUp 1s var(--ease) .75s both}',
'&.show .ld{animation:tdvUp 1s var(--ease) .85s both}',
'&.show .t{animation:tdvUp 1.3s var(--ease) .95s both}',
'&.show .s{animation:tdvUp 1s var(--ease) 1.15s both}',
'&.show .p{animation:tdvUp 1s var(--ease) 1.25s both}',
'&.show .go{animation:tdvUp 1s var(--ease) 1.4s both}',
'&.show .fr,&.show .cap,&.show .pf,&.show .lbl{animation:tdvFd 1.6s ease 1.4s both}',
'&.show.lb .lbl,&.show.lc .lbl,&.show.la .lbl{animation:tdvFd 1.6s ease 1.4s both}',
/* reveal of the navigation when the landing closes */
'@keyframes tdvLUp{from{opacity:0;margin-bottom:-70px}to{opacity:1;margin-bottom:0}}',
'@keyframes tdvFadeIn{from{opacity:0}to{opacity:1}}',
'@keyframes tdvBrandRev{0%{opacity:0;transform:scale(.78) translateY(-12px)}60%{opacity:1;transform:scale(1.05)}100%{opacity:1;transform:none}}',
'#tdv-nav.tdv-rev .bar{animation:tdvLUp .7s ease both}',
'#tdv-nav.tdv-rev .brand{animation:tdvBrandRev .8s cubic-bezier(.2,.9,.3,1.1) .1s both}',
'#tdv-nav.tdv-rev .cv,#tdv-nav.tdv-rev .ctl,#tdv-nav.tdv-rev .burger{animation:tdvFadeIn .7s ease .2s both}',

/* ---------- phones: image band on top, content sheet below (all layouts) ---------- */
'@media(max-width:760px){',
'&{--m:12px}',
'&.la .img,&.lb .img,&.lc .img{left:0;right:0;top:0;bottom:auto;width:auto;height:38%;transform:none}',
'&.la .gr{background:linear-gradient(180deg,rgba(8,10,14,.45) 0%,rgba(8,10,14,0) 40%)}',
'& .fr,& .cap{display:none}',
'& .lbl{top:58%}',
'&.la .logo,&.lb .logo,&.lc .logo{left:16px;top:calc(16px + env(safe-area-inset-top,0px));padding:10px 18px;box-shadow:0 12px 30px rgba(0,0,0,.35)}',
'& .lg{max-height:38px;max-width:150px}',
'&.la .cn,&.lb .cn,&.lc .cn{position:absolute;display:flex;flex-direction:column;justify-content:flex-end;left:0;right:0;top:38%;bottom:0;padding:20px 24px calc(22px + env(safe-area-inset-bottom,0px));background:#0a0c10;overflow:hidden}',
'&.lb .cn{background:var(--paper)}',
'&.lc .cn{background:#0b0d11}',
'&.la .ttl,&.lb .ttl,&.lc .ttl{position:static;transform:none;display:block;height:auto;padding:0;text-align:left}',
'&.lb .intro{display:block}',
'&.lc .ac{margin-left:0}',
'&.la .t,&.lb .t,&.lc .t{font-size:clamp(44px,14vw,76px);margin-left:-.04em}',
'&.lb .s{text-align:left}',
'&.la .bt,&.lb .bt,&.lc .bt{display:flex;flex-direction:column;position:static;margin:0;padding:0;border:0}',
'&.la .bd,&.lb .bd,&.lc .bd{display:contents;position:static;transform:none}',
'&.la .p,&.lb .p,&.lc .p{position:static;order:1;max-width:none;margin:16px 0 20px;padding:0;border:0}',
'&.la .go,&.lb .go,&.lc .go{position:static;order:2;width:100%;justify-content:space-between}',
'&.la .pf,&.lb .pf,&.lc .pf{position:static;order:3;margin-top:18px;gap:22px}',
'&.lb .pf{color:var(--mute)}&.lb .pf b{color:var(--red)}',
'}',
'@media(max-height:620px) and (min-width:761px){&{--m:16px}& .ac{margin-bottom:10px}& .k{margin-bottom:8px}& .p{font-size:12.5px;line-height:1.5}& .go{padding:12px 24px}& .lg{max-height:30px}& .logo{padding:7px 16px}& .lbl svg{display:none}&.la .t{font-size:clamp(46px,25vh,150px)}&.la .bt{margin-top:12px;padding-top:12px}&.lc .p{margin-bottom:16px}}',
'@media(prefers-reduced-motion:reduce){&,&.show .img,&.show .ph,&.show .logo,&.show .ac,&.show .k,&.show .ld,&.show .t,&.show .s,&.show .p,&.show .go,&.show .fr,&.show .cap,&.show .pf,&.show .lbl,& .go,& .go:after,& .ar,#tdv-nav.tdv-rev .bar,#tdv-nav.tdv-rev .brand,#tdv-nav.tdv-rev .cv,#tdv-nav.tdv-rev .ctl,#tdv-nav.tdv-rev .burger{transition:none!important;animation:none!important}}'
].join('').replace(/&/g,'#'+ID).replace(/\$C/g,C).replace(/\$F/g,F);
head().appendChild(s);
}

function logoSrc(){return w.tdvLogo||'';}
function esc(x){return String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');}
var ARROW='<svg class="ar" viewBox="0 0 44 12" aria-hidden="true" focusable="false"><path d="M1 6h41M37 1l5 5-5 5"/></svg>';
var PICT='<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><rect x="6" y="9" width="36" height="30"/><circle cx="17" cy="20" r="3.4"/><path d="M6 33l10-9 8 7 6-5 12 10"/></svg>';

function pickLayout(){
var q='';
try{q=(/[?&]landing=([a-z]+)/.exec(w.location.search)||[])[1]||'';}catch(e){}
return LAY[q]?q:(LAY[CFG.layout]?CFG.layout:'monolith');
}
function setLayout(name){
if(!root||!LAY[name])return;
root.classList.remove('la','lb','lc');
root.classList.add(LAY[name]);
/* replay the entrance so the new direction can be judged from the start */
root.classList.remove('show');void root.offsetWidth;root.classList.add('show');
}

function build(){
if(root)return;
css();
root=d.createElement('div');root.id=ID;
root.className=LAY[pickLayout()];
root.setAttribute('tabindex','-1');root.style.outline='none';
root.setAttribute('role','dialog');root.setAttribute('aria-modal','true');root.setAttribute('aria-labelledby','tdv-l-title');
var pl=CFG.places.map(function(x,i){return '<span><b>0'+(i+1)+'</b>'+esc(x)+'</span>';}).join('');
root.innerHTML='<div class="img" aria-hidden="true"><div class="ph"></div><div class="gr"></div><div class="fr"><i></i><i></i></div><div class="lbl">'+PICT+'<span class="lt"></span><small>Set CFG.image to replace</small></div></div>'
+'<div class="logo"><img class="lg" alt=""></div><div class="cap" aria-hidden="true"></div>'
+'<div class="cn"><div class="ttl"><div class="intro"><div class="ac"></div><div class="k"></div></div><div class="ld"></div><h1 class="t" id="tdv-l-title"></h1><div class="s"></div></div>'
+'<div class="bt"><div class="bd"><p class="p"></p><button class="go" type="button"><span class="gt"></span>'+ARROW+'</button></div><div class="pf" aria-hidden="true">'+pl+'</div></div></div>';
root.querySelector('.k').textContent=CFG.kicker;
root.querySelector('.ld').textContent=CFG.lead;
root.querySelector('.t').textContent=CFG.title;
root.querySelector('.s').textContent=CFG.subtitle;
root.querySelector('.p').textContent=CFG.tagline;
root.querySelector('.gt').textContent=CFG.cta;
root.querySelector('.cap').textContent=CFG.caption;
root.querySelector('.lt').textContent=CFG.placeholder;
if(CFG.image){root.querySelector('.ph').style.backgroundImage='url("'+CFG.image+'")';root.classList.add('set');}
root.querySelector('.go').addEventListener('click',function(){enter(null);});
/* The nav script exposes its logo as window.tdvLogo; pick it up whichever script finishes first. */
var img=root.querySelector('.lg'),box=root.querySelector('.logo'),n=0,iv=setInterval(function(){
var s=logoSrc();
if(s){img.src=s;box.classList.add('has');clearInterval(iv);}else if(++n>50)clearInterval(iv);
},100);
}

/* Keep the landing visible inside whichever element 3DVista makes fullscreen. */
function fs(){return d.fullscreenElement||d.webkitFullscreenElement||d.mozFullScreenElement||d.msFullscreenElement||null;}
function place(){
if(!root)return;
var f=fs(),h=d.body;
if(f&&f!==d.documentElement&&f!==d.body&&f.tagName!=='VIDEO'&&f.tagName!=='CANVAS')h=f;
if(h&&root.parentNode!==h)h.appendChild(root);
}

function open(){
build();addHide();place();
clearTimeout(timer);
root.style.display='block';
void root.offsetWidth;
root.classList.add('show');
isOpen=true;
try{root.focus({preventScroll:true});}catch(e){}
}

function close(){
if(!root||!isOpen)return;
isOpen=false;
root.classList.remove('show');
clearTimeout(timer);
timer=setTimeout(function(){
root.style.display='none';
delHide();
var n=d.getElementById('tdv-nav');
if(n){n.classList.add('tdv-rev');setTimeout(function(){n.classList.remove('tdv-rev');},1000);try{var br=n.querySelector('.brand');if(br)br.focus({preventScroll:true});}catch(e){}}
},800);
}

function enter(idx){
close();
if(idx!=null){try{if(w.tdvNav)w.tdvNav(idx);}catch(e){console.log('[Landing] jump failed',e);}}
}

d.addEventListener('keydown',function(e){
if(!isOpen)return;
var k=e.key;
if(k==='Tab'){e.preventDefault();try{root.querySelector('.go').focus();}catch(x){}return;}
if(k==='Enter'||e.keyCode===13||k==='Escape'||e.keyCode===27){e.preventDefault();close();}
});
['fullscreenchange','webkitfullscreenchange','mozfullscreenchange','MSFullscreenChange'].forEach(function(n){
d.addEventListener(n,function(){place();setTimeout(place,300);});
});
w.addEventListener('resize',place);
setInterval(place,1000);

w.tdvLanding={_v:10,open:open,close:close,isOpen:function(){return isOpen;},setLayout:setLayout};
try{w.parent.tdvLanding=w.top.tdvLanding=w.tdvLanding;}catch(e){}

addHide();
function start(){try{ensureInter();ensureLight();open();chk('Landing');console.log('[Landing] ready, layout:',pickLayout());}catch(e){console.log('[Landing] error',e);delHide();}}
console.log('[Landing] script loaded v16');
if(d.body)start();else d.addEventListener('DOMContentLoaded',start);
})();