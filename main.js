/* global window, document, StatusBar */

function currentDecimalSeconds() {
    var // t = Date("now"),
        s = new Date().getSeconds(),
        m = new Date().getMinutes(),
        h = new Date().getHours();
    
    var standardSeconds = s + (60*m) + (3600 * h);
    //maximumSeconds = 3600*24;
    
    return Math.round(standardSeconds / 0.864);
}

// TEST

function currentDecimalHHMMSS() {
    var decimalSeconds = currentDecimalSeconds(),
        displaySeconds = decimalSeconds % 100,
        displayMinutes = (decimalSeconds - (decimalSeconds % 100)) / 100 % 100,
        displayHours   = (decimalSeconds - (decimalSeconds % 10000)) / 10000;

    var secondString =  ""+ displaySeconds;
    if ( displaySeconds < 10 ) { secondString = "0" + secondString; }
    var minuteString =  ""+ displayMinutes;
    if ( displayMinutes < 10 ) { minuteString = "0" + minuteString; }
    
    return displayHours + ":" + minuteString + ":" + secondString;
}

function currentDecimalTime() {
    var decimalSeconds = currentDecimalSeconds(),
        displaySeconds = decimalSeconds % 100,
        displayMinutes = (decimalSeconds - (decimalSeconds % 100)) / 100 % 100,
        displayHours = (decimalSeconds - (decimalSeconds % 10000)) / 10000;
    
    return {h: displayHours, m: displayMinutes, s: displaySeconds};
}

function circle(elem, center, radius, percentage) {
    //  d="M 300 300 a 50 50 0 1 0 0 100"
    // MoveTo x,y (Start Point)
    // arc radius radius 0
    // large or small?
    // left or right-rotating?
    // End Point (x,y)
    var startPoint = angleToCartesian(radius, center, -90);
    var endPoint = angleToCartesian(radius, center, (percentage*3.6)-90);    
    var largeOrSmallValue = (percentage >= 50) ? 1 : 0;
    
    var pathString = [
        "M",
        startPoint.x, startPoint.y,
        "A",
        radius, radius, 0,
        largeOrSmallValue, 1,
        endPoint.x, endPoint.y
    ].join(" ");
    
    elem.setAttribute("d", pathString);
    
}



function angleToCartesian(radius, center, angle) {
    var radian = (angle / 180.0 ) * Math.PI,
        retX = center.x + radius * Math.cos(radian),
        retY = center.y + radius * Math.sin(radian);
    
    return {x: retX, y: retY};
}

document.addEventListener("deviceready", function() {
    StatusBar.overlaysWebView(true);
}, false);


window.setInterval(function() {
    var center = {
        x: (window.innerWidth /2),
        y: (window.innerHeight /2)
    };
    var T = currentDecimalTime();
    var baseRadius = 0.4 * Math.min(window.innerWidth, window.innerHeight);
    
    circle(
        document.getElementById("seconds"),
        center,
        baseRadius,
        T.s//currentDecimalTime().s;
    );

    circle(
        document.getElementById("minutes"),
        center,
        baseRadius - 24,
        T.m
    );
    circle(
        document.getElementById("hours"),
        center,
        baseRadius - 48,
        T.h * 10
    );    
    document.getElementById("time").innerHTML = currentDecimalHHMMSS();

}, 200);

