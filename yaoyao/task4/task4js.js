var myRedcube = document.getElementById("redbox");
var mybutton = document.getElementById("mybutton");
var cmd = document.getElementById("inputcmd");

//data structure

var cube = {
    rowId: 0,
    colId: 0,
    direction: "up"
};

// direction is one of four values: up, down, right, left
//It is a direction related to browser.

function renderDirection(){
    if(cube.direction === "up"){
        myRedcube.style.transform = "rotate(0deg)";
    }
    if(cube.direction === "right"){
        myRedcube.style.transform = "rotate(90deg)";
    }
    if(cube.direction === "down"){
        myRedcube.style.transform = "rotate(180deg)";
    }
    if(cube.direction === "left"){
        myRedcube.style.transform = "rotate(-90deg)";
    }
}

function tunRig() {
    if (cube.direction === "up") cube.direction = "right";
    else if (cube.direction === "right") cube.direction = "down";
    else if (cube.direction === "down") cube.direction = "left";
    else if (cube.direction === "left") cube.direction = "up";
    renderDirection();
}

function tunLef() {
    if (cube.direction === "up") cube.direction = "left";
    else if (cube.direction === "right") cube.direction = "up";
    else if (cube.direction === "down") cube.direction = "right";
    else if (cube.direction === "left") cube.direction = "down";
    renderDirection();
}

function tunBac() {
    if (cube.direction === "up") cube.direction = "down";
    else if (cube.direction === "right") cube.direction = "left";
    else if (cube.direction === "down") cube.direction = "up";
    else if (cube.direction === "left") cube.direction = "right";
    renderDirection();
}

function go() {
    var top = parseInt(myRedcube.style.top);
    var left = parseInt(myRedcube.style.left);

    if(cube.direction === "up"){
        if(top > 50){
            myRedcube.style.top = (top - 50)+"px";
        }
    }
    if(cube.direction === "right"){
        if(left < 500){
            myRedcube.style.left = (left + 50) + "px";
        }
    }
    if(cube.direction === "down"){
        if(top < 500){
            myRedcube.style.top = (top + 50)+"px";
        }
    }
    if(cube.direction === "left"){
        if(left > 50){
            myRedcube.style.left = (left - 50)+"px";
        }
    }
}

mybutton.addEventListener("click",function(){
    if(cmd.value.trim().toUpperCase() == "TUN RIG"){
        tunRig();
    }
    if(cmd.value.trim().toUpperCase() == "TUN LEF"){
        tunLef();
    }
    if(cmd.value.trim().toUpperCase() == "TUN BAC"){
        tunBac();
    }
    if(cmd.value.trim().toUpperCase() == "GO"){
        go();
    }
})