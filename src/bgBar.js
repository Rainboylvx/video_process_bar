const Canvas = require("canvas")
const fs = require('fs')
const Path = require("path")
const {save_canvas_png,str_time_2_seconds}= require("./utils")


module.exports = function(size,config,transformEd_bar_info){


  // ============== config
  const [Width,Height] = size
  let defaultConfig = {
    font:"WenQuanYi Zen Hei Mono",
    fontSize: 50,
    fontSize_suffix:"px",
    fontStyle:"normal bold",
    fontColor :"#fff",
    fenceColor:           "#9476AB",
    fenceBorderColor:     "#724C8F",
    fenceWidth: 5,
    fencePadTop: 5,
    fencePadBottom: 5,
    backgroundColor: "#391356"
  }

  let Config  = Object.assign(config, defaultConfig)

  const canvas = Canvas.createCanvas(Width,Height)
  const ctx = canvas.getContext('2d')

  // Draw  bar background-color

  ctx.fillStyle = Config.backgroundColor;
  ctx.fillRect(0, 0, Width, Height);

  // Draw bar fence
  for(let i = 0 ; i < transformEd_bar_info.length - 1 ;i++){
    let fenceX = transformEd_bar_info[i].end_pixel

    ctx.fillStyle = Config.fenceColor;
    let [x,y,w,h] = [
      fenceX - Math.floor( Config.fenceWidth / 2 ) ,  //x
      Math.floor(Config.fencePadTop) ,         //y
      Config.fenceWidth,  //width
      Height - Math.floor(Config.fencePadTop + Config.fencePadBottom)
    ]
    ctx.fillRect(x,y,w,h) //height

    ctx.strokeStyle = Config.fenceBorderColor
    ctx.strokeRect(x,y,w,h) //height
  }


  // DrawText

  ctx.fillStyle = Config.fontColor
  ctx.textBaseline = 'middle';
  ctx.textAlign = "center"

  for(let i = 0 ; i < transformEd_bar_info.length ;i++){
    let {start_pixel,end_pixel,pixel_length,text} =  transformEd_bar_info[i]

    ctx.font = `${Config.fontStyle} ${Config.fontSize}${Config.fontSize_suffix} ${Config.font}`
    while( ctx.measureText(text).width >= pixel_length+Config.fenceWidth/2 + 5)
      ctx.font = `${Config.fontStyle} ${Config.fontSize-3}${Config.fontSize_suffix} ${Config.font}`
    //console.log(text,font)
    ctx.fillText(text, (start_pixel+end_pixel)/2, Height/2)
  }


  // ============== Save_to_png
  return save_canvas_png(canvas,"bgBar.png","bgBar.png be created!")
}
