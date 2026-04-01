const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors()); 
app.use(bodyParser.json());

// CONFIGURAÇÃO PARA SERVIR O FRONTEND:
// Define a pasta atual como origem de ficheiros estáticos (HTML, JS, CSS)
app.use(express.static(path.join(__dirname)));

// Rota principal: entrega o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Banco de dados em memória (apenas para teste)
const users = [];


app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'Este e-mail já está cadastrado.' });
    }

    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);

    console.log(`[CADASTRO] Novo usuário: ${name} (${email})`);

    return res.status(201).json({ 
        message: 'Usuário cadastrado com sucesso!',
        user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });
});


app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    }

    console.log(`[LOGIN] Bem-vindo, ${user.name}!`);

    return res.json({
        message: 'Login realizado com sucesso!',
        user: { id: user.id, name: user.name, email: user.email }
    });
});


app.listen(PORT, () => {
    console.log(`\n========================================`);
    console.log(`Servidor Ativo em: http://localhost:${PORT}`);
    console.log(`Pressione Ctrl+C para encerrar.`);
    console.log(`========================================\n`);
});