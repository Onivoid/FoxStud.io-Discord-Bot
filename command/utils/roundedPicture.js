const   Canvas = require('canvas');

module.exports = async (picture, size) => {

    const canvas = Canvas.createCanvas(size,size);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage(picture);
    ctx.save();
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2, 0, 2 * Math.PI, true);
    ctx.clip()
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const image = canvas.toBuffer();
    return image;

}