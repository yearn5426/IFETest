/**
 * Created by ym on 2016/5/24.
 */
function addClass(element, value){
    if (!element.className) {
       element.className = value;
    } else {
        if (element.className.indexOf(value) == -1) {
            var oldClass = element.className;
            element.className = oldClass + " " + value;
        }
    }
}
function removeClass(element, value) {
    if (!element.className) return false;
    var index = element.className.indexOf(value);
    if (index != -1) {
        var oldClass = element.className;
        var newClass = oldClass.split("");
        if (index == 0 && oldClass.length != value.length) {
            newClass.splice(index, value.length + 1);
        } else if (index != 0 && index + value.length == oldClass.length) {
            newClass.splice(index - 1, value.length + 1);
        } else {
            newClass.splice(index, value.length);
        }
        element.className = newClass.join("");
    }
}
function cancelShow() {
    var divs = document.getElementsByClassName("searchOption");
    for (var i = 0; i < divs.length; i++) {
        var children = divs[i].childNodes;
        for (var j = 0; j < children.length; j++) {
            if(children[j].tagName == "SPAN"){
                removeClass(children[j], "spanClick");
            } else if (children[j].tagName == "UL") {
                removeClass(children[j], "ulShow");
            }
        }
    }
}
function preparedSelectedDIV() {
    var divs = document.getElementsByClassName("searchOption");
    for (var i = 0; i < divs.length; i++) {
        var children = divs[i].childNodes;
        for (var j = 0; j < children.length; j++) {
            if(children[j].tagName == "SPAN"){
                children[j].onmouseover = function () {
                    addClass(this, "spanHover");
                };
                children[j].onclick = function () {
                    cancelShow();
                    removeClass(this, "spanHover");
                    addClass(this, "spanClick");
                    addClass(this.nextSibling.nextSibling, "ulShow");
                };
                children[j].onmouseout = function () {
                    removeClass(this, "spanHover");
                };
            } else if (children[j].tagName == "UL") {
                children[j].onmouseover = function () {
                    addClass(this.previousSibling.previousSibling, "spanClick");
                };
                var list = children[j].childNodes;
                for (var k = 0; k < list.length; k++) {
                    if(list[k].tagName == "LI") {
                        list[k].onmouseover = function () {
                            addClass(this, "liHover");
                        };
                        list[k].onmouseout = function () {
                            removeClass(this, "liHover");
                        };
                        list[k].onclick = function () {
                            removeClass(this, "liHover");
                            removeClass(this.parentNode, "ulShow");
                            removeClass(this.parentNode.previousSibling.previousSibling, "spanClick");
                            this.parentNode.previousSibling.previousSibling.lastChild.nodeValue = this.lastChild.nodeValue;
                        };
                    }
                }
            }
        }
        divs[i].onclick = function () {
            if(document.all){
                window.event.cancelBubble = true;
            }else{
                event.stopPropagation();
            }
        }
    }
}
document.body.onclick = cancelShow;
window.onload = preparedSelectedDIV();