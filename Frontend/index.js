const form = document.getElementsByTagName('form')[0];

form.addEventListener('submit',formOnSubmit);


function formOnSubmit(event){
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    axios.post('http://localhost:3000/user/signup',{
        name:name,
        email:email,
        password:password
    });

}