window.onload = async () =>{
    const idCategory = getQueryParams('id');
    const category = await  loadCategory(idCategory);
    const id = document.getElementById('id');
    const name = document.getElementById('name');
    const description = document.getElementById('description');
    
    id.value = category.category_id;
    name.value = category.category_name;
    description.value = category.description

    categoriesForm.addEventListener('submit', async function(event){
        event.preventDefault();
        await updateCategory(idCategory, name.value, description.value);
    });

};

const apiUrl = "https://nodeproject-funcional.vercel.app"

function getQueryParams(param){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

async function loadCategory(id){
    try {
        const response = await fetch (`${apiUr}/getCategoriesById/${id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        });
        const categories = await response.json();
        return categories[0];

    }catch(error){
        console.error(error)
    }
};

async function updateCategory(id, name, description){
    const apiUrl = "https://nodeproject-funcional.vercel.app"
    try {
        const response = await fetch (`${apiUrl}/updateCategories/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify( {categoryName: name, categoryDescription:description})
        });
        const data =  await  response.json;
            if(response.ok){
                window.alert('Categoria Actualizada Exitosamente');
            }else{
                window.alert('Categoria No fue Actualizada ');
            }
    }catch(error){
        console.error(error);
        window.alert('Tenemos Problemas Tecnicos')
    }
};