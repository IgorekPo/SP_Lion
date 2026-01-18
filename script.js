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
    const allFilled = Array.from(inputs).every(input => input.value.trim().length > 0);

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