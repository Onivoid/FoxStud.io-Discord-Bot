require('dotenv').config({
    path: 'config/.env'
});

const   Canvas = require('canvas'),
        snekfetch = require('snekfetch'),
        roundedPicture = require('./utils/roundedPicture');

module.exports = async (Discord, client, member) => {
    const channel = member.guild.channels.find(ch => ch.name === process.env.WELCOME_CHANNEL);
    const avatarSize = 172;
    const canvasSize = {
        height: 333,
        width: 900
    };

    const canvas = Canvas.createCanvas(canvasSize.width,canvasSize.height);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./assets/MemberCard.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
    const {body:buffer} = await snekfetch.get(member.user.displayAvatarURL);
    const avatarTransformation = await roundedPicture(buffer,avatarSize);
    const roundedAvatar = await Canvas.loadImage(avatarTransformation);
    ctx.drawImage(roundedAvatar, 363.1, 36, avatarSize, avatarSize)

    Canvas.registerFont('./assets/BebasNeue-Regular.ttf',{family: 'Bebas Neue'});
    ctx.font = '55px "Bebas Neue"';
    ctx.fillStyle = "#f5f5f5";
    ctx.textAlign = 'center';
    ctx.fillText(`Bienvenue ${await member.displayName}`, canvasSize.width/2, canvasSize.height - 50);

    const attachment = new Discord.Attachment(
        canvas.toBuffer(),
        'welcome-image.png'
    );

    channel.send(attachment);
}