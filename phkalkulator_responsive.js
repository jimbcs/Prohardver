// ==UserScript==
// @name         PH! Kalkulátor Responsive 2019
// @version      1.0
// @description  A felhasználói adatlapokon kiszámolódik a következő ranghoz szükséges HSZ-ek száma, és a következő rang is.
// @author       jim bcs
// @include      /^https://(prohardver|itcafe|gamepod|logout|mobilarena)\.hu/tag/*/
// ==/UserScript==

//PH! által megadott súlyok
const szakmai_suly = 1;
const kozossegi_suly = 0.25;
const piaci_suly = 0.1;

//PH! által megadott rangok és határaik
const ranks = [
    {posts:50000, value: [{days:5478, value: 'legenda'}, {days:4383, value: 'titán'}, {days:3652, value: 'félisten'}, {days:2922, value: 'nagyúr'}, {days:2191, value: 'veterán'}, {days:1461, value: 'addikt'}, {days:1095, value: 'őstag'}, {days:730, value: 'senior tag'}, {days:365, value: 'aktív tag'}, {days:180, value: 'tag'}, {days:60, value: 'junior tag'}, {days:30, value: 'kezdő'}, {days:14, value: 'lelkes újonc'}, {days:3, value: 'újonc'},{days:0, value: 'friss újonc'}]},
    {posts:30000, value: [{days:4383, value: 'titán'}, {days:3652, value: 'félisten'}, {days:2922, value: 'nagyúr'}, {days:2191, value: 'veterán'}, {days:1461, value: 'addikt'}, {days:1095, value: 'őstag'}, {days:730, value: 'senior tag'}, {days:365, value: 'aktív tag'}, {days:180, value: 'tag'}, {days:60, value: 'junior tag'}, {days:30, value: 'kezdő'}, {days:14, value: 'lelkes újonc'}, {days:3, value: 'újonc'},{days:0, value: 'friss újonc'}]},
    {posts:20000, value: [{days:3652, value: 'félisten'}, {days:2922, value: 'nagyúr'}, {days:2191, value: 'veterán'}, {days:1461, value: 'addikt'}, {days:1095, value: 'őstag'}, {days:730, value: 'senior tag'}, {days:365, value: 'aktív tag'}, {days:180, value: 'tag'}, {days:60, value: 'junior tag'}, {days:30, value: 'kezdő'}, {days:14, value: 'lelkes újonc'}, {days:3, value: 'újonc'},{days:0, value: 'friss újonc'}]},
    {posts:12000, value: [{days:2922, value: 'nagyúr'}, {days:2191, value: 'veterán'}, {days:1461, value: 'addikt'}, {days:1095, value: 'őstag'}, {days:730, value: 'senior tag'}, {days:365, value: 'aktív tag'}, {days:180, value: 'tag'}, {days:60, value: 'junior tag'}, {days:30, value: 'kezdő'}, {days:14, value: 'lelkes újonc'}, {days:3, value: 'újonc'},{days:0, value: 'friss újonc'}]},
    {posts:7000, value: [{days:2191, value: 'veterán'}, {days:1461, value: 'addikt'}, {days:1095, value: 'őstag'}, {days:730, value: 'senior tag'}, {days:365, value: 'aktív tag'}, {days:180, value: 'tag'}, {days:60, value: 'junior tag'}, {days:30, value: 'kezdő'}, {days:14, value: 'lelkes újonc'}, {days:3, value: 'újonc'},{days:0, value: 'friss újonc'}]},
    {posts:4000, value: [{days:1461, value: 'addikt'}, {days:1095, value: 'őstag'}, {days:730, value: 'senior tag'}, {days:365, value: 'aktív tag'}, {days:180, value: 'tag'}, {days:60, value: 'junior tag'}, {days:30, value: 'kezdő'}, {days:14, value: 'lelkes újonc'}, {days:3, value: 'újonc'},{days:0, value: 'friss újonc'}]},
    {posts:2000, value: [{days:1095, value: 'őstag'}, {days:730, value: 'senior tag'}, {days:365, value: 'aktív tag'}, {days:180, value: 'tag'}, {days:60, value: 'junior tag'}, {days:30, value: 'kezdő'}, {days:14, value: 'lelkes újonc'}, {days:3, value: 'újonc'},{days:0, value: 'friss újonc'}]},
    {posts:1000, value: [{days:730, value: 'senior tag'}, {days:365, value: 'aktív tag'}, {days:180, value: 'tag'}, {days:60, value: 'junior tag'}, {days:30, value: 'kezdő'}, {days:14, value: 'lelkes újonc'}, {days:3, value: 'újonc'},{days:0, value: 'friss újonc'}]},
    {posts:500, value: [{days:365, value: 'aktív tag'}, {days:180, value: 'tag'}, {days:60, value: 'junior tag'}, {days:30, value: 'kezdő'}, {days:14, value: 'lelkes újonc'}, {days:3, value: 'újonc'},{days:0, value: 'friss újonc'}]},
    {posts:250, value: [{days:180, value: 'tag'}, {days:60, value:
                                                   'junior tag'}, {days:30, value: 'kezdő'}, {days:14, value: 'lelkes újonc'}, {days:3, value: 'újonc'},{days:0, value: 'friss újonc'}]},
    {posts:100, value: [{days:60, value: 'junior tag'}, {days:30, value: 'kezdő'}, {days:14, value: 'lelkes újonc'}, {days:3, value: 'újonc'},{days:0, value: 'friss újonc'}]},
    {posts:50, value: [{days:730, value: 'csendes tag'}, {days:30, value: 'kezdő'}, {days:14, value: 'lelkes újonc'}, {days:3, value: 'újonc'},{days:0, value: 'friss újonc'}]},
    {posts:30, value: [{days:1095, value: 'csendes tag'}, {days:30, value: 'kezdő'}, {days:14, value: 'lelkes újonc'}, {days:3, value: 'újonc'},{days:0, value: 'friss újonc'}]},
    {posts:10, value: [{days:365, value: 'csendes újonc'}, {days:1461, value: 'csendes tag'}, {days:14, value: 'lelkes újonc'}, {days:3, value: 'újonc'},{days:0, value: 'friss újonc'}]},
    {posts:1, value: [{days:2191, value: 'csendes tag'}, {days:3, value: 'újonc'}, {days:0, value: 'friss újonc'}]},
    {posts:0, value: [{days:3, value: 'újonc'}, {days:0, value: 'friss újonc'}]}
];
//A regnapokat egyszerűbb "lekérni" reguláris kifejezéssel
const pattern = /, azaz ([0-9]+) napja - /;

var sulyozott = getWeightedComment();
var result = document.body.textContent.match(pattern);
var regnapok = parseInt(result[1]);
var WCLine;

function GetNextRanks(d, p)
{
    if (p >= ranks[0].posts && d >= ranks[0].value[0].days) return null;
    var nextRanks = [];
    var prrank, crrank, currank;
    for (var ix = 0; ix < ranks.length; ix++)
    {
        crrank = ranks[ix];
        if (crrank.posts > p)
        {
            prrank = crrank;
            continue;
        }
        for (var iy = 0; iy < crrank.value.length; iy++)
        {
            var cpost, npost;
            cpost = crrank.value[iy];
            if (cpost.days > d)
            {
                npost = cpost
                continue;
            }
            else break;
        }
        //found the item
        currank = cpost.value;
        if (npost)
        {
            //add next item for the same post count
            nextRanks.push([crrank.posts, npost.days, npost.value]);
        }

        var pushrank;
        pushrank = prrank.value[0];
        for (var iz = 0; iz < prrank.value.length; iz++)
        {
            if (prrank.value[iz].days > d && prrank.value[iz].value != currank)
            {
                pushrank = prrank.value[iz];
                continue;
            }
            else break;
        }
        //add next only if relevant (eg not the same title as above)
        if (!nextRanks.length || pushrank.value != nextRanks[0][2] || pushrank.days < nextRanks[0][1]) nextRanks.push([prrank.posts, pushrank.days, pushrank.value]);

        // hack to work around csendes tagság
        if (prrank.posts == 1) prrank = ranks[ix-2];
        pushrank = prrank.value[0];
        for (iz = 0; iz < prrank.value.length; iz++)
        {
            if (prrank.value[iz].days > d && prrank.value[iz].value != currank)
            {
                pushrank = prrank.value[iz];
                continue;
            }
            else break;
        }
        //add next only if relevant (eg not the same title as above)
        if ((nextRanks.length > 0 && (pushrank.value != nextRanks[0][2] || pushrank.days < nextRanks[0][1])) &&
            (nextRanks.length > 1 && (pushrank.value != nextRanks[1][2] || pushrank.days < nextRanks[1][1])))
            nextRanks.push([prrank.posts, pushrank.days, pushrank.value]);
        break;
    }
    return nextRanks;
}


var nextRanks = GetNextRanks(regnapok, sulyozott);
var s = '<br>';
if (nextRanks)
{
    for (var iy = 0; iy < nextRanks.length; iy++)
    {
        var pr = nextRanks[iy][0] - sulyozott;
        var tr = nextRanks[iy][1] - regnapok;
        s += '<br><small>';
        s += pr > 0 ? '</small><b>' + pr + '</b><small> súlyozott hozzászólás' : '';
        s += pr > 0 && tr > 0 ? ' és ' :'';
        s += tr > 0 ? '</small><b>' + tr + '</b><small> nap': '';
        s += pr > 0 || tr > 0 ? ' hiányzik a(z) </small><b>'+ nextRanks[iy][2] + '</b><small> ranghoz.':'';
    }
}
else{
    s += '<br><b>Gratulálok, elérted a legmagasabb rangot!</b>';
}

if (WCLine){
    WCLine.innerHTML += s;
}

function getWeightedComment()
{
    var rx = /(\d*) szakmai, (\d*) közösségi, (\d*) piaci, (\d*) blog és lokál/;
    //"div.card-body > table > tbody > tr:nth-child(8) > td"
    //var as = document.getElementsByClassName("tiny");
    var allTD = document.querySelector("div.card-body > table > tbody").getElementsByTagName("TD");
    for (var i = 0; i < allTD.length; ++i)
    {
        var as = allTD[i].textContent.match(rx);
        if (!as) continue;
        WCLine = allTD[i];
        var szakmai = parseInt(as[1]);
        szakmai = isNaN(szakmai)? 0 : szakmai;
        var kozossegi = parseInt(as[2]);
        kozossegi = isNaN(kozossegi)? 0 : kozossegi;
        var piaci = parseInt(as[3]);
        piaci = isNaN(piaci)? 0 : piaci;
        return parseInt(szakmai_suly * szakmai + kozossegi_suly * kozossegi + piaci_suly * piaci);
    }
}
