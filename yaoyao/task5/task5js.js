function $(id_selector) {
    return document.getElementById(id_selector.substring(1,id_selector.length));
}
var myRedcube = $("#redbox");

//注意本题的方向和上一题不同，本题只要绝对方向，不需要考虑旋转操作更新迭代方向。

function traLef(){
    var top = parseInt(myRedcube.style.top);
    var left = parseInt(myRedcube.style.left);
    if(left > 50){
        myRedcube.style.left = (left - 50)+"px";
    }
}

function traTop(){
    var top = parseInt(myRedcube.style.top);
    var left = parseInt(myRedcube.style.left);
    if(top > 50){
        myRedcube.style.top = (top - 50)+"px";
    }
}

function traRig(){
    var top = parseInt(myRedcube.style.top);
    var left = parseInt(myRedcube.style.left);
    if(left < 500){
        myRedcube.style.left = (left + 50)+"px";
    }
}

function traBot(){
    var top = parseInt(myRedcube.style.top);
    var left = parseInt(myRedcube.style.left);
    if(top < 500){
        myRedcube.style.top = (top + 50)+"px";
    }
}

function movLef(){
    myRedcube.style.transform = "rotate(-90deg)";
    traLef();
}

function movTop(){
    myRedcube.style.transform = "rotate(0deg)";
    traTop();
}

function movRig(){
    myRedcube.style.transform = "rotate(90deg)";
    traRig();
}

function movBot(){
    myRedcube.style.transform = "rotate(180deg)";
    traBot();
}

$("#tra_lef").onclick = traLef;
$("#tra_top").onclick = traTop;
$("#tra_rig").onclick = traRig;
$("#tra_bot").onclick = traBot;

$("#mov_lef").onclick = movLef;
$("#mov_top").onclick = movTop;
$("#mov_rig").onclick = movRig;
$("#mov_bot").onclick = movBot;