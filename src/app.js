import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import viewsRouters from './routes/views.routes.js';


const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.engine('handlebars', handlebars.engine());
app.set('views', 'src/views');
app.set('view engine', 'handlebars');

app.use('/', viewsRouters);

const httpServer = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

const io = new Server(httpServer);

const messages = [];

io.on('connect', socket => {
    console.log('Nuevo cliente conectado');
    socket.on('message', data => {
        messages.push(data);
        io.emit('messageLogs', messages);
    });

    socket.on('newUser', user => {
        io.emit('newConnection', 'Un nuevo usuario se conectó');
        socket.broadcast.emit('notification', user);
    });
});

