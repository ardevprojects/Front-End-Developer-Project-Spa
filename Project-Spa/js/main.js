// document.querySelector('.mobile-hamburger').addEventListener('click', function () {
//     document.querySelector('.open-menu-holder').classList.toggle('open');
// });



document.getElementsByClassName('mobile-hamburger')[0].addEventListener('click', function () {
    document.getElementsByClassName('open-menu-holder')[0].classList.toggle('open');
});

document.getElementsByClassName('mobile-menu-close')[0].addEventListener('click', function () {
    document.getElementsByClassName('open-menu-holder')[0].classList.toggle('open');
});