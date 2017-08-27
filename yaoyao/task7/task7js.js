var mytable = document.getElementById("myTable");

var dataArr = [
    [ '小明', 80,90,70,240],
    [ '小红', 90,60,90,240],
    [ '小超', 80,90,70,230]
];

function Table(mytable,data){
    this.table = mytable;
    this.data = data;
    this.setTable();
}

Table.prototype = {
    setTable: function () {
        if (this.table.hasChildNodes())
            var tbodyele = document.createElement("tbody");
        var data = this.data;
        for (var i = 0; i < data.length; i++) {
            var trow = document.createElement("tr");
            for (var j = 0; j < data[i].length; j++) {
                var tdata = document.createElement("td");
                tdata.innerHTML = data[i][j];
                trow.appendChild(tdata);
            }
            tbodyele.appendChild(trow);
        }
        // 这里是全盘覆盖tbody的,也可以只替换需要的行。
        if (document.querySelector("tbody") !== null) {
            this.table.replaceChild(tbodyele, document.querySelector("tbody"));
        }
        else {
            this.table.appendChild(tbodyele);
        }
    },
    sortmytable: function (subject, direction) {
        this.data.sort(function(a,b){
            var map = {"chinese": 1, "maths": 2, "english": 3, "total": 4};
            if(direction === "up"){
                return a[map[subject]]-b[map[subject]];//按照对应的属性值排序；
            }else if(direction === 'down'){
                return b[map[subject]]-a[map[subject]];
            }
        });
        this.setTable();
    }
}

var table = new Table(mytable, dataArr);

mytable.addEventListener('click', function(e) {
    var thArr=e.target.id.split("-");
    table.sortmytable(thArr[0], thArr[1]);
});