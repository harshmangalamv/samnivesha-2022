const navButton = document.querySelector('.navButton')
const navLines = document.querySelectorAll('.navLine')
const sliders = document.querySelectorAll('.slide-in')
const navbar = document.querySelector('.navbar')
const navLinks = document.querySelectorAll('.nav-links')
const body = document.documentElement
const navSlides = document.querySelectorAll('.nav-slide')
let showMenu = false

navButton.addEventListener('click', toggleMenu)
navButton.addEventListener('mouseenter', toggleHover)
navButton.addEventListener('mouseleave', toggleHover)

document.addEventListener('scroll', toggleNavbar)



function toggleMenu() {
    if (!showMenu) {
        navButton.classList.toggle('close')
        for (let link of navLinks) {
            link.setAttribute('style', 'visibility: visible')
        }
        for (let slide of navSlides) {
            slide.setAttribute('style', 'position: unset')
        }
        setTimeout(() => {
            for (let line of navLines) {
                line.classList.toggle('close')
                line.classList.add('invert')
                for (let link of navLinks) {
                    link.classList.toggle('showLinks')
                }
            }
            showMenu = !showMenu
        }, 350)
        body.setAttribute('style', 'overflow-y: hidden')
    } else {
        navButton.classList.toggle('close')
        for (let link of navLinks) {
            link.classList.toggle('showLinks')
        }
        for (let line of navLines) {
            line.classList.toggle('close')
            line.classList.remove('invert')
        }
        setTimeout(() => {
            for (let slide of navSlides) {
                slide.setAttribute('style', 'position: absolute')
            }
            for (let link of navLinks) {
                link.setAttribute('style', 'visibility: hidden')
            }
            showMenu = !showMenu
        }, 800)
        body.setAttribute('style', 'overflow-y: scroll')
    }
    navButton.classList.toggle('invert')
    for (let slider of sliders) {
        slider.classList.toggle('show')
    }
    navButton.classList.toggle('small-screen')
}

function toggleHover() {
    for (let line of navLines) {
        line.classList.toggle('over')
    }
}

function toggleNavbar() {
    if (scrollY > 1) {
        navButton.classList.add('scrolled')
        navbar.style.opacity = 0
        navbar.style.visibility = 'hidden'
    } else {
        navButton.classList.remove('scrolled')
        navbar.style.visibility = 'visible'
        navbar.style.opacity = 1
    }
}