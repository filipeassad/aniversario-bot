# 🎂 Bot de Aniversários WhatsApp

Este projeto é um bot que envia lembretes de aniversários via WhatsApp e disponibiliza uma API para gerenciar os aniversariantes.

---

## 🛠️ Como Iniciar

1.  **Configurações iniciais**:
    Certifique-se de que o arquivo `src/config.json` existe e possui o seu número configurado como `notificationNumber`.
    O número deve estar no formato internacional, sem o sinal de `+`, mas com o código do país: `55DD999999999`.

2.  **Instale as dependências** (se ainda não fez):
    ```bash
    npm install
    ```

3.  **Inicie o bot**:
    ```bash
    npm start
    ```

4.  **Escaneie o QR Code**:
    Um QR Code será exibido no terminal. Use o WhatsApp do seu celular para escanear e conectar o bot.

---

## 🤖 Comandos (via WhatsApp)

- `!hoje` - Lista aniversariantes do dia.
- `!proximo` - Mostra o próximo aniversário.
- `!todos` - Mostra a lista completa de aniversariantes.
- `!info` - Exibe os comandos disponíveis.

---

## 🌐 API HTTP (Porta 3000)

### **Listar Aniversariantes**
`GET /birthdays`

### **Adicionar Aniversariante**
`POST /birthdays`
```json
{
  "nome": "NOME_DO_ANIVERSARIANTE",
  "data_aniversario": "DD/MM/YYYY",
  "grupo": "NOME_DO_GRUPO"
}
```

### **Atualizar Aniversariante**
`PUT /birthdays/:nome`
```json
{
  "data_aniversario": "DD/MM/YYYY",
  "grupo": "NOME_DO_GRUPO"
}
```

---

## ⏰ Verificação Automática

O bot é configurado para realizar uma verificação diária às 09:00 e enviar uma notificação para o número definido no `src/config.json`.
