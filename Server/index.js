// Server.js
const express = require("express");
const app = express();
var mysql = require("mysql2");
var cors = require("cors");

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  
  password: '',
  database: 'taxidb',
  port: 3306
});

app.use(cors());


// Ruta GET /api/taxis
app.get('/api/taxis', (req, res) => {
  // Realizar la consulta a la base de datos para obtener los datos de los taxis
  connection.query('SELECT * FROM Taxis', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los datos de los taxis' });
    } else {
      res.json(results);
    }
  });
});

app.use(express.json());

// Ruta para agregar un nuevo taxi
// Ruta para agregar un nuevo taxi
app.post('/api/hola', (req, res) => {
  const { Modelo } = req.body;
  // Realizar la inserción del nuevo taxi en la base de datos
  connection.query('INSERT INTO Taxis(Modelo) VALUE (?)', [Modelo], (error, results) => {
    if (error) {
      console.error('Error al agregar el nuevo taxi: ', error);
      res.status(500).json({ error: 'Error al agregar el nuevo taxi' });
    } else {
      const newTaxi = {
        ID_Taxi: results.insertId,
        Modelo: Modelo,
      };
      res.json({ message: 'Nuevo taxi agregado correctamente', taxi: newTaxi });
    }
  });
});


// Consulta para obtener la lista de conductores
app.get('/api/conductores', (req, res) => {
  const query = 'SELECT * FROM conductores';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener la lista de conductores:', err);
      res.status(500).send('Error al obtener la lista de conductores');
      return;
    }

    res.send(results);
  });
});

// Consulta para asignar un nuevo taxi a un conductor
app.put('/api/conductores/:id', (req, res) => {
  const { id } = req.params;
  const { ID_Taxi } = req.body;
  const query = 'UPDATE conductores SET ID_Taxi = ? WHERE ID_Conductor = ?';
  const values = [ID_Taxi, id];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error al asignar el conductor:', err);
      res.status(500).send('Error al asignar el conductor');
      return;
    }

    res.sendStatus(200);
  });
});

// Consulta para obtener la lista de viajes
app.get('/api/viajes', (req, res) => {
  const query = 'SELECT * FROM viajes';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener la lista de viajes:', err);
      res.status(500).send('Error al obtener la lista de viajes');
      return;
    }

    res.send(results);
  });
});

// Consulta para agregar un nuevo viaje
app.post('/api/viajes', (req, res) => {
  const { Origen, Destino, ID_Conductor, ID_Pasajero } = req.body;
  const query = 'INSERT INTO viajes (Origen, Destino, ID_Conductor, ID_Pasajero) VALUES (?, ?, ?, ?)';
  const values = [Origen, Destino, ID_Conductor, ID_Pasajero];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error al agregar el nuevo viaje:', err);
      res.status(500).send('Error al agregar el nuevo viaje');
      return;
    }

    res.sendStatus(200);
  });
});

// Consulta para obtener la lista de pasajeros
app.get('/api/pasajeros', (req, res) => {
  const query = 'SELECT * FROM pasajeros';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener la lista de pasajeros:', err);
      res.status(500).send('Error al obtener la lista de pasajeros');
      return;
    }

    res.send(results);
  });
});



var server = app.listen(3001, function () {
  console.log('Server is running..');
});
