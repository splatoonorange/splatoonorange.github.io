/**
 * Created by lucidorangee / 오렝 (유튜브)
 */
 window.onload = function() {
    c=document.getElementById('canv').getContext("2d")
    c.fillStyle="#000000"
    c.font="60px monospace"
    var img = document.getElementById("52_Gal_Deco");
    c.drawImage(img, 512, 0)
    

    //Draw rectangles for subs
    for(let i = 0; i < 13; i++)
        c.fillRect(i*95+28,582,85,85)

    readTextFile("weaponinfo.json", function(text){
        var data = JSON.parse(text); //parse JSON
        console.log(data);
    });
 }

 window.addEventListener("click", function(event) {
    console.log(event.clientX);

 });

 function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

