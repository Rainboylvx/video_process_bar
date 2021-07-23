const {TRANSFORMED_BAR_INFO_by_file} = require("./src/utils")
const Commander = require("commander")
const fs = require("fs")
const createBgBar = require('./src/bgBar')
const createProcessBar = require('./src/processBar')

Commander.program.version('0.0.1')

const size = [1920,100]
const time = 10     //时间长度
const Config = {
}

Commander.program
  .name('videoBar')
  .option('-s , --size <size>','bar size,default 1920x100')
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


  } )

Commander.program.parse(process.argv)

console.log( Commander.program.args )

let videoBarTextPath = Commander.program.args[0]
if( !fs.existsSync(videoBarTextPath)){
  console.log( `${videoBarTextPath} 文件不存在` )
  process.exit()
}

let transformEd_bar_info = TRANSFORMED_BAR_INFO_by_file(videoBarTextPath,...size)
//console.log(transformEd_bar_info)



console.log( Commander.program.opts())
console.log('========')
console.log( 'size',size)
console.log( 'Config',Config)

///  Do job
createBgBar(size,Config,transformEd_bar_info)
createProcessBar(...size,'#222')
