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
    $('#list-animals').each(function () {
        // var $this = $(this);
        $('#list-cat').on("click", "#body-modal",function (event) {
            fecthCat(event.target.currentSrc)
        });
    });
    $('#staticBackdrop').on('hidden.bs.modal', function() {
        console.log('close', '<<<<<,')
        $('#dog-modal').empty()
        $('#title-modal').empty()
    })
})