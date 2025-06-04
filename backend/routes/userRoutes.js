const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const router = express.Router();
const controller = require('../controllers/userController');

const upload = multer({ dest: 'uploads/' });

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ message: 'Token inválido ou ausente' });
  }
};

router.post('/register', upload.single('image'), controller.register);
router.post('/login', controller.login);
router.get('/card/:id', auth, controller.getCard);

module.exports = router;
