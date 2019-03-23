const moongose = require('mongoose')
const app = require('./app')
const config = require('./config')

moongose.connect(config.database, (err, res) => {
   if (err){
      console.log('error al conctar a la bd: ', err)
   }else{
      console.log('Conexion establecida ')
   app.listen(8080, () => {
      console.log('Server running on https://localhost:', config.port)
   });
   }
   
})