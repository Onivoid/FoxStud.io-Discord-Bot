const fs = require('fs');
const readline = require("readline");
const colors = require('colors');

let envData = (token, botStatus, wlChannel) => `\
BOT_TOKEN = "${token}"
BOT_STATUS = "${botStatus}"
WELCOME_CHANNEL = "${wlChannel}"
`;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("\nBot's token : ".green, token => {
    rl.question("Bot's status (ex : Help): ".green, botStatus => {
        rl.question("Welcome channel name :".green, async wlChannel => {
            let data = envData(token, botStatus, wlChannel);
            await fs.writeFile('./config/.env', data, (err) => {
                if (err) throw err;
                rl.close();
            });
        })
    });
});

rl.on("close", function() {
    console.log("\nThe bot's config was succefully configured !\n".green);
    process.exit(0);
});