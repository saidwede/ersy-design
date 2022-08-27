$(function () {
    let openSignUp = $('[data-sign="signUp"]'),
        openSignIn = $('[data-sign="signIn"]'),
        modalContainer = $('.modal-sign'),
        modalSign = $('.modal__container'),
        modalSignUp = modalSign.filter('.sign-up'),
        modalSignIn = modalSign.filter('.sign-in'),
        tgCloseModal = $('[data-trigger="closeModal"]'),
        tgOpenModal = $('[data-trigger="openModal"]')


    //Initial states
    modalContainer.css({ 'display': 'none', 'opacity': '0' })
    modalSign.filter(function () {
        return $(this).length > 0
    }).each(function () {
        $(this).addClass('is-hidden').hide()
    });

    //Functions
    function closeModal() {
        bodyScrollLock.enableBodyScroll(modalContainer);
        modalSign.not('is-hidden').addClass('is-hidden')
        setTimeout(() => {
            modalContainer.css({ 'opacity': '0' })
            setTimeout(() => {
                modalContainer.css({ 'display': 'none' })
            }, 320);
        }, 400);
    }

    function openModal() {
        bodyScrollLock.disableBodyScroll(modalContainer);
        modalContainer.css({ 'display': 'block' })
        setTimeout(() => {
            modalContainer.css({ 'opacity': '1' })
        }, 20);
    }

    function showSignUp() {
        modalSign.not('is-hidden').addClass('is-hidden')
        setTimeout(() => {
            modalSignIn.hide()
            modalSignUp.show()
            setTimeout(() => {
                modalSignUp.removeClass('is-hidden')
            }, 20);
        }, 400);
    }

    function showSignIn() {
        modalSign.not('is-hidden').addClass('is-hidden')
        setTimeout(() => {
            modalSignIn.show()
            modalSignUp.hide()
            setTimeout(() => {
                modalSignIn.removeClass('is-hidden')
            }, 10);
        }, 400);
    }

    //Events handling
    openSignUp.on('click', function () {
        showSignUp()
    })
    openSignIn.on('click', function () {
        showSignIn()
    })
    tgCloseModal.on('click', function () {
        closeModal()
    })
    tgOpenModal.on('click', function () {
        openModal()
    })
})