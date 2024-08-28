window.onload = () =>{
    const loginForm =document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    loginForm.addEventListener('submit', async function(event){

        event.preventDefault(); // Prevenir que se envie el formulario de forma tradicional

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/api/login',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({username, password}),
            });

            const data = await response.json();
            console.log(data);

            if(response.ok){
                loginMessage.textContent = 'Login Exitoso';
                loginMessage.style.color= 'green';
            }else{
                loginMessage.textContent = data.message || 'Error en el login';
                loginMessage.style.color= 'red';
            }
        } catch (error) {
            console.log(error)
            loginMessage.textContent = 'Hubo un error en la peticion. Error en el login';
            loginMessage.style.color= 'red';
        }

    })
};