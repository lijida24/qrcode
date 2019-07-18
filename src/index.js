import QRcode from './lib/QRcode'
// import QRcode from './_QRcode'
import QRErrorCorrectLevel from './lib/QRErrorCorrectLevel'

class qrcode {
  defaultOptions = {
    render: 'canvas',
    width: 256,
    height: 256,
    typeNumber: -1,
    correctLevel: QRErrorCorrectLevel.H,
    background: '#ffffff',
    foreground: '#000000'
  }
  constructor(element, options) {
    this.$element = element
    this.options = Object.assign(this.defaultOptions, typeof options === 'string' ? {text: options} : options)
    let code = null
    if (this.options.render === 'canvas') {
      try {
        code = this.createCanvas()
      } catch (error) {
        code = this.createTable()
      }
    } else {
      code = this.createTable()
    }
    this.$element.appendChild(code)
  }
  createCanvas () {
    let _QRcode	= new QRcode(this.options.typeNumber, this.options.correctLevel)
    _QRcode.addData(this.options.text)
    _QRcode.make()
    let canvas	= document.createElement('canvas')
    canvas.width	= this.options.width
    canvas.height	= this.options.height
    let ctx		= canvas.getContext('2d')
    let tileW	= this.options.width  / _QRcode.getModuleCount()
    let tileH	= this.options.height / _QRcode.getModuleCount()
    for( let row = 0; row < _QRcode.getModuleCount(); row++ ){
      for( let col = 0; col < _QRcode.getModuleCount(); col++ ){
        ctx.fillStyle = _QRcode.isDark(row, col) ? this.options.foreground : this.options.background
        let w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW))
        let h = (Math.ceil((row+1)*tileH) - Math.floor(row*tileH))
        ctx.fillRect(Math.round(col*tileW),Math.round(row*tileH), w, h) 
      }	
    }
    return canvas
  }
  createTable	() {
    let _QRcode	= new QRcode(this.options.typeNumber, this.options.correctLevel)
    _QRcode.addData(this.options.text)
    _QRcode.make()
    let $table = document.createElement('table')
    let $tbody = document.createElement('tbody')
    $table.style.width = this.options.width + 'px'
    $table.style.height = this.options.height + 'px'
    $table.style.border = 0
    $table.style.borderCollapse = 'collapse'
    $table.style.backgroundColor = this.options.background
    $table.appendChild($tbody)
    let tileW	= this.options.width / _QRcode.getModuleCount()
    let tileH	= this.options.height / _QRcode.getModuleCount()
    for(let row = 0; row < _QRcode.getModuleCount(); row++ ){
      let $tr = document.createElement('tr')
      $tr.style.height = tileH + 'px'
      for(let col = 0; col < _QRcode.getModuleCount(); col++ ){
        let $td = document.createElement('td')
        $td.width = tileW + 'px'
        $td.style.backgroundColor = _QRcode.isDark(row, col) ? this.options.foreground : this.options.background
        $tr.appendChild($td)
      }
      $tbody.appendChild($tr)
    }
    return $table
  }
}

export default qrcode