$(document).ready(function () {
    if(localStorage.getItem('access_token')) {
        showMainPage()
    }
    else {
        showLoginPage()
    }
    $('#register-form').on('submit', function(event) {
        event.preventDefault()
        register()
    })
    $('#login-form').on('submit', function(event) {
        event.preventDefault()
        login()
    })
    $('#logout-btn').on('click', function(event) {
        event.preventDefault()
        logout()
    })
})