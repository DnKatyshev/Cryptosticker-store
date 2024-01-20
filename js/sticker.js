// Попап
let popupButtons = document.querySelectorAll('.popup')
let popupClose = document.querySelectorAll('.popup-overlay__cross')
let popupOverlay = document.querySelector('.popup-overlay')
popupButtons.forEach((button) => {
    button.addEventListener('click', () => {
        popupOverlay.classList.add('active')
        document.body.classList.add('fixed-page')
    })
})
popupClose.forEach((clsButton) => {
    clsButton.addEventListener('click', () => {
        popupOverlay.classList.remove('active')
        document.body.classList.remove('fixed-page')
    })
})
document.addEventListener('click', (e) => {
    if (e.target == popupOverlay) {
        popupOverlay.classList.remove('active')
        document.body.classList.remove('fixed-page') // почему не работает?
    }
})


// Раскрыть скрытые Стикеры
let btnOpenHidden = document.querySelector('.auction__another-btn')
let hiddenBlock = document.querySelectorAll('.auction__another-item[data-hidden=""]')
btnOpenHidden.addEventListener('click', () => {
    hiddenBlock.forEach((element) => {
        element.classList.toggle('hidden-active')
    })
    // document.querySelector('.auction__hidden').classList.toggle('hidden-active')
})


// Слайдер-1
const swiper = new Swiper('#slider1', {
      pagination: {
          el: '.sw-pagination',
          clickable: true,
      },

      spaceBetween: 25,
      slidesPerView: 1,
  
      breakpoints: {
          768: {
                enabled: false, 
                slidesPerView: 3,
          },
          1024: {
            enabled: false,
            slidesPerView: 4,
      }
      }
  })

// Слайдер-2
const swiper2 = new Swiper('#slider2', {
      pagination: {
          el: '.sticker-pagination',
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
          },
      },
      centeredSlides: true,
      spaceBetween: 32,

      autoHeight: true,
      slidesPerView: 'auto',

      breakpoints: {
        500: {
            centeredSlides: false,
        }
    },
  })



// Валидация Полей через плагин
// *Функция конструтор + оператор её вызова new. Используются для создания однотипных объектов
// const justValidator = new JustValidate('#section-form',
// {
//     errorLabelStyle: {
//       color: '#7b4de8',
//       fontSize: '14px'
//     },
//   });

// justValidator
//         .addField('#input-1',[
//             {
//                 rule: 'required',
//                 errorMessage: 'Введите имя',
//             },
//         ])
//         .addField('#input-2',[
//             {
//                 rule: 'required',
//                 errorMessage: 'Введите e-mail',
//             },
//         ])

//------------------------------------------------------------------------------------------

// Валидация на чистом JS
function validation(form) {

    function removeError(input) {
        const parent = input.closest('.form__group');

        if (input.classList.contains('error')) {
            parent.querySelector('.error-label').remove()
            input.classList.remove('error')
        }
    }
  
    function createError(input, text) {
        const parent = input.closest('.form__group');
        const errorLabel = document.createElement('p')

        input.classList.add('error')

        errorLabel.classList.add('error-label')
        errorLabel.textContent = text
        parent.append(errorLabel)
    }

    let result = true;


    const allInputs = form.querySelectorAll('.form__input');
    allInputs.forEach(input => {
      
            removeError(input)
      
            if (input.value == "") {
                createError(input, 'Поле не заполнено!')
                result = false
            }
    })

    return result
}

document.getElementById('section-form').addEventListener('submit', function(event) {
    event.preventDefault()

    if (validation(this) == true) {
        alert('Форма проверена успешно!')
    }
})



// ========== ТАЙМЕР (до 8го марта) ==========
let days = document.getElementById('day')
let hours = document.getElementById('hour')
let minutes = document.getElementById('minute')
let seconds = document.getElementById('second')

let rightTime = new Date('03.08.2024 15:00')

function calcTime(){
    let currentTime = new Date()
    let diff = rightTime - currentTime

    let daysCalc = Math.floor(diff/1000/60/60/24)
    let hoursCalc = Math.floor((diff/1000/60/60)%24)
    let minutesCalc = Math.floor((diff/1000/60)%60)
    let secondsCalc = Math.floor((diff/1000)%60)

    days.innerText = daysCalc < 10 ? '0' + daysCalc : daysCalc
    hours.innerText = hoursCalc < 10 ? '0' + hoursCalc : hoursCalc
    minutes.innerText = minutesCalc < 10 ? '0' + minutesCalc : minutesCalc
    seconds.innerText = secondsCalc < 10 ? '0' + secondsCalc : secondsCalc
}

setInterval(calcTime, 1000)



// GSAP - анимации 
// gsap-header
let tl = gsap.timeline()
tl.from('.logo',{opacity: 0, yPercent: -100,  duration: 0.8, delay: 0.2})
   .from('.header__li', {
    opacity: 0, yPercent: -100,  duration: 0.8, stagger: 0.2})
   .from('.layout__title',{opacity: 0, xPercent: -100,  duration: 0.7}, '-=1')
  
gsap.from('.header__button-wallet', {opacity: 0, xPercent: 100,  duration: 0.8, delay: 0.2})

// gsap-author
let tl2 = gsap.timeline()
tl2
    .from('.file__text .gsap-author', {scrollTrigger: {
    trigger: '.file',
    start: '-10% center',
    end: '+=250px',
    scrub: true,
},
    xPercent: -50,
    yPercent: -50,
    opacity: 0.3,  
})

.from('.file__add-block .gsap-author', {scrollTrigger: {
    trigger: '.file',
    start: '28% center',
    end: '+=230px',
    scrub: true,
},
    xPercent: 50,
    yPercent: 50,
    opacity: 0.3,  
})

.from('.file__images', {scrollTrigger: {
    trigger: '.file',
    start: '30% center',
    end: '+=270px',
    scrub: true,
},
    xPercent: -40,
    opacity: 0.5,  
})