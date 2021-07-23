const fs = require("fs")
function save_canvas_png(canvas,path){

  const out = fs.createWriteStream(path)
  const stream = canvas.createPNGStream()
  stream.pipe(out)
  out.on('finish', () =>  console.log('The PNG file was created.'))
}

module.exports = {
  save_canvas_png
}
