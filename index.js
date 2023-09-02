const { DisconnectReason } = require('@whiskeysockets/baileys');

const makeWASocket = require('@whiskeysockets/baileys').default;

function connectionLogic() {
  const sock = makeWASocket({
    printQRInTerminal: true,
  });
  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (update?.qr) {
      console.log(qr);
    }

    if (connection === 'close') {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !==
        DisconnectReason.loggedOut;
      if (shouldReconnect) {
        connectionLogic();
      }
    }
  });
}

connectionLogic();
