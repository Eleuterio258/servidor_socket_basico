const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/musica', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.connection.once('open',
  () => console.log("conectado")).
on('error', (error) => {
  console.log("conectado")
});

module.exports = mongoose;