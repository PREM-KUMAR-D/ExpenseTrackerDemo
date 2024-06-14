const form = document.getElementsByTagName('form')[0];
const loginButton = document.querySelector('#login');


form.addEventListener('submit',formOnSubmit);
loginButton.addEventListener('submit',loginPressed);


function formOnSubmit(event){
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    axios.post('http://localhost:4000/user/signup',{
        name:name,
        email:email,
        password:password
    })
    .then(data => console.log(data))
    .catch(err => {
        alert(err.response.data.error);
    })

}

function loginPressed(){
    window.location.href = 'login.html';
}

