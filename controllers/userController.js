const config = require('../config/configJwt');
const jwt = require('jsonwebtoken');
const db = require('../config/db-sequelize.js');
const User = db.users;
const op = db.Sequelize.Op;

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
    User.findAll()
      .then(data => {
        response.send(data);
      })
      .catch(err => {
        response.status(500).send({
          message:
            err.message || "Ocurrió un error"
        })
      })
  }

exports.createUser = (req, res) => {
  if (!req.body.name || !req.body.email){
    res.status(400).send({
      message: "El contenido no puede estar vacío"
    });
    return;
  }

  const user = {
    name: req.body.name,
    email: req.body.email
  };

  User.create(user)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error"
      })
    })
}

exports.getUserById = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
}

exports.updateUser = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
}
  
exports.deleteUser = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with id=" + id
      });
    });
}