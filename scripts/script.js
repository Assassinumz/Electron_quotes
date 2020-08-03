const electron = require('electron')
const {ipcRenderer} = electron

$('#close').on('click', _ => {
    ipcRenderer.send('win:close')
})

$('#maximize').on('click', _ => {
    ipcRenderer.send('win:max')
})

$('#minimize').on('click', _ => {
    ipcRenderer.send('win:min')
})

$('.next').on('click', getQuote)

function getQuote() {
    ipcRenderer.send('quote:req')
}

ipcRenderer.on('quote:resp', function(e, quote, i, total) {
    let j = 0
    
    let text = quote['text']

    let author = quote['author']
    if (author === null) {
        author = "Anonymous"
    }

    let quoteField = document.getElementById('quote')
    quoteField.innerHTML = ""

    function typeWriter() {
        if (j < text.length) {
            quoteField.innerHTML += text.charAt(j)
            j++
            setTimeout(typeWriter, 35)
        }

    }
    typeWriter()
    //$("#quote").html(quote['text'])

    $("#author").html(`―${author}`)
    $("#counter").html(`${i}/${total}`)
})

$(document).ready(getQuote)
