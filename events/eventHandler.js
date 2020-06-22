const guildMemberAdd = require("../command/guildMemberAdd");

module.exports = async (Discord, client) => {
    client.on('message', (msg) => {
        const command = msg.content.split(' ')[0];
    });

    client.on('guildMemberAdd', (member) => {
        guildMemberAdd(Discord, client, member);
    });
}