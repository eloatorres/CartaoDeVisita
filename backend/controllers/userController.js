const jwt = require('jsonwebtoken');
const db = require('../db');

exports.register = (req, res) => {
  const { name, password } = req.body;
  const image = req.file.filename;
  db.run(`INSERT INTO users (name, password, image) VALUES (?, ?, ?)`, [name, password, image], function () {
    res.json({ id: this.lastID });
  });
};

exports.login = (req, res) => {
  const { name, password } = req.body;
  db.get(`SELECT * FROM users WHERE name = ? AND password = ?`, [name, password], (err, user) => {
    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      res.json({ token, id: user.id, name: user.name });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  });
};

exports.getCard = (req, res) => {
  const { id } = req.params;
  db.get(`SELECT name, image FROM users WHERE id = ?`, [id], (err, row) => {
    if (row) {
      res.json({
        name: row.name,
        image: `http://10.0.2.2:3000/uploads/${row.image}`
      });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  });
};
