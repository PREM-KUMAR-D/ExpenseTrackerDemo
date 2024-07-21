const resetForm = document.querySelector('form');
const backendHost = 'localhost';

resetForm.addEventListener('submit', async (e)=>{
    e.preventDefault();

    try {
        const form = new FormData(e.target);
    
        const userDetails = {
            email: form.get('email')
        }
    
        const response = await axios.post(`http://${backendHost}:4000/password/forgot-password`,userDetails);
        if (response.status === 202 ){
            alert('Recovery link sent');
    
        }
        else{
            throw new Error('Something went wrong');
        }
        
    } catch (error) {
        console.log(error);
    }

} )
