const Canvas = require("canvas")
const fs     = require('fs')
const Path   = require("path")



module.exports = (width,height,color) =>{

  const canvas = Canvas.createCanvas(width,height)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
}
