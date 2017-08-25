//onmousemove可以定义在document上,也可以定义在浮出层上。但是最好定义在document上，不然鼠标指针移动不是很顺畅,反应较慢。
//onmouseup函数里面解绑了onmousemove和onmouseup，不能解绑onmousedown。
//具体做法可以参见我整理的简书。

//拖拽边缘来放大缩小浮出窗口的功能比较复杂，可以参考mt001mt的代码。本文没有实现。

var scrollable = true;
function $(id_selector){
    return document.getElementById(id_selector.substring(1,id_selector.length));
}

document.addEventListener("click", function (e) {
    switch (e.target.id) {
        case "showpop":
            popoverShow(scrollable);
            break;
        case "mask":
        case "popover-confirm":
        case "popover-cancel":
            popoverHidden(scrollable);
            break;
        case "setscroll":
            if (scrollable) {
                e.target.innerHTML = "点我启用滚动";
            } else {
                e.target.innerHTML = "点我禁用滚动";
            }
            scrollable = !scrollable;
            break;
    }
});

function popoverShow(scrollable) {
    $("#mask").style.display = "block";
    $("#popover").style.display = "block";
    $("#popover").style.top = (window.innerHeight - $("#popover").offsetHeight) / 2 + "px";
    $("#popover").style.left = (window.innerWidth - $("#popover").offsetWidth) / 2 + "px";
    if (!scrollable) {
        document.addEventListener("wheel", preventScrolling);
    }
}
function popoverHidden(scrollable) {
    $("#mask").style.display = "none";
    $("#popover").style.display = "none";
    if (!scrollable){
        document.removeEventListener("wheel", preventScrolling);
    }
}

function preventScrolling(e) {
    e.preventDefault();
}

function drag() {
    $("#popover-drag").addEventListener("mousedown", mdownhandler);
    var deltaX, deltaY;
    function mdownhandler(e) {
        deltaX =  $("#popover").offsetLeft - e.clientX;
        deltaY =  $("#popover").offsetTop - e.clientY;
        document.addEventListener("mousemove", mmovehandler);
        document.addEventListener("mouseup", muphander);
    }
    function mmovehandler(e) {
        $("#popover").style.left = e.clientX + deltaX + "px";
        $("#popover").style.top = e.clientY + deltaY + "px";
    }
    function muphander(e) {
        document.removeEventListener("mousemove", mmovehandler);
        document.removeEventListener("mouseup", muphander);
    }
}

drag();