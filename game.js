/**
 * Created by lucidorangee / 오렝 (유튜브)
 */
 window.onload = function() {
    c=document.getElementById('canv').getContext("2d")
    c.fillStyle="#000000"
    c.font="60px monospace"
    var img = document.getElementById("52_Gal_Deco");
    c.drawImage(img, 512, 0)

    const jsonData= require('weaponinfo.json'); 
    console.log(jsonData);

    //Draw rectangles for subs
    for(let i = 0; i < 13; i++)
        c.fillRect(i*95+28,582,85,85)
 }

 window.addEventListener("click", function(event) {
    console.log(event.clientX);

 });