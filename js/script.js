
//.. Global vars
let cssDisplayNone = { 'display': 'none' }
let cssDisplayBlock = { 'display': 'block' }
let cssDisplayFlex = { 'display': 'flex' }
let cssDisplayInlineFlex = { 'display': 'inline-flex' }
let lockBody = bodyScrollLock.disableBodyScroll;
let unlockBody = bodyScrollLock.enableBodyScroll;

function showSignIn() {
    showModal()
    setTimeout(() => {
        $('.modal__container.sign-in').css(cssDisplayInlineFlex)
        setTimeout(() => {
            $('.modal__container.sign-in').removeClass('is-hidden')
        }, 10);
    }, 220);
}
//Modal - Sign Up
function showSignUp() {
    showModal()
    setTimeout(() => {
        $('.modal__container.sign-up').css(cssDisplayInlineFlex)
        setTimeout(() => {
            $('.modal__container.sign-up').removeClass('is-hidden')
        }, 10);
    }, 220);   
}

//Modal - Show
function showModal() {
    lockBody('.modal');
    $('.modal').css(cssDisplayBlock)
    setTimeout(() => {
        $('.modal').removeClass('is-hidden')
    }, 10);
}
function hideModal() {
    unlockBody('.modal');
    $('.modal__container').addClass('is-hidden')
    setTimeout(() => {
        $('.modal__container').css(cssDisplayNone)
    }, 260);
}
function closeMobSwitch() {
    unlockBody('.mob-rs');
    $('.mob-rs__wrap').removeClass('is-visible')
    setTimeout(() => {
        $('.mob-rs').css('opacity', '0')
    }, 200);
    setTimeout(() => {
        $('.mob-rs').css('display', 'none')
    }, 450);
}
//.. Mobile menu
$(document).ready(function () {

    let mobMenu = $('.m-menu')
    let menuList = $('.menu-list');
    let menuItems = menuList.children('div');

    //Initial states
    mobMenu.css({ 'opacity': '0' })
    menuItems.css({ 'opacity': '0', 'transform': 'translate(0px,-15px)' })

    //Show menu elements staggering
    function mShowStagger() {
        for (var i = 0; i < menuItems.length; i++) {
            var item = menuItems.eq(i);
            var delay = (i + 1) / 10;
            item.css({
                'transition-delay': delay + "s",
                'transition-duration': '.30s',
                'transition-timing-function': 'cubic-bezier(0.075, 0.82, 0.165, 1)'
            }).css({
                'opacity': '1',
                'transform': 'translate(0px,0px)'
            })
        };
    }
    //Hide menu elements staggering
    function mHideStagger() {
        for (var i = 0; i < menuItems.length; i++) {
            var item = menuItems.eq(i);
            var delay = (i + 1) / 10;
            item.css({
                'transition-delay': delay + "s",
                'transition-duration': '.30s',
                'transition-timing-function': 'cubic-bezier(0.075, 0.82, 0.165, 1)'
            }).css({
                'opacity': '0',
                'transform': 'translate(0px,-15px)'
            })
        };
    }
    //Events handling
    $('.m-ham').click(function () {
        if ($(this).hasClass('m-open')) {
            lockBody(mobMenu);
            $(this).addClass('m-close').removeClass('m-open')
            mobMenu.css('display', 'block')
            setTimeout(() => {
                mobMenu.css('opacity', '1')
                setTimeout(() => {
                    mShowStagger()
                }, 160);
            }, 10);
        } else {
            unlockBody(mobMenu);
            $(this).removeClass('m-close').addClass('m-open')
            mHideStagger()
            setTimeout(() => {
                mobMenu.css('opacity', '0')
                setTimeout(() => {
                    mobMenu.css('display', 'none')
                }, 300);
            }, 400);
        }
    })
})

//.. Modals
$(document).ready(function () {

    let modal = $('.modal')
    let modalBlock = $('.modal__container')
    let modalVerify = $('.modal__container.verify')
    let modalTerms = $('.modal__container.terms')
    let subModal = $('.modal__sub')
    let subTerms = $('.modal__sub.terms')
    let subPrivacy = $('.modal__sub.privacy')

    //Initial states
    modalBlock.addClass('is-hidden')
    modalBlock.css(cssDisplayNone)
    modal.addClass('is-hidden')
    
    //Modal - Verification
    function showVerify() {
        modalVerify.css(cssDisplayFlex)
        setTimeout(() => {
            modalVerify.removeClass('is-hidden')
        }, 10);
    }
    //Modal - Terms
    function showTerms() {
        modalTerms.css(cssDisplayBlock)
        setTimeout(() => {
            modalTerms.removeClass('is-hidden')
        }, 10);
    }
    //Modal - Terms - Terms & Conditions
    function showSubTerms() {
        subTerms.css(cssDisplayBlock)
    }
    //Modal - Terms - Privacy Policy
    function showSubPrivacy() {
        subPrivacy.css(cssDisplayBlock)
    }
    //Modal - Terms - Hide
    function hideSubModal() {
        subModal.css(cssDisplayNone)
    }

    //Modals Events handling
    //Modal - Sign In - Open
    // $('.open_sign-in').click(function () {
    //     showSignIn();
    // })
    // //Modal - Sign Up - Open
    // $('.open_sign-up').click(function () {
    //     showSignUp();
    // })
    //Modal - Terms & Conditions - Open
    $('.open_terms').click(function () {
        hideSubModal()
        showSubTerms()
        showModal()
        setTimeout(() => {
            showTerms()
        }, 220);
    })
    //Modal - Privacy Policy - Open
    $('.open_privacy').click(function () {
        hideSubModal()
        showSubPrivacy()
        showModal()
        setTimeout(() => {
            showTerms()
        }, 220);
    })
    //Modal - Switch - To Register
    $('.modal-switch.to-register').click(function () {
        hideModal()
        setTimeout(() => {
            showSignUp()
        }, 260);
    })
    //Modal - Switch - To Login
    $('.modal-switch.to-login').click(function () {
        hideModal()
        setTimeout(() => {
            showSignIn()
        }, 260);
    })
    //Modal - Switch - To Verification
    $('.to-verify').click(function () {
        hideModal()
        setTimeout(() => {
            showVerify()
        }, 260);
    })
    //Modal - Close
    $('.modal-close, .modal_overlay').click(function () {
        hideModal()
        setTimeout(() => {
            modal.addClass('is-hidden')
            setTimeout(() => {
                modal.css(cssDisplayNone)
            }, 230);
        }, 260);
    })
})

//.. Header search
$(document).ready(function () {

    let searchBody = $('.search__body')
    let searchContent = $('.search__content')

    //Events handling
    $('.header__search').click(function () {
        searchContent.css(cssDisplayBlock)
        setTimeout(() => {
            searchContent.removeClass('hidden');
            setTimeout(() => {
                searchBody.removeClass('hidden');
                document.getElementById("artistSearchInput2").focus();
            }, 60);
        }, 10);
    })
    $('.search_overlay').click(function () {
        searchBody.addClass('hidden')
        setTimeout(() => {
            searchContent.addClass('hidden')
        }, 60);
        setTimeout(() => {
            searchContent.css(cssDisplayNone)
        }, 400);
    })
})

//.. Mobile artist navigation
$(document).ready(function () {

    let mobSwitch = $('.mob__switch-category')

    function showMobSwitch() {
        lockBody('.mob-rs')
        $('.mob-rs').css('display', 'flex')
        setTimeout(() => {
            $('.mob-rs').css('opacity', '1')
        }, 20);
        setTimeout(() => {
            $('.mob-rs__wrap').addClass('is-visible')
        }, 200);
    }

    //Events handling
    mobSwitch.click(function () {
        mobSwitch.removeClass('active')
        $(this).addClass('active')
        setTimeout(() => {
            closeMobSwitch()
        }, 200);
    })
    
    $('.mob-rs__open').click(function () {
        showMobSwitch()
    })
})

//.. Navigation
$(document).ready(function () {

    //Header links switch
    $('.link_under').click(function () {
        $('.link_under').removeClass('active')
        $(this).addClass('active')
    })

    //.. Artist navigation
    let btnTab = $(".btn-tab")
    let btnTabMob = $('.mob__switch-category')
    let showVideos = $('.show-videos')
    let showAlbums = $('.show-albums')
    let showInterviews = $('.show-interviews')
    let showAudios = $('.show-audios')
    let showDisco = $('.show-disco')
    let showSimilar = $('.show-similar')
    let resultsBlock = $('.rs-content')

    //Events handling
    // $('.btn-tab, .mob__switch-category').click(function () {
    //     resultsBlock.css(cssDisplayNone)
    //     btnTab.removeClass('active')
    //     $(this).addClass('active')
    // })
    // //Show Music Videos
    // showVideos.click(function () {
    //     $('.rs-content.music-videos').css(cssDisplayBlock)
    // })
    // //Show Albums
    // showAlbums.click(function () {
    //     $('.rs-content.albums').css(cssDisplayBlock)
    // })
    // //Show Interviews
    // showInterviews.click(function () {
    //     $('.rs-content.interviews').css(cssDisplayBlock)
    // })
    // //Show Audios
    // showAudios.click(function () {
    //     $('.rs-content.audios').css(cssDisplayBlock)
    // })
    // //Show Discography
    // showDisco.click(function () {
    //     $('.rs-content.disco').css(cssDisplayBlock)
    // })
    // //Show Similar Artists
    // showSimilar.click(function () {
    //     $('.rs-content.similar').css(cssDisplayBlock)
    // })
})

// //.. Page Filters
// $(document).ready(function () {
//     let filterHeader = $('.filter-header')
//     let genreLabel = $('.genre-form label')

//     //.. Custom checkbox interactions
//     $(document).on("change", "input[type='checkbox']", function () {
//         if (this.checked) {
//             $(this).parent('label').addClass('active')
//         }
//         else {
//             $(this).parent('label').removeClass('active')
//         }
//     });

//     //.. Filter header inetractions
//     filterHeader.click(function () {
//         $(this).next('.filter-body').slideToggle(200)
//         $(this).children('.filter__dd-icon').toggleClass('rotated')
//     })

//     //.. Genres filter
//     genreLabel.hide()
//     genreLabel.slice(0, 12).show()

//     //Events handling
//     $('.btn__show-genres').click(function () {
//         if ($(this).hasClass('genre-hide')) {
//             $(this).html('Show All').removeClass('genre-hide')
//             genreLabel.slice(13, 999).hide()
//         } else {
//             $(this).html('Collapse').addClass('genre-hide')
//             genreLabel.slice(13, 999).css({
//                 'opacity': '0'
//             }).show()
//             setTimeout(() => {
//                 genreLabel.slice(13, 999).css({
//                     'opacity': '1'
//                 })
//             }, 40);
//         }
//     })
// })

//.. Logged status header interactions

function showHeaderModal(container) {
    $(container).children('.header__modal').css({ 'display': 'block' })
    setTimeout(() => {
        $(container).children('.header__modal').css({
            'opacity': '1',
            'transform': 'translateY(0px)'
        })
    }, 10);
    return false
}
function hideHeaderModal(container) {
    $(container).children('.header__modal').css({
        'opacity': '0',
        'transform': 'translateY(-18px)'
    });
    setTimeout(() => {
        $(container).children('.header__modal').css({ 'display': 'none' });
    }, 170);
    return false
}

// $(document).ready(function () {
//     let headerModal = $('.header__modal')
//     let notifShow = $('#showNotif')
//     let notifModalItem = $('.modal__notify-item')
//     var cssDisplayNone = { 'display': 'none' }
//     var cssDisplayBlock = { 'display': 'block' }

//     //Initial states
//     // headerModal.css(cssDisplayNone).css({
//     //     'opacity': '0',
//     //     'transform': 'translateY(-18px)'
//     // })

//     //Functions
    

    

//     function dimSiblings() {
//         $(this).siblings().css({ 'opacity': '.5' })
//         $(this).css({ 'opacity': '1' })
//     }
//     function dimSiblingsBack() {
//         $(this).siblings().css({ 'opacity': '1' })
//         $(this).css({ 'opacity': '1' })
//     }

//     //Handling events
//     notifShow.mouseenter(function () {
//         showHeaderModal.call(this)
//     })
//     notifShow.mouseleave(function () {
//         hideHeaderModal.call(this)
//     })

//     $('.profile-item').mouseenter(function () {
//         showHeaderModal.call(this)
//     })
//     $('.profile-item').mouseleave(function () {
//         hideHeaderModal.call(this)
//     })
// })