// ==UserScript==
// @name         PH! Kalkulátor Responsive 2019
// @version      1.0
// @description  A felhasználói adatlapokon kiszámolódik a következő ranghoz szükséges HSZ-ek száma, és a következő rang is.
// @author       jim bcs
// @include      /^https://(prohardver|itcafe|gamepod|logout|mobilarena|fototrend)\.hu/tag/*/
// ==/UserScript==

//PH! által megadott súlyok
const szakmai_suly = 1;
const kozossegi_suly = 0.25;
const piaci_suly = 0.1;

//PH! által megadott rangok és határaik
const rangok = ["újonc", "lelkes újonc", "kvázi-tag", "tag", "fanatikus tag", "senior tag", "őstag", "PH! addikt", "PH! kedvence", "PH! nagyúr", "PH! félisten", "Jómunkásember"];
const hatarok = [0, 50, 100, 200, 400, 800, 1750, 3500, 6000, 10000, 17000, 25000];
const napok = [0, 15, 30, 60, 100, 180, 270, 365, 450, 600, 850, 1100];

//A regnapokat egyszerűbb "lekérni" reguláris kifejezéssel
const pattern = /, azaz ([0-9]+) napja - /;

var sulyozott = getWeightedComment();
var result = document.body.textContent.match(pattern);
var regnapok = parseInt(result[1]);

var j;
for (j = 0; sulyozott >= hatarok[j] && j < hatarok.length; j++);

var rang_header = "<br><h1>Következő rang: " + rangok[j] + "</h1>";
var rang_p = "<p>" + (hatarok[j] - sulyozott) + " db hozzászólás kell a következő rangodhoz.</p>";
var nap_p = "<p>" + Math.max(napok[j] - regnapok, 0) + " nap kell a következő rangodhoz.</p>";

if (j == hatarok.length)
{
    rang_header = "<br>";
    rang_p = "<h1>Gratulálok, elérted a legnagyobb rangot!</h1>";
    nap_p = "";
}

var div = document.createElement("div");
div.innerHTML = rang_header;
div.innerHTML += rang_p;
div.innerHTML += nap_p;
document.querySelector("div.card-body").appendChild(div);

function getWeightedComment()
{
    var rx = /(\d*) szakmai, (\d*) közösségi, (\d*) piaci, (\d*) blog és lokál/;
    var allTD = document.querySelector("div.card-body > table > tbody").getElementsByTagName("TD");
    for (var i = 0; i < allTD.length; ++i)
    {
        var as = allTD[i].textContent.match(rx);
        if (!as) continue;
        var szakmai = parseInt(as[1]);
        szakmai = isNaN(szakmai)? 0 : szakmai;
        var kozossegi = parseInt(as[2]);
        kozossegi = isNaN(kozossegi)? 0 : kozossegi;
        var piaci = parseInt(as[3]);
        piaci = isNaN(piaci)? 0 : piaci;
        return parseInt(szakmai_suly * szakmai + kozossegi_suly * kozossegi + piaci_suly * piaci);
    }
}
