require('dotenv').config({
    path: 'config/.env'
});

/**
 * Dépendances du bot
 */
const   Discord = require('discord.js'),
        clear = require('clear'),
        client = new Discord.Client(),
        colors = require('colors');

/**
 * Environnement Variables in config/.env
 */
const   token = process.env.BOT_TOKEN,
        botStatus = process.env.BOT_STATUS

/**
 * Statistiques du Bot
 */
let serversNumber;
let serversName = [];

/**
 * Features
 */

 const eventHandler = require("./events/eventHandler");

async function getServers() {
    let serversArray = client.guilds.array();
    serversNumber = serversArray.length;
    serversName = serversArray.join().replace(',','\n\r- ');
}

client.on('ready', async function(){
    clear();

    await getServers();

    console.log(`
        \rBot Connecté avec succès ! 
        \n
        \rNom de votre bot : ${client.user.username},
        \rNombre de serveurs : ${serversNumber},
        \rListe des serveurs :
        \r- ${serversName}
        \n
    `);

    client.user.setActivity(botStatus)
    eventHandler(Discord, client);

});

client.login(token);