const form = document.getElementsByTagName('form')[0];



form.addEventListener('submit',formOnSubmit);



function formOnSubmit(event){
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const token = localStorage.getItem('token');

    axios.post('http://localhost:4000/user/login',{
        
        email:email,
        password:password
    },
    {headers: {"Authorization":token} })
    .then(data => {
        console.log(data);
        
        window.location = '../expense/expense.html';

    })
    .catch(err => {
        alert(err.response.data.error);
    })

}