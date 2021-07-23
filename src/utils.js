const fs = require("fs")

function save_canvas_png(canvas,path, msg){
  return new Promise( (res,rej)=>{
    const out = fs.createWriteStream(path)
    const stream = canvas.createPNGStream()
    stream.pipe(out)
    out.on('finish', () => {
      console.log(msg || 'The PNG file was created.')
      res()
    })
  })
}

function str_time_2_seconds(str_time){

      if( /^\d*$/.test(str_time) ){
        return parseInt(str_time)
      }
      else if( /^\d{1,2}:\d{1,2}$/.test(str_time)){
        let [m,s] = str_time.split(":").map( d => parseInt(d))
        return m*60+s;
      }
      else if( /^\d{1,2}:\d{1,2}:\d{1,2}$/.test(str_time) ){
        let [h,m,s] = str_time.split(":").map( d => parseInt(d))
        return h*60*60+m*60+s;
      }
      else {
        return -1
      }
}


function TRANSFORMED_BAR_INFO_by_file(path,Width,Height) {

  //["00:1:14 " , "引入"], example
  //["00:7:14 " , "如何使用"],
  //["00:10:14 " , "下载安装"],
  //["00:15:14 " , "注意事项"],
  //["00:20:14 " , "结语"],       //最后一个是结束的时间

  let Bar_info = fs.readFileSync(path,{encoding:'utf8'})
    .split('\n')
    .map( d=> d.split(",").map( d=>d.trim() ) )
    .filter(d=>d.length >1)
  //console.log( Bar_info )

  const transformEd_bar_info = []

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

  return transformEd_bar_info

}

module.exports = {
  save_canvas_png,
  TRANSFORMED_BAR_INFO_by_file,
  str_time_2_seconds
}
