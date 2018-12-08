import express from 'express';
import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Paulmoutier17',
  database : 'expressfilrouge'
});

connection.connect(err => {
  if(err){
    console.log('Error : ', err);
  } else {
    console.log('Connecté');
  }
});

const router = express.Router();

router.get('/', (req, res) => {
  connection.query('SELECT * FROM smallville', (err, result) => {
    if(err) {
      console.log('Erreur : ', err);
      res.sendStatus(500);
    } else {
      res.json(result);
    }
  })
});

router.get('/name', (req, res) => {
  connection.query('SELECT video', (err, result) => {
    if(err) {
      console.log('Erreur : ', err);
      res.sendStatus(500);
    } else {
      res.json(result);
    }
  })
});

router.get('/image', (req, res) => {
  connection.query('SELECT smaville ', (err, result) => {
    if(err) {
      console.log('Erreur : ', err);
      res.sendStatus(500);
    } else {
      res.json(result);
    }
  })
});

router.get('/video:note', (req, res) => {
  connection.query(`SELECT * FROM smallville WHERE note = ${req.params.note}`, (err, result) => {
    if(err) {
      console.log('Erreur : ', err);
      res.sendStatus(500);
    } else {
      res.json(result);
    }
  })
});

router.get('/find/:perso', (req, res) => {
  connection.query(`SELECT * FROM '${req.params.name}%'`, (err, result) => {
    if(err) {
      console.log('Erreur : ', err);
      res.sendStatus(500);
    } else {
      res.json(result);
    }
  })
});

router.get('/video/:date', (req, res) => {
  connection.query('SELECT * FROM fsmallville WHERE `release` > ?', req.params.date, (err, result) => {
    if(err) {
      console.log('Erreur : ', err);
      res.sendStatus(500);
    } else {
      res.json(result);
    }
  })
});

router.get('/order', (req, res) => {
  const type = req.query.type;
  const sql = (type === 'desc') ?
  'SELECT * FROM smallville ORDER BY id DESC' :
  'SELECT * FROM smallville ORDER BY id ASC';
  connection.query(sql, (err, result) => {
    if(err) {
      console.log('Erreur : ', err);
      res.sendStatus(500);
    } else {
      res.json(result);
    }
  })
});

router.post('/video', (req, res) => {
  const formData = req.body;

  connection.query('INSERT INTO smallville SET ?',formData,  (err, result) => {
    if(err) {
      console.log('Erreur : ', err);
      res.status(500).send('Erreur ');
    } else {  
      res.sendStatus(200);
    }
  })
});

router.put('/video/:id', (req, res) => {

  const formData = req.body;
  const idMovie = req.params.id;

  connection.query('UPDATE smallville SET ? WHERE id=?', [formData, idMovie], err => {

    if (err) {
      console.log(err);
      res.status(500).send("Erreur ");
    } else {
      res.sendStatus(200);
    }
  });
});

router.put('/video/perso:id', (req, res) => {
  const gameId = req.params.id;

  connection.query('UPDATE smallville SET `perso` = 1 ^ `kent` WHERE id = ?', gameId, err => {

    if (err) {
      console.log(err);
      res.status(500).send("Erreur ");
    } else {
      res.sendStatus(200);
    }
  });
});

router.delete('/video:perso', (req, res) => {

  const gameId = req.params.id;

  connection.query('DELETE FROM smallville WHERE id = ?', gameId, err => {

    if (err) {
      console.log(err);
      res.status(500).send("Erreur");
    } else {

      res.sendStatus(200);
    }
  });
});

router.delete('/video/smallville', (req, res) => {

  connection.query('DELETE FROM smallville  WHERE `kent` = 0', err => {

    if (err) {
      console.log(err);
      res.status(500).send("Erreur ");
    } else {

      res.sendStatus(200);
    }
  });
});

export default router;
