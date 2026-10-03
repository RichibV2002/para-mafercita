'use strict';
// Fecha oficial: 26/11/2024, medianoche en Perú (UTC-5).
const START = Date.UTC(2024, 10, 26, 5);
function calendarDuration(nowMs) {
  const now = new Date(Math.max(nowMs, START) - 5 * 3600000);
  let totalMonths = (now.getUTCFullYear()-2024)*12 + now.getUTCMonth()-10;
  function anniversary(months) {
    return new Date(Date.UTC(2024,10+months,26));
  }
  if (anniversary(totalMonths)>now) totalMonths--;
  totalMonths=Math.max(0,totalMonths);
  let rest=Math.floor((now-anniversary(totalMonths))/1000);
  const days=Math.floor(rest/86400); rest%=86400;
  const hours=Math.floor(rest/3600); rest%=3600;
  const minutes=Math.floor(rest/60), seconds=rest%60;
  return {years:Math.floor(totalMonths/12),months:totalMonths%12,days,hours,minutes,seconds};
}
function updateCounter(){const values=calendarDuration(Date.now());for(const [key,value] of Object.entries(values))document.getElementById(key).textContent=['hours','minutes','seconds'].includes(key)?String(value).padStart(2,'0'):value;}
updateCounter();setInterval(updateCounter,1000);
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced){for(let i=0;i<27;i++){const p=document.createElement('span');p.className='particle';p.textContent=i%4===0?'♡':'·';p.style.cssText=`--left:${Math.random()*100}%;--size:${12+Math.random()*16}px;--duration:${16+Math.random()*20}s;--delay:${-Math.random()*36}s`;document.getElementById('particles').append(p);}}
const letterDialog=document.getElementById('letterDialog');
document.querySelectorAll('[data-letter]').forEach(button=>button.addEventListener('click',()=>letterDialog.showModal()));
document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}}));
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{const img=button.querySelector('img');document.getElementById('largePhoto').src=img.src;document.getElementById('largePhoto').alt=img.alt;document.getElementById('photoCaption').textContent=button.querySelector('i').textContent;document.getElementById('photoDialog').showModal();}));
const audio=document.getElementById('audio'), music=document.getElementById('music');audio.volume=.35;
let statusTimer;
function status(message){const el=document.getElementById('musicStatus');el.textContent=message;el.classList.add('visible');clearTimeout(statusTimer);statusTimer=setTimeout(()=>el.classList.remove('visible'),2500);}
music.addEventListener('click',async()=>{if(audio.paused){try{await audio.play();music.setAttribute('aria-pressed','true');music.setAttribute('aria-label','Pausar música');status('Una melodía para nosotros ♡');}catch{status('No se pudo reproducir la música. Inténtalo de nuevo.');}}else{audio.pause();music.setAttribute('aria-pressed','false');music.setAttribute('aria-label','Reproducir música');status('Música en pausa');}});
