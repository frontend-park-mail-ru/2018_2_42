function resizeUnits(event) {
    var td = document.getElementsByClassName('cell')[0];

    var units = document.getElementsByClassName('unit');
    console.log(units.array)
    Array.prototype.forEach.call(units, function (element) {
        console.log(td.clientHeight)
        element.style.transform = 'scale(calc(' + td.clientHeight + '/ 63)'
    });

    var traps = document.getElementsByClassName('animate-trap-open');
    Array.prototype.forEach.call(traps, function (element) {
        element.style.transform = 'scale(calc(' + td.clientHeight + '/ 63)'
    });
};

window.onresize = resizeUnits;
window.onload = resizeUnits;