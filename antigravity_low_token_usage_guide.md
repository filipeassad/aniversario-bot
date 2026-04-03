# 🎉 Projeto: Aniversário WhatsApp

Guia completo para criação de um bot em Node.js que envia lembretes de aniversário via WhatsApp.

---

## 🎯 Objetivo

Criar um bot que:
- Envia mensagem no dia do aniversário de contatos
- Responde comandos via WhatsApp
- Permite cadastro e edição de aniversariantes via API

---

## 🧱 Tecnologias

- Node.js
- whatsapp-web.js
- Express (para API HTTP)
- File System (fs) para persistência em JSON
- node-cron (ou similar) para agendamento

---

## 📁 Estrutura do Projeto

```
project/
├── src/
│   ├── app.js
│   ├── bot/
│   │   └── whatsapp.js
│   ├── services/
│   │   └── birthday.service.js
│   ├── controllers/
│   │   └── birthday.controller.js
│   ├── routes/
│   │   └── birthday.routes.js
│   ├── utils/
│   │   └── date.utils.js
│   └── data/
│       └── birthdays.json
├── package.json
└── README.md
```

---

## 📦 Instalação

```bash
npm init -y
npm install express whatsapp-web.js qrcode-terminal node-cron
```

---

## 🧾 Base de Dados (JSON)

Arquivo: `birthdays.json`

```json
[
  {
    "nome": "Filipe Assad",
    "data_aniversario": "30/03/1991",
    "grupo": "familia"
  }
]
```

---

## 🤖 Integração com WhatsApp

Criar um client usando `whatsapp-web.js`:

- Gerar QR Code no terminal
- Escanear com WhatsApp
- Manter sessão persistida

Responsabilidades:
- Enviar mensagens
- Escutar mensagens recebidas
- Interpretar comandos

---

## ⏰ Verificação Diária

Usar `node-cron` para rodar 1x por dia:

- Ler JSON
- Verificar aniversariantes do dia
- Enviar mensagem para seu número

Exemplo de mensagem:

```
🎉 Hoje é aniversário de: Filipe Assad (30/03)
```

---

## 💬 Comandos do Bot

O bot deve escutar mensagens recebidas e interpretar palavras-chave:

### `!hoje`
- Retorna aniversariantes do dia
- Caso não exista:
```
Nenhum aniversariante hoje
```

### `!proximo`
- Retorna o(s) próximo(s) aniversariante(s)

### `!todos`
- Lista todos os aniversariantes

### `!info`
- Retorna descrição dos comandos

Exemplo:
```
!hoje - Ver aniversariantes de hoje
!proximo - Ver próximo aniversário
!todos - Listar todos
!info - Ajuda
```

---

## 🧠 Regras de Negócio

- Comparar apenas dia e mês (ignorar ano para aniversário)
- Permitir múltiplos aniversariantes no mesmo dia
- Ordenar próximos aniversários corretamente

---

## 🌐 API HTTP

### ➕ Criar aniversariante

**POST /birthdays**

Body:
```json
{
  "nome": "João",
  "data_aniversario": "10/05/1990",
  "grupo": "amigos"
}
```

Regras:
- Nome deve ser único
- Se existir → retornar erro

---

### ✏️ Atualizar aniversariante

**PUT /birthdays/:nome**

- Buscar pelo nome exato
- Atualizar dados
- Se não existir → erro

---

## 🧩 Serviço de Aniversários

Responsável por:

- Ler JSON
- Escrever JSON
- Buscar aniversariantes do dia
- Calcular próximo aniversário
- Validar dados

---

## 🔄 Fluxo do Sistema

1. Cron roda diariamente
2. Serviço busca aniversariantes
3. Bot envia mensagem
4. Usuário pode interagir via comandos
5. API permite cadastro/edição

---

## ⚠️ Cuidados

- Evitar sobrescrever JSON incorretamente
- Usar lock ou escrita segura
- Validar entrada da API
- Tratar falhas no WhatsApp

---

## 🚀 Melhorias Futuras

- Persistência em banco (MongoDB/Postgres)
- Separar grupos de envio
- Mensagem personalizada
- Deploy em VPS
- Dockerização

---

## ✅ Checklist

- [ ] Bot conecta no WhatsApp
- [ ] JSON sendo lido corretamente
- [ ] Cron funcionando
- [ ] Comandos respondendo
- [ ] API funcionando

---

## 🎯 Resultado Esperado

Um bot automatizado que:
- Nunca deixa você esquecer aniversários
- Permite consulta rápida via WhatsApp
- Pode ser expandido facilmente

---

Se quiser, posso gerar o código base desse projeto pra você (já estruturado e pronto pra rodar).

