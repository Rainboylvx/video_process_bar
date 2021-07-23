const Canvas = require("canvas")
const {save_canvas_png}= require("./utils")

module.exports = (width,height,color) =>{

  const canvas = Canvas.createCanvas(width,height)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  return save_canvas_png(canvas,"processBar.png","processBar.png be created!")
}
