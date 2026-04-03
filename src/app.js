const express = require('express');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const { client, sendBirthdayNotification } = require('./bot/whatsapp');
const birthdayRoutes = require('./routes/birthday.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração
let config = {};
const configPath = path.join(__dirname, 'config.json');
if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

// Middlwares
app.use(express.json());

// Rotas da API
app.use('/birthdays', birthdayRoutes);

// Raiz
app.get('/', (req, res) => {
    res.json({ status: 'API is running' });
});

// Agendamento Diário (9h da manhã)
cron.schedule('0 9 * * *', async () => {
    console.log('--- Executando verificação diária de aniversários ---');
    if (config.notificationNumber) {
        await sendBirthdayNotification(config.notificationNumber);
    } else {
        console.warn('notificationNumber não configurado no config.json');
    }
});

// Inicia servidor e cliente de WhatsApp
app.listen(PORT, async () => {
    console.log(`🚀 API escutando na porta ${PORT}`);
    
    // Inicia cliente do WhatsApp
    client.initialize();
});
