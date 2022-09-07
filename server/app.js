const express = require('express');
const app = express();
const server = require('http').createServer(app);

const DB = require('./db/DB');

const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});

const { PORT, DATABASE } = require('./configs.js');

const db = new DB(DATABASE);

io.on('connection', (socket) => {
    socket.on('getCandidateInfo', async () => {
        const condidateInfo = await db.getCondidateInfo(); //firstname, surname, patronymic, party name

        const slogans = await db.getSlogans(); //slogans

        if (condidateInfo && slogans)
            socket.emit('upgradeCandidatePage', { condidateInfo: condidateInfo, slogans: slogans });
    });

});

app.use(express.static('public'));

server.listen(PORT);

function deinitModules() {
    db.destructor();
    setTimeout(() => process.exit(), 500);
}

process.on('SIGINT', deinitModules);
