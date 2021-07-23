const {TRANSFORMED_BAR_INFO_by_file,str_time_2_seconds} = require("./src/utils")
const Commander = require("commander")
const fs = require("fs")
const createBgBar = require('./src/bgBar')
const createProcessBar = require('./src/processBar')

Commander.program.version('0.0.1')

const size = [1920,100]
var time = 10     //时间长度
var pbColor = "#222"
const Config = {
}

Commander.program
  .name('videoBar')
  .option('-s , --size <size>','bar size,default 1920x100')
  .option('-t , --time <second>','time,default 10s')
  .option('--pb [pbColor]','processBar color')
  .arguments('<videoBarTextPath>')
  .description('videoBarTextPath',{
    'videoBarTextPath':'a text file with time and title'
  })
  .action( (name,options,command)=>{

    console.log( 'name',name )
    console.log( 'options',options)

    if( options.size){
      let t = options.size.split('x').map( d => parseInt(d))
      size[0] = t[0]
      size[1] = t[1]
    }

    if( options.pb) {
      pbColor = options.pb
    }

    if( options.time ){
      time = str_time_2_seconds(options.time)

      if( time == -1){
        console.error('-t,--time 参数的 后面的数据是 纯数字，或 hh:mm:ss 样式')
        process.exit(0)
      }

    }

  } )

Commander.program.parse(process.argv)

console.log( Commander.program.args )

let videoBarTextPath = Commander.program.args[0]
if( !fs.existsSync(videoBarTextPath)){
  console.log( `${videoBarTextPath} 文件不存在` )
  process.exit(0)
}

let transformEd_bar_info = TRANSFORMED_BAR_INFO_by_file(videoBarTextPath,...size)
//console.log(transformEd_bar_info)



console.log( Commander.program.opts())
console.log('========')
console.log( 'size',size)
console.log( 'Config',Config)

///  Do job
Promise.all([
  createBgBar(size,Config,transformEd_bar_info),
  createProcessBar(...size,pbColor)
]).then( ()=>{
  //console.log('====done')
  process.exit(time)
})
