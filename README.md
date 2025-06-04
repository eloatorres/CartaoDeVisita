# Cartão de Visita Digital 📇

Projeto desenvolvido para a N2 da disciplina de Programação Mobile.

A aplicação permite que o usuário se cadastre com nome, senha e imagem, realize login e visualize seu cartão de visita digital em um layout estilizado.

---

## 🛠 Tecnologias Utilizadas

### 📱 Mobile (React Native com Expo)
- React Native
- Expo
- Axios
- AsyncStorage
- React Navigation

### 🌐 Backend (Node.js)
- Express
- SQLite3
- Multer (upload de imagem)
- JSON Web Token (JWT)
- Dotenv

---

## 📁 Estrutura do Projeto

```
N2_Mobile/
├── backend/              # Servidor Node.js (API)
│   ├── controllers/
│   ├── routes/
│   ├── uploads/          # Imagens enviadas
│   ├── db.js             # Banco SQLite
│   ├── app.js            # Inicialização do servidor
│   └── .env              # JWT_SECRET
│
├── components/           # Componentes reutilizáveis (Input, Botão)
├── screens/              # Telas do app (Login, Cadastro, Cartão)
├── services/             # API Axios
├── App.js                # Navegação entre telas
```

---

## ▶️ Como executar

### 1. Inicie o backend (Node.js)

```bash
cd backend
node app.js
```

> Isso iniciará a API em http://localhost:3000 (use `http://10.0.2.2:3000` no emulador Android)

### 2. Em outro terminal, inicie o app React Native

```bash
npx expo start
```

> Abra o app no emulador Android ou com Expo Go no celular

---

## ✅ Funcionalidades

- Cadastro com nome, senha e imagem
- Upload de imagem com Multer
- Autenticação com JWT
- Exibição de cartão de visita estilizado com nome e foto

---

## 🛑 .gitignore recomendado

```
node_modules/
backend/uploads/
.expo/
.env
```
