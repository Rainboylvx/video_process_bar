const Commander = require("commander")

Commander.program.version('0.0.1')

const size = [1920,1080]
const Config = {
}

Commander.program
  .name('videoBar')
  .option('-s , --size <size>','bar size,default 1920x1080')
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
console.log( Commander.program.opts())
console.log('========')
console.log( 'size',size)
console.log( 'Config',Config)
