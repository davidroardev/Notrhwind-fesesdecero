window.onload = (event) =>{

    const apiUrl = "https://nodeproject-funcional.vercel.app"

    const  categoriesForm = document.getElementById('categoriesForm');

    categoriesForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const categoryId = document.getElementById('id').value;
        const categoryName = document.getElementById('name').value
        const categoryDescription = document.getElementById('description').value;

        try {
            const response = await fetch (`${apiUrl}/createCategories`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify( {categoryId,categoryName,categoryDescription}),
            });
            const data =  await  response.json;
            if(response.ok){
                window.alert('Categoria Creada Exitosamente');
            }else{
                window.alert('Categoria No fue Creada ');
            }
        } catch (error) {
            console.error(error);
            window.alert('Tenemos Problemas Tecnicos')
        }
    });
}