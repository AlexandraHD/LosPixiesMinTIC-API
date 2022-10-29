const mongoose = require ("mongoose");  // Importamos libreria ((mongoose)) 
const host = "localhost";
const port = "27017";
const db = "hr";                 // Aqui se crea el nombre de la base de datos 

exports.mongoConnect = () => {
    const mongoStringConnection = `mongodb://${host}:${port}/${db}`;                  // Creación de constante que almacenara la sentencia de conexión a base de datos 

    mongoose.connect(mongoStringConnection);                                          // Llamado de la función (connect) de la libreria ((mongoose)) 
    mongoose.Promise = global.Promise;
    const dbConnection = mongoose.connection;
    dbConnection.on("error", console.error.bind(console, "Mongodb connection error"))
    }