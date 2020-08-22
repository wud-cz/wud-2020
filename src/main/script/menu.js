document.getElementById('menu-contact').addEventListener('click', function (event) {
    window.setTimeout(function() {
        document.getElementById('contact').classList.add('glow');
    }, 300)
    window.setTimeout(function() {
        document.getElementById('contact').classList.remove('glow');
    }, 1000)
})

document.getElementById('menu-contact-me').addEventListener('click', function (event) {
    window.setTimeout(function() {
        document.getElementById('contact-me-email').focus();
        document.getElementById('contact-form').classList.add('glow');
    }, 100)
    window.setTimeout(function() {
        document.getElementById('contact-form').classList.remove('glow');
    }, 1000)
})
