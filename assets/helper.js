const url = 'http://localhost:3000'

function showMainPage() {
  $('#navbar').show()
  $('#login-page').hide()
  $('#register-page').hide()
  $('#list-animals').show()
  // $('#btn-logout').show()
}
function showLoginPage() {
  $('#navbar').hide()
  $('#login-page').show()
  $('#register-page').hide()
  $('#list-animals').hide()
  // $('#btn-logout').hide()
}
function showRegisterPage(){
  $('#navbar').hide()
  $('#login-page').hide()
  $('#register-page').show()
  $('#list-animals').hide()
}
function register () {
  const email =  $('#email-regis').val()
  const password =  $('#password-regis').val()
  $.ajax({
      method: 'POST',
      url: `${url}/register`,
      data: {
          email,
          password
      }
  })
    .done(response => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Register ${response.email} Success`,
      })
        console.log(response)
        showLoginPage()
    })
    .fail(xhr => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${xhr.responseJSON.message}`,
      })
        console.log(xhr)
    })

}

function login () {
  const email = $('#email-login').val()
  const password = $('#password-login').val()
  
  $.ajax({
    method: 'POST',
    url: `${url}/login`,
    data: {
      email,
      password
    }
  })
    .done(response => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Login succes'
      })
      localStorage.setItem('access_token', response.access_token)
      showMainPage()
    })
    .fail(xhr => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${xhr.responseJSON.message}`,
      })
    })
}

function logout(){ 
  localStorage.clear()
  Swal.fire({
    icon: 'success',
    text: 'Logout Success',
    showConfirmButton: false,
    timer: 1500
  })
  showLoginPage()
}

function onSignIn(googleUser) {
  var googleToken = googleUser.getAuthResponse().id_token;
  
  $.ajax({
      url: 'http://localhost:3000/googleLogin',
      method: 'POST',
      data: {
          googleToken
      }
  })
  .done(response => {
      console.log(response)
      localStorage.setItem('access_token', response.access_token)
      showMainPage()
  })
  .fail((xhr, textStatus) => {
      console.log(xhr, textStatus)
  })
}