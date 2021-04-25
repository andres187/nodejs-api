const pool = require('../config/connection.js');
const config = require('../config/configJwt');
const jwt = require('jsonwebtoken');


exports.auth = (req, res) => {
  if(req.body.usuario === "asfo" && req.body.contrasena === "holamundo") {
      const payload = {
        check:  true
      };
      const token = jwt.sign(payload, config.keyJwt, {
        expiresIn: 1440
      });
      res.json({
        mensaje: 'Autenticación correcta',
        token: token
      });
  } else {
      res.json({ mensaje: "Usuario o contraseña incorrectos"})
  }
}

exports.getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
        
      response.send(results.rows);
    })
  }
  
  exports.getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  exports.createUser = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${result.insertId}`)
    })
  }
  
  exports.updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }
  
  exports.deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }