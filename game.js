/**
 * Created by lucidorangee / 오렝 (유튜브)
 */

 var c=document.getElementById('canv').getContext("2d")
 var index=1;
 var data;
 readTextFile("weaponinfo.json", function(text){
    data = JSON.parse(text); //parse JSON
});

 window.onload = function() {
    c.fillStyle="#000000"
    c.font="60px monospace"
    
    //Draw rectangles for subs
    for(let i = 0; i < 13; i++)
        c.fillRect(i*95+28,582,85,85)
    
    var imgname = data.main[index++].imagename.replace(".png","");
    var img = document.getElementById(imgname);
    c.drawImage(img, 512, 0)
    
 }

 window.addEventListener("click", function(event) {
    console.log(event.clientX);

    c.clearRect(512, 0, 256, 256);
    index = Math.floor((Math.random() * data.main.length) + 1);

    var imgname = data.main[index].imagename.replace(".png","");
    var img = document.getElementById(imgname);
    c.drawImage(img, 512, 0)
    console.log(data.main[index].name);
    console.log(data.main[index].subweapon);
    console.log(data.main[index].specialweapon);
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

