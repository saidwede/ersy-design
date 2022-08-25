$(function () {
    var searchOverlay = $('.search-overlay'),
        mainSearch = $('.home-search__main'),
        searchInput = $('#main-search'),
        searchBtn = $('.main-search__btn'),
        searchResults = $('.home-search__results'),
        searchRow = $('.search-row'),
        searchDelete = $('.search-delete'),
        mobileResults = $('.home-search__mob'),
        screenWidth = $(window).width()
    // Handling Events
    searchInput.on('focus', function () {
        showOverlay()
        if (screenWidth <= 1024) {
            focusMobSearch()
            $('html, body').animate({ scrollTop: 0 }, 360);
        } else {
            focusDesktopSearch()
        }
    })
    searchInput.on('blur', function () {
        inputBlur()
    })
    searchOverlay.on('click', function () {
        inputBlur()
    })
    searchRow.click(function () {
        var rowText = $(this).children().text()
        searchInput.val(rowText)
    })
    $(searchDelete).mousedown(function () { return false; });
    $(searchDelete).click(function () {
        $(this).parent(searchRow).remove()
    })
    // Show Desktop Search
    function focusDesktopSearch() {
        searchResults.css({ 'display': 'block' })
        setTimeout(() => {
            searchResults.addClass('is-visible')
        }, 1);
    }
    // Show Less Desktop Search
    function focusMobSearch() {
        mainSearch.addClass('is-fixed')
        mobileResults.show()
    }
    // Show Search Overlay
    function showOverlay() {
        searchOverlay.css({ 'display': 'block' })
        setTimeout(() => {
            searchOverlay.css({ 'opacity': '1' })
        }, 1);
    }
    // Hide Search Overlay
    function hideOverlay() {
        searchOverlay.css({ 'opacity': '0' })
        setTimeout(() => {
            searchOverlay.css({ 'display': 'none' })
        }, 310);
    }
    // Blur Search
    function inputBlur() {
        hideOverlay()
        mainSearch.removeClass('is-fixed')
        mobileResults.hide()
        // Hide results wrap
        searchResults.removeClass('is-visible')
        setTimeout(() => {
            searchResults.css({ 'display': 'none' })
        }, 310);
    }
})