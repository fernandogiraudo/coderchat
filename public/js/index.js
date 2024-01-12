const socket = io();

let userName;

Swal.fire({
    title: 'Ingrese su nombre',
    input: 'text',
    inputValidator: (value) => {
        if(!value){
            return 'Tienes que ingresar tu nombre';
        }
    }
}).then(data => {
    userName = data.value;
    socket.emit('newUser', userName);
});

const inputData = document.getElementById('inputData');
const outputData = document.getElementById('outputData');

inputData.addEventListener('keyup', (event) => {
    if(event.key === 'Enter'){
        if(!!inputData.value.trim()){
            socket.emit('message', {user: userName, data: inputData.value});
        }
        inputData.value = '';
    }
});

socket.on('messageLogs', data => {
    let messages = '';
    data.forEach(message => {
        messages+=`${message.user} dice: ${message.data} <br />`
    });
    outputData.innerHTML = messages;
});

socket.on('newConnection', data => {
    console.log(data);
});

socket.on('notification', user => {
    Swal.fire({
        text: `${user} se conectó!`,
        toast: true,
        position: 'top-right'
    })
});