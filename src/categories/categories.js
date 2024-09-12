window.onload = () =>{
    //const encodeData = window.location.hash.substring(1);
    //const data = JSON.parse(atob(encodeData));
    //console.log(data)

    const createCategories = document.getElementById('createCategories');

    createCategories.addEventListener('click', function(event){
        window.location.href = './createCategories.html'
    })
    loadCategories();
};
const apiUrl = "https://nodeproject-funcional.vercel.app"

async function loadCategories() {
    
    try {
        const response = await fetch (`${apiUrl}/categories`,{
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

            const actionCell = document.createElement('td');
            
            const modifyButton = document.createElement('button');
            modifyButton.textContent= 'Modificar';
            modifyButton.className ='modify_button';
            modifyButton.onclick = () => modifyCategory(categories.category_id);

            const deleteButton = document.createElement('button');
            deleteButton.className ='delete_button';
            deleteButton.onclick = () => deleteCategory(categories.category_id)
            deleteButton.textContent= 'eliminar';

            actionCell.appendChild(modifyButton);
            actionCell.appendChild(deleteButton)



            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(descriptionCell);
            row.appendChild(actionCell)

    
            tableBody.appendChild(row)
        })
    } catch (error) {
        console.error(error);
        
    }
}

async function  deleteCategory(id){
    try {
        const response = await fetch (`${apiUrl}deleteCategories/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
        });
        const data =  await  response.json;
        if(response.ok){
            window.alert('Categoria Eliminadda Exitosamente');
            location.reload();
        }else{
            window.alert('Categoria No fue Eliminada ');
        }
    } catch (error) {
        console.error(error);
        window.alert('Tenemos Problemas Tecnicos')
    }
}

async function modifyCategory (id){
    window.location.href = `updateCategories.html?id=${id}`
}

