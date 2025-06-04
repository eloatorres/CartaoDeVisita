const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const routes = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', routes);

const db = require('./db'); // certifique-se de importar o banco

// ROTA DE DEBUG (provisória)
app.get('/debug-users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});


app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
