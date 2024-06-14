const form = document.querySelector('form');
const expenseInput = document.getElementById('expense');
const descriptionInput = document.getElementById('decription');
const categorySelect = document.getElementById('select');
const listGroup = document.querySelector('.list-group');


document.addEventListener("DOMContentLoaded",()=>{

    
    axios.get('http://localhost:4000/expense/get-expenses')
    .then( expenses =>{
        // console.log(expenses.data);
        showItems(expenses.data);
    })
    .catch( err=> console.log(err));
})



form.addEventListener('submit', (event) => {
    event.preventDefault();

    const expense = expenseInput.value;
    const description = descriptionInput.value;
    const category = categorySelect.value;


    
    const expenseData = { expense, description, category };

    // localStorage.setItem(id, JSON.stringify(expenseData));

    
    axios.post('http://localhost:4000/expense/add-expense',expenseData)
    .then( id =>{
        
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
            axios.get(`http://localhost:4000/expense/delete/${id.data}`);
            listGroup.removeChild(listItem);
        });
    
        deleteButton.addEventListener('click', () => {

            axios.get(`http://localhost:4000/expense/delete/${id.data}`);
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
            axios.get(`http://localhost:4000/expense/delete/${id}`);
            listGroup.removeChild(listItem);
        });

        deleteButton.addEventListener('click', () => {
            axios.get(`http://localhost:4000/expense/delete/${id}`);
            listGroup.removeChild(listItem);
        });

  


    }

}