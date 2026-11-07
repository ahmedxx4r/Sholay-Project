const $=id=>document.getElementById(id);
const year=$('year');if(year)year.textContent=new Date().getFullYear();
const menu=$('menu'),nav=$('nav');
if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});}
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false');}));
async function post(url,body){const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.error||'حدث خطأ أثناء إرسال الطلب');return d;}
const form=$('contactForm');
if(form){form.addEventListener('submit',async e=>{e.preventDefault();const button=form.querySelector('button'),status=$('contactStatus');button.disabled=true;button.textContent='جاري الإرسال…';try{const d=await post('/api/contact',Object.fromEntries(new FormData(form).entries()));status.textContent=d.message||'تم إرسال طلبك بنجاح.';form.reset();}catch(err){status.textContent=err.message;}finally{button.disabled=false;button.innerHTML='إرسال طلب التواصل <span>↗</span>';}});}
