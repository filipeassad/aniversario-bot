const fs = require('fs');
const path = require('path');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const birthdayService = require('../services/birthday.service');
const dateUtils = require('../utils/date.utils');

// Carrega configuração
const configPath = path.join(__dirname, '../config.json');
let config = {};
if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

// Configuração do cliente
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    },
    takeoverOnConflict: true,
    takeoverTimeoutMs: 60000
});

// Evento: QR Code
client.on('qr', (qr) => {
    console.log('Escaneie o QR Code abaixo para conectar o bot:');
    qrcode.generate(qr, { small: true });
});

// Evento: Conectado
client.on('ready', () => {
    console.log('Bot do WhatsApp está pronto!');
});

// Evento: Mensagem recebida
client.on('message', async (msg) => {
    // Apenas responde se o número for o cadastrado no config.json
    if (config.notificationNumber) {
        const authorizedId = `${config.notificationNumber}@c.us`;
        if (msg.from !== authorizedId) {
            return;
        }
    }

    const text = msg.body.toLowerCase().trim();

    if (text === '!info') {
        const helpMessage = `
🤖 *Bot de Aniversários*
📱 *Comandos:*
- *!hoje*: Ver aniversariantes de hoje
- *!proximo*: Ver próximo aniversário
- *!todos*: Listar todos cadastrados
- *!info*: Ver ajuda
        `.trim();
        msg.reply(helpMessage);
    }

    if (text === '!hoje') {
        const todaysBirthdays = birthdayService.getTodaysBirthdays();
        if (todaysBirthdays.length === 0) {
            msg.reply('Nenhum aniversariante hoje 🎈');
            return;
        }

        let reply = '🎉 *Aniversariantes de Hoje:* \n\n';
        todaysBirthdays.forEach(b => {
            reply += `- *${b.nome}* (${dateUtils.formatToDayMonth(b.data_aniversario)})\n`;
        });
        msg.reply(reply);
    }

    if (text === '!proximo') {
        const nextBirthdays = birthdayService.getNextBirthdays();
        if (nextBirthdays.length === 0) {
            msg.reply('Nenhum próximo aniversário cadastrado.');
            return;
        }

        const next = nextBirthdays[0];
        msg.reply(`🎂 *Próximo aniversário:* \n- *${next.nome}* no dia ${dateUtils.formatToDayMonth(next.data_aniversario)}`);
    }

    if (text === '!todos') {
        const allBirthdays = birthdayService.getAll();
        if (allBirthdays.length === 0) {
            msg.reply('Nenhum aniversariante cadastrado.');
            return;
        }

        let reply = '📋 *Lista de Aniversariante:* \n\n';
        allBirthdays.sort((a, b) => a.nome.localeCompare(b.nome)).forEach(b => {
            reply += `- *${b.nome}* (${dateUtils.formatToDayMonth(b.data_aniversario)})\n`;
        });
        msg.reply(reply);
    }
});

// Função para enviar notificação (usada pelo Cron)
const sendBirthdayNotification = async (targetNumber) => {
    if (!client.info) {
        console.log('Ainda não conectado ao WhatsApp para enviar notificação.');
        return;
    }

    const todaysBirthdays = birthdayService.getTodaysBirthdays();
    if (todaysBirthdays.length === 0) return;

    let notification = '🎉 *Lembrete de Aniversário:* \n\n';
    todaysBirthdays.forEach(b => {
        notification += `Hoje é aniversário de: *${b.nome}* (${dateUtils.formatToDayMonth(b.data_aniversario)})\n`;
    });

    const chatId = targetNumber.includes('@c.us') ? targetNumber : `${targetNumber}@c.us`;
    await client.sendMessage(chatId, notification);
};

module.exports = {
    client,
    sendBirthdayNotification
};
