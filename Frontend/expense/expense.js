const form = document.querySelector('form');
const expenseInput = document.getElementById('expense');
const descriptionInput = document.getElementById('decription');
const categorySelect = document.getElementById('select');
const listGroup = document.querySelector('.list-group');
const razorPayButton = document.querySelector('#rzp-button');
const premiumDiv = document.querySelector('#premium');


function addLeaderBoardButton(){
    const button = premiumDiv.querySelector('#rzp-button');
    button.style.display = 'none';
    premiumDiv.innerHTML = 'You are a premium user now';
    const leaderBoardButton = document.createElement('button');
    leaderBoardButton.className = 'btn btn-warning btn-sm me-2';
    leaderBoardButton.id = 'leaderboard-button';
    leaderBoardButton.textContent = 'Show LeaderBoard';
    premiumDiv.appendChild(leaderBoardButton);

    leaderBoardButton.addEventListener('click' , async ()=>{
        const divLeaderBoard = document.querySelector('#leaderboard');
        const ul = document.createElement('ul');
        const token = localStorage.getItem('token');

        const data = await axios.get('http://localhost:4000/premium/show-leader-board',{ headers: { "Authorization": token } });
        const p = document.createElement('p');
        const br = document.createElement('br');
        p.innerHTML = '<h1> Leader Board </h1>';
        divLeaderBoard.appendChild(br);
        divLeaderBoard.appendChild(p);
        divLeaderBoard.appendChild(br);
        for(d of data.data){
            
            ul.innerHTML += `<li>Name -${d.name} Total Expenses: -${d.total_cost} </li>`;
            

        }
        divLeaderBoard.appendChild(ul);

    })
    
    

}



document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem('token');
    const isPremium = localStorage.getItem(token);
    if(isPremium === 'premium'){
        addLeaderBoardButton();
        
    }
    form.style.display = 'block';

    axios.get('http://localhost:4000/expense/get-expenses', { headers: { "Authorization": token } })
        .then(expenses => {
            // console.log(expenses.data);
            showItems(expenses.data);
        })
        .catch(err => console.log(err));
});








razorPayButton.addEventListener('click', async (e) => {

    try {

        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/purchase/premium-membership', { headers: { "Authorization": token } });
        console.log(response);
        var options =
        {
            "key": response.data.key_id,
            "order_id": response.data.order.id,
            "handler": async function (response) {

                try {
                    await axios.post('http://localhost:4000/purchase/update-transaction-status', {
                        order_id: options.order_id,
                        payment_id: response.razorpay_payment_id,
                    }, { headers: { "Authorization": token } });
                    
                } catch (error) {
                    console.log(error);
                }
                localStorage.setItem(token,"premium");
                addLeaderBoardButton();



                alert('You are a Premium User Now !!');
            }
        }

        const rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();

        rzp1.on('payment.failed', function (response) {
            console.log(response);
            alert('Something went wrong');
        })
    }
    catch(err){
        console.log(err);
    }


});




form.addEventListener('submit', (event) => {
    event.preventDefault();

    const expense = expenseInput.value;
    const description = descriptionInput.value;
    const category = categorySelect.value;
    const token = localStorage.getItem('token');

    const expenseData = { expense, description, category };

    // localStorage.setItem(id, JSON.stringify(expenseData));


    axios.post('http://localhost:4000/expense/add-expense', expenseData, { headers: { "Authorization": token } })
        .then(id => {
            form.style.display = 'block';
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';

            const itemText = document.createElement('p');
            itemText.textContent = `${category}: ${expense} - ${description}`;

            const buttonGroup = document.createElement('div');

            const editButton = document.createElement('button');
            editButton.className = 'btn btn-warning btn-sm me-2';
            editButton.textContent = 'Edit';

            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger btn-sm';
            deleteButton.textContent = 'Delete';

            buttonGroup.appendChild(editButton);
            buttonGroup.appendChild(deleteButton);
            listItem.appendChild(itemText);
            listItem.appendChild(buttonGroup);

            listGroup.appendChild(listItem);



            editButton.addEventListener('click', () => {
                expenseInput.value = expense;
                descriptionInput.value = description;
                categorySelect.value = category;
                axios.delete(`http://localhost:4000/expense/delete/${id.data}`, { headers: { "Authorization": token } });
                listGroup.removeChild(listItem);
            });

            deleteButton.addEventListener('click', () => {

                axios.delete(`http://localhost:4000/expense/delete/${id.data}`, { headers: { "Authorization": token } });
                listGroup.removeChild(listItem);
            })


            expenseInput.value = '';
            descriptionInput.value = '';
            categorySelect.value = '';
        })
        .catch(err => console.log(err));




});


function showItems(items) {

    for (item of items) {


        const expense = item.expense;
        const description = item.description;
        const category = item.category;
        const id = item.id;

        const token = localStorage.getItem('token');

        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';

        const itemText = document.createElement('p');
        itemText.textContent = `${expense}- ${description} - ${category}`;

        const buttonGroup = document.createElement('div');

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-warning btn-sm me-2';
        editButton.textContent = 'Edit';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.textContent = 'Delete';

        buttonGroup.appendChild(editButton);
        buttonGroup.appendChild(deleteButton);
        listItem.appendChild(itemText);
        listItem.appendChild(buttonGroup);

        listGroup.appendChild(listItem);



        editButton.addEventListener('click', () => {
            expenseInput.value = expense;
            descriptionInput.value = description;
            categorySelect.value = category;
            axios.delete(`http://localhost:4000/expense/delete/${id}`, { headers: { "Authorization": token } });
            listGroup.removeChild(listItem);
        });

        deleteButton.addEventListener('click', () => {
            axios.delete(`http://localhost:4000/expense/delete/${id}`, { headers: { "Authorization": token } });
            listGroup.removeChild(listItem);
        });




    }

}