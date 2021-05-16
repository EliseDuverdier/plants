/**
 *
 * Some utilitary fonctions,
 * shortcuts, etc.
 *
 * 2016-03 / Élise Duverdier
 * WTF Public Licence
 */

/////////////////////////////////////
//              DOM                //
/////////////////////////////////////

// selectors (class id and tag) //

/**
 * @param selector {String} tag name, class or id
 * @return {Node} first node corresponding to the selector
 */
var one = function(selector) {
    return document.querySelector(selector)
}

/**
 * @param  {}
 * @return {}
 */
var all = function(selector) {
    return document.querySelectorAll(selector)
}

// events //

/**
 * @param  {}
 * @return {}
 */
Node.prototype.on = function(eventName, funct){
    this.addEventListener(eventName, funct);
}

/**
 * @param  {}
 * @return {}
 */
Array.prototype.on = function(eventName, funct){
    for (var i = 0 ; i<this.length ; i++)
        this[i].addEventListener(eventName, funct);
}

/**
 * Shortcuts for each events
 */
Node.prototype.click =    function(funct){ this.on( "click", funct); }
Node.prototype.hover =    function(funct){ this.on( "hover", funct); }
Node.prototype.keypress = function(funct){ this.on( "keypress", funct); }
Node.prototype.keydown =  function(funct){ this.on( "keydown", funct); }
Node.prototype.keyup =    function(funct){ this.on( "keyup", funct); }
Node.prototype.dblclick = function(funct){ this.on( "dblclick", funct); }
Node.prototype.change =   function(funct){ this.on( "change", funct); }

// dom manipulation //

/**  Adds a node with content to the Object node
 * @param tag {String}   tag name (h1, div, p...)
 * @param content {String}
 * @param name {String} optional.
 * TODO @param attributes {Object} optional.  set of attributes to add to the node.
 * @return {Node} the node just created
 */
Object.prototype.add = function(tag, content, name, params){
    var node = this.appendChild( document.createElement(tag) )
    if ( isSet(content) ) {
        if (tag == 'img') {
            node.setAttribute('src', content)
            var imageName = content.match(/[/]?([^/]+)(?:\.\w+)$/) // get filename without extension
            node.setAttribute('alt', imageName? imageName[1] : '');
        } else {
            node.innerHTML  = isSet(name) ? '<span class="title">'+name+'</span> ' + content : content
        }
    }
    if ( isSet(params) ){
        for (var attr in params) {
            if (params.hasOwnProperty(attr) )
                node.setAttribute(attr, params[attr])
        }
    }
    return node;
}

/////////////////////////////////////
//            AJAX                 //
/////////////////////////////////////

/**
 * @param fileName {String}
 * @param callback {Function}
 * @action {}
 */
var get = function(fileName, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", fileName, true);
    xhttp.send(null);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4) {
            callback(this, xhttp.responseText)
        }
    };
}

/**   TODO; should be able to receive and return a response (data)
 * @param data {Object} json data to be transmitted to the file
 * @return {}
 */
var ajax = function(data) {
    var xhttp = new XMLHttpRequest();
    var updateFile = 'update.php?';
    for (var i in data)
        updateFile += i +'='+ encodeURIComponent(data[i]) +'&';
    xhttp.open("GET", updateFile, true);
    xhttp.send(null);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4) {
            console.log('done: '+xhttp.responseText);
        }
    };
}

/////////////////////////////////////
//              shortcuts          //
/////////////////////////////////////
/**   Check wether item is set (defined or not empty)
 * @param item {*}
 * @return {Boolean}
 */
var isSet = function (item) {
    return ! (item == null || item == undefined || item == '')
}
/**  Check wether item is an array
 * @param {*}
 * @return {Boolean} true if item is an array
 */
var isArray = function(item){
    return (item instanceof Array)
}
