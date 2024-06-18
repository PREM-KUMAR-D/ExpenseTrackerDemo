const form = document.getElementsByTagName('form')[0];



form.addEventListener('submit', formOnSubmit);



document.addEventListener("DOMContentLoaded", function() {
    
    const currentPath = window.location.pathname;

    
    const navLinks = document.querySelectorAll(".main-header__item-list a");

    
    navLinks.forEach(link => {
        if (link.pathname === currentPath) {
            link.classList.add("active"); 
        } else {
            link.classList.remove("active");
        }
    });
});



async function formOnSubmit(event) {
    try {
        event.preventDefault();

        

        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const token = localStorage.getItem('token');
        const data = await axios.post('http://localhost:4000/user/login', {
            email: email,
            password: password
        }, { headers: { "Authorization": token } });

        console.log(data);

        window.location = '../expense/expense.html';

    } catch (error) {
        console.log(error);
        alert(error);
    }
}