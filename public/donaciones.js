document.getElementById('donar').addEventListener('click', () => {
    const nombre = document.getElementById('nombreDonador').value;
    const cantidad = document.getElementById('cantidad').value;

    // Objeto con los datos a enviar
    const data = {
        nombre: nombre,
        cantidad: cantidad
    };

    // Configuración de la solicitud Fetch
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    // URL del servidor a donde enviar la solicitud POST
    const url = '/datos';

    // Realizar la solicitud Fetch
    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al enviar los datos');
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
            // Aquí puedes realizar acciones con la respuesta del servidor
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
