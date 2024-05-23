const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017"; // Reemplaza con la URL de tu servidor Mongo
const dbName = "myDatabase"; // Reemplaza con el nombre de tu base de datos

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
    try {
        await client.connect();
        console.log("Conectado a la base de datos Mongo");
        return client.db(dbName);
    } catch (error) {
        console.error("Error al conectar a la base de datos Mongo", error);
        throw error;
    }
}

async function disconnect() {
    try {
        await client.close();
        console.log("Desconectado de la base de datos Mongo");
    } catch (error) {
        console.error("Error al desconectar de la base de datos Mongo", error);
        throw error;
    }
}

module.exports = { connect, disconnect };