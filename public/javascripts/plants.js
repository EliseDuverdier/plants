var generalNode = one('section')
var selectEat = one('input[id="eat"]')
var searchInput = one('input[id="search"]');

var plantNodes = all('article')
var nodesEat = all('article.eat')
selectEat.change(function(){
    var checkbox = this;
    plantNodes.forEach(function(plant){
        var isNotToEat = plant.className.indexOf('eat') == -1
        if (checkbox.checked && isNotToEat) plant.setAttribute( 'hidden', '' )
        else plant.removeAttribute('hidden')
    })
})
searchInput.keyup(function(e){
    if (e.keyCode == 27)
        this.value = ''
    var searchInput = this;
    plantNodes.forEach(function(plant){
        matchFilter = plant.id.match(new RegExp(searchInput.value, 'i'))
        if (matchFilter) plant.removeAttribute('hidden')
        else plant.setAttribute( 'hidden', '' )
    })
})

function toggleEdition(node){
    var form = node.parentNode.parentNode.parentNode.querySelector('form')
    var isHidden = form.getAttribute('hidden')
    if (isSet(isHidden)) form.removeAttribute( 'hidden' )
    else form.setAttribute( 'hidden', '' )
    return false;
}

var editLink = all('a.edit')
for (var i = 0; i < editLink.length; i++) {
    editLink[i].addEventListener('click', handler.bind(null, i) )
}
function handler(i) { toggleEdition(editLink[i]) }
