window.onload = () =>{
    //const encodeData = window.location.hash.substring(1);
    //const data = JSON.parse(atob(encodeData));
    //console.log(data)
    loadCategories();

    const createCategories = document.getElementById('createCategories');

    createCategories.addEventListener('click', function(event){
        window.location.href = './createCategories.html'
    })
};

async function loadCategories() {
    try {
        const response = await fetch ('http://localhost:3000/categories',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        });

        const categories = await response.json();
        console.log(categories);

        const tableBody = document.getElementById('categoriesTBody')
        tableBody.innerHTML = '';

        categories.forEach(categories =>{
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = categories.category_id;
            
            const nameCell = document.createElement('td');
            nameCell.textContent = categories.category_name;

            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = categories.description

            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(descriptionCell);
            tableBody.appendChild(row)
        })
    } catch (error) {
        console.log(error);
        
    }
}