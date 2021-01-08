const url = 'http://localhost:3000'

function showMainPage() {
  $('#navbar').show()
  $('#login-page').hide()
  $('#register-page').hide()
  $('#list-animals').show()
  fecthCat()
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
    .always(xhr => {
      $('#email-regis').val('')
      $('#password-regis').val('')
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
    .always(xhr => {
      $('#email-login').val('')
      $('#password-login').val('')
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
  var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  showLoginPage()
}

function fecthCat(imageCat){
  $.ajax({
    method: 'get',
    url: url + '/cats',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(response => {
      console.log(response)
      response.forEach(el => {
        $('#list-cat').append(`
          <div class="col-3 mb-5 mt-3" id="body-modal">
            <img src="${el.url}" style="width: 100%; heigth: 15vw; object-fit: cover;" class="card-img-top" alt="cat.cute.png" id="cat-image">
          </div>
        `)
      })
      $('#title-modal').prepend(`
          <h5 class="modal-title" id="staticBackdropLabel">Image Cat</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  
        `)
        $('#dog-modal').prepend(`
            <img src="${imageCat}" alt="fox.png" class="w-100">
        `)
    })
    .fail(xhr => {
      console.log(xhr)
    })
} 
function fecthDog(){
  $.ajax({
    method: 'get',
    url: url + '/dogs',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(response => {
      console.log(response)
        $('#title-modal').prepend(`
          <h5 class="modal-title" id="staticBackdropLabel">Image Dog</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

        `)
        $('#dog-modal').append(`
            <img src="${response.url}" alt="fox.png" class="w-100">
        `)
    })
    .fail(xhr => {
      console.log(xhr)
    })
} 
function fecthFox(){
  $.ajax({
    method: 'get',
    url: url + '/fox',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(response => {
      console.log(response.image, " <<<< fox boss")
      $('#title-modal').prepend(`
        <h5 class="modal-title" id="staticBackdropLabel">Image Fox</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

      `)
        $('#dog-modal').append(`
          <img src="${response.image}" alt="fox.png" class="w-100">
        `)
    })
    .fail(xhr => {
      console.log(xhr)
    })
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

