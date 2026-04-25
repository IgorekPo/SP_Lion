// RESET------------------------------------------------------
if ('scrollRestoration' in history) {
   history.scrollRestoration = 'manual';
}


const burgerMenu = document.querySelector ('.header__burger');
const headerMenu = document.querySelector ('.header__menu');

burgerMenu.addEventListener('click' , function(){
   burgerMenu.classList.toggle ('active');
   headerMenu.classList.toggle ('active');
})

const menuLinks = document.querySelectorAll ('.header__link');

menuLinks.forEach (link =>{
   link.addEventListener('click',()=>{
   burgerMenu.classList.remove ('active');
   headerMenu.classList.remove ('active');
   })
})

document.addEventListener ('click' , (e)=>{
   if (headerMenu.classList.contains ('active') && !headerMenu.contains(e.target) && !burgerMenu.contains(e.target)){
         burgerMenu.classList.remove ('active');
   headerMenu.classList.remove ('active');
   }
})


// ============INPUT==================================


const inputs = document.querySelectorAll('.order__input');
const submitBtn = document.querySelector('.order__submit');

function checkInputs() {
    const allFilled = Array.from(inputs).every(input => input.value.trim().length > 12);

    if (allFilled) {
        submitBtn.classList.add('active');
    } else {
        submitBtn.classList.remove('active');
    }
}
inputs.forEach(input => {
    input.addEventListener('input', checkInputs);
});


function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');
    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);
    }
  }

// ==============================================


// form TEL

const phoneInput = document.getElementById ('phone');
const prefix = '+380'

phoneInput.addEventListener ('focus', () =>{
   if(phoneInput.value === '' ){
      phoneInput.value = prefix;
   }
});
phoneInput.addEventListener ('blur', ()=>{
   if (phoneInput.value === prefix ){
      phoneInput.value = ''
   }
});
phoneInput.addEventListener('input', (e) => {
   let value = phoneInput.value;
   if (!value.startsWith(prefix)) {
   phoneInput.value = prefix + value.replace(/\D/g, '').slice(3, 12);
   }
   const digitsOnly = value.substring(prefix.length).replace(/\D/g, '');
   phoneInput.value = prefix + digitsOnly.slice(0, 9);
});
phoneInput.addEventListener('click', () => {
   if (phoneInput.selectionStart < prefix.length) {
   phoneInput.setSelectionRange(prefix.length, prefix.length);
   }
});
// ===============================================


// FAQ============================================

const faqBlock = document.querySelectorAll('.faq__block');

faqBlock.forEach(block => {
  block.addEventListener('click', function() {
    const currentActive = document.querySelector('.faq__block.active');
    if (currentActive) {
      currentActive.classList.remove('active');
      if (currentActive === this) {
        return;
      }
    }
    this.classList.add('active');
  });
});


// PARALLAX========================================

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll(".herro__parallax-item");
  setTimeout(() => {
    items.forEach((item) => {
      const targetTop = item.getAttribute("data-top");
      const targetLeft = item.getAttribute("data-left");
      item.style.top = `${targetTop}%`;
      item.style.left = `${targetLeft}%`;
      item.style.opacity = '1';
    });
  }, 2000); 

  setTimeout(() => {
    items.forEach(item => {
      item.style.transition = 'none'; 
    });

    document.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      items.forEach((item) => {
        const speed = item.getAttribute("data-speed") / 15; 
        
        const x = (centerX - mouseX) * speed / 15;
        const y = (centerY - mouseY) * speed / 15;

        item.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }, 3500);
});

// FOOD HERO========================================

const foodItems = document.querySelectorAll('.herro__food');
let currentIdx = 0;

function rotateFood() {
  const current = foodItems[currentIdx];

  current.classList.remove('play');
  current.classList.add('exit');
  
  setTimeout(() => {
    current.classList.remove('exit');
  }, 700);

  currentIdx = (currentIdx + 1) % foodItems.length;
  
  foodItems[currentIdx].classList.add('play');
}
setInterval(rotateFood, 1500);


// MODAL========================================

const form = document.querySelector('.order__form');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.modal__close');
const body = document.body;

function openModal() {
   modal.classList.add('_open');
   body.classList.add('_lock');
}

function closeModal() {
   modal.classList.remove('_open');
   body.classList.remove('_lock');
}

form.addEventListener('submit', function(e) {
   e.preventDefault();
   const phoneInput = document.getElementById('phone');
   if (phoneInput.value.length > 0) {
      openModal();
      form.reset();
   }
});
closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', function(e) {
   if (e.target === modal) {
      closeModal();
   }
});

window.addEventListener('keydown', function(e) {
   if (e.key === 'Escape') {
      closeModal();
   }
});