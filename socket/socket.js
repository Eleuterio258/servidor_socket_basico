const {io} =require('../index')
const day =require('../util/data')

io.on('connection', client => {

    console.log("cliente conectado",day.dayFormat);
    client.on('disconnect', () => {
        console.log("cliente desconectado",day.dayFormat);
    });

    client.on('msg',function (payload) {
        console.log("msg",payload);

    })

    io.emit('msg', {admin:'novo usuario ${day.dayFormat}'});
});


