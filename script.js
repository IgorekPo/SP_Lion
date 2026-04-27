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

const regionInput = document.querySelector('#region');
const regionList = document.querySelector('#region-list');
const regionItems = document.querySelectorAll('.custom-list li');
const phoneInput = document.querySelector('#phone');
const submitBtn = document.querySelector('.order__submit');

const tgOrderForm = document.querySelector('.order__form');
const tgModalWindow = document.querySelector('#modal');
const tgModalCloseBtn = document.querySelector('.modal__close');


const TG_TOKEN = '8741707898:AAHBno3raByvvdTGxt6sWZUSUG1T0Y1h9dY'; 
const TG_CHAT_ID = '-5254152843'; 

phoneInput.addEventListener('focus', () => {
    if (phoneInput.value.length === 0) {
        phoneInput.value = '+380';
    }
});

phoneInput.addEventListener('input', () => {
    let value = phoneInput.value;
    if (!value.startsWith('+380')) {
        value = '+380';
    }
    const prefix = '+380';
    const body = value.substring(4).replace(/\D/g, ''); 
    phoneInput.value = prefix + body;
    checkInputs();
});

regionInput.addEventListener('input', () => {
    regionInput.value = regionInput.value.replace(/[^a-zA-Zа-яА-ЯёЁїЇіІєЄґҐ\s]/g, '');
    const filter = regionInput.value.toLowerCase();
    let visibleCount = 0;

    regionList.style.display = 'block';

    regionItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(filter)) {
            item.style.display = "block";
            visibleCount++;
        } else {
            item.style.display = "none";
        }
    });

    if (visibleCount === 0) regionList.style.display = 'none';
    checkInputs(); 
});

regionItems.forEach(item => {
    item.addEventListener('click', () => {
        regionInput.value = item.textContent;
        regionList.style.display = 'none';
        regionItems.forEach(li => li.style.display = "block");
        checkInputs();
    });
});

function checkInputs() {
    const isRegionValid = regionInput.value.trim().length >= 7;
    const isPhoneValid = phoneInput.value.length === 13;

    if (isRegionValid && isPhoneValid) {
        submitBtn.classList.add('active');
        submitBtn.disabled = false;
    } else {
        submitBtn.classList.remove('active');
        submitBtn.disabled = true;
    }
}

// --- ВІДПРАВКА В TELEGRAM ---
   tgOrderForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const selectedRegion = regionInput.value;
    const userPhone = phoneInput.value;
    const messageText = `<b>🔔 Нове замовлення!</b>\n` +
                        `<b>🌍 Область:</b> ${selectedRegion}\n` +
                        `<b>📞 Телефон:</b> ${userPhone}`;

    try {
        const botToken = "8741707898:AAHBno3raByvvdTGxt6sWZUSUG1T0Y1h9dY";
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                chat_id: TG_CHAT_ID,
                text: messageText,
                parse_mode: 'HTML'
            })
        });

        if (response.ok) {
            tgModalWindow.style.display = 'flex'; 
            tgOrderForm.reset();                   
            
            if (typeof checkInputs === 'function') {
                checkInputs(); 
            }
        } else {
            const errorData = await response.json();
            console.error('Telegram API Error:', errorData);
            alert('Помилка відправки. Перевірте API токен або Chat ID.');
        }
    } catch (error) {
        console.error('Помилка мережі:', error);
        alert('Немає зв’язку з сервером Telegram.');
    }
});

document.addEventListener('click', (e) => {
    // Закриваємо випадаючий список
    if (!e.target.closest('.custom-select')) {
        regionList.style.display = 'none';
    }
    if (e.target === tgModalWindow || e.target === tgModalCloseBtn) {
        tgModalWindow.style.display = 'none';
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
// APPLICATION========================================

document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll('.application__slider');

  const startSliders = () => {
    if (window.innerWidth <= 425) {
      sliders.forEach(slider => {
        const images = slider.querySelectorAll('.application__image');
        if (images.length < 2) return;
        const delay = parseInt(slider.getAttribute('data-delay')) || 4000;

        let currentIndex = 0;
        images[0].classList.add('slider');

        setInterval(() => {
          images[currentIndex].classList.remove('slider');
          currentIndex = (currentIndex + 1) % images.length;
          images[currentIndex].classList.add('slider');
        }, delay); 
      });
    }
  };

  startSliders();
});