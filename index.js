
const Bar_info = [
  ["00:1:14 " , "引入"],
  ["00:7:14 " , "如何使用"],
  ["00:10:14 " , "下载安装"],
  ["00:15:14 " , "注意事项"],
  ["00:20:14 " , "结语"],       //最后一个是结束的时间
]



// ============== config
const Width  = 1920
const Height = 100
const Config = {
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









const transformEd_bar_info = []

function str_time_2_seconds(str_time){
  let [h,m,s] = str_time.split(":").map( d => parseInt(d))
  return h*60*60+m*60+s;
}


const Sum_time = str_time_2_seconds( Bar_info[Bar_info.length-1][0] )
var Sum_pixel_length = 0;
for( let [str_time,text] of Bar_info){

  let time  = str_time_2_seconds(str_time)
  let duration = time - ( transformEd_bar_info.length ? transformEd_bar_info[transformEd_bar_info.length-1].time : 0)
  let pixel_length = duration / Sum_time * Width

   pixel_length =  (transformEd_bar_info.length +1 == Bar_info.length) 
    ?  pixel_length = Width - Sum_pixel_length 
    : pixel_length = Math.round(pixel_length)

  Sum_pixel_length += pixel_length

  transformEd_bar_info.push({
    time,
    text,
    duration,
    pixel_length,
    end_pixel : Sum_pixel_length,
    start_pixel : transformEd_bar_info.length ? transformEd_bar_info[ transformEd_bar_info.length - 1].end_pixel + 1 : 0
  })

}



console.log(transformEd_bar_info)
console.log( Sum_pixel_length )
//process.exit()






// ============== app ==============


const Canvas = require("canvas")
const fs = require('fs')
const Path = require("path")



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
function Save_to_png(path){
  const out = fs.createWriteStream(Path.isAbsolute(path) ? path : Path.join(__dirname,path))
  const stream = canvas.createPNGStream()
  stream.pipe(out)
  out.on('finish', () =>  console.log('The PNG file was created.'))
}

Save_to_png("test.png")
