const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let img = new Image()

let fileName = ''

const downloadButton = document.getElementById('download-btn')
const uploadFile = document.getElementById('upload-file')
const revertButton = document.getElementById('revert-btn')

document.addEventListener('click', (e) => {
    let classes = e.target.classList
    if (!classes.contains('filter-btn')) return false

    if (classes.contains('brightness-add')) Caman('#canvas', img, function() { this.brightness(5).render() })
    if (classes.contains('brightness-remove')) Caman('#canvas', img, function() { this.brightness(-5).render() })
    if (classes.contains('contrast-add')) Caman('#canvas', img, function() { this.contrast(5).render() })
    if (classes.contains('contrast-remove')) Caman('#canvas', img, function() { this.contrast(-5).render() })
    if (classes.contains('saturation-add')) Caman('#canvas', img, function() { this.saturation(5).render() })
    if (classes.contains('saturation-remove')) Caman('#canvas', img, function() { this.saturation(-5).render() })
    if (classes.contains('vibrance-add')) Caman('#canvas', img, function() { this.vibrance(5).render() })
    if (classes.contains('vibrance-remove')) Caman('#canvas', img, function() { this.vibrance(-5).render() })

    if (classes.contains('vintage-add')) Caman('#canvas', img, function() { this.vintage().render() })
    if (classes.contains('lomo-add')) Caman('#canvas', img, function() { this.lomo().render() })
    if (classes.contains('clarity-add')) Caman('#canvas', img, function() { this.clarity().render() })
    if (classes.contains('sincity-add')) Caman('#canvas', img, function() { this.sinCity().render() })
    if (classes.contains('crossprocess-add')) Caman('#canvas', img, function() { this.crossProcess().render() })
    if (classes.contains('pinhole-add')) Caman('#canvas', img, function() { this.pinhole().render() })
    if (classes.contains('hermajesty-add')) Caman('#canvas', img, function() { this.herMajesty().render() })
})

revertButton.addEventListener('click', () => {
    Caman('#canvas', img, function() { this.revert() })
})

uploadFile.addEventListener('change', (e) => {
    const file = document.getElementById('upload-file').files[0]
    const reader = new FileReader()
 
    if (file) {
        fileName = file.name
        reader.readAsDataURL(file)
    }

    reader.addEventListener('load', () => {
        img = new Image()
        img.src = reader.result
        img.onload = () => { 
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0, img.width, img.height)
            canvas.removeAttribute('data-caman-id')
        }
    }, false)
})

let downloadImage = (canvas, fileName) => {
    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/jpeg', 0.8)
    link.download = fileName
    let e = new MouseEvent('click')
    link.dispatchEvent(e)
}

downloadButton.addEventListener('click', (e) => {
    const fileExt = fileName.slice(-4)
    console.log(canvas)
    console.log(canvas.type)
    //if (fileExt !== '.jpg' || fileExt !== '.png') return false

    let newFileName = fileName.substring(0, fileName.length - 4) + '-edited.jpg'
    downloadImage(canvas, newFileName)
})

