// ==UserScript==
// @name         Ármester Responsive 2019
// @version      1.0
// @description  Ármester Responsive 2019
// @author       jim bcs
// @include      *prohardver.hu/tema*
// @include      *mobilarena.hu/tema*
// @include      *gamepod.hu/tema*
// @include      *logout.hu/tema*
// @include      *itcafe.hu/tema*
// @include      *fototrend.hu/tema*
// @include      https://(prohardver|mobilarena|gamepod|logout|itcafe)\.hu/muvelet/(hsz|privat)/(uj|modosit)\.php.
// @include      https://(prohardver|mobilarena|gamepod|logout|itcafe)\.hu/muvelet/(tag|karbantart)/(tag|megjegyzes)\.php.
// @updateURL    https://raw.githubusercontent.com/jimbcs/Prohardver/master/armester_responsive.js
// @grant        none
// @require      https://raw.githubusercontent.com/jimbcs/Prohardver/master/armester_responsive_update.js

// ==/UserScript==
(function() {
    'use strict';

    var tgDiv = ph_is_site_responsive(window.location.hostname) ? "thread-users-list" : "thrusers";

    var thrUsers = document.getElementById("right").getElementsByClassName(tgDiv)[0];
    var thrList = thrUsers.getElementsByTagName("ul")[0];
    var num = thrList.children.length - 1;

    while (thrList.firstChild) {
        thrList.removeChild(thrList.firstChild);
    }

// Your code here...
function createFormattingButton(title, prefix, suffix) {
    var button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('value', title);
    button.onclick = function() {
        rtif_InsertCode(this, prefix, suffix);
    };
    return button;
}

function createFormattingButtonWithQuery(title, format, query, placeholder) {
    var button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('value', title);
    button.onclick = function() {
        var url = prompt(query, placeholder);

        if (!url) {
            return;
        }

        var re = /(\d+)-(\d+)/g
        var linkTitle = '[link]'
        var match = url.match(re)
        if (match) {
            linkTitle = '[#' + match + ']'
        }

        rtif_InsertCode(this, format.replace('%URL%', url).replace('%TITLE%', linkTitle));
    };

    return button;
}

var panel = document.querySelector('.buttons:nth-child(4)');

if (panel) {

    panel.appendChild(createFormattingButton('* Mancs', '<p><img src="https://prohardver.hu/dl/upc/2016-03/292543_dog_footprint-24.png" alt="" /></p>'));
    panel.appendChild(createFormattingButton('* Szóköz', '<p><img src="https://prohardver.hu/dl/upc/2018-07/292543_194655_gray_line_3.jpg" alt="" /></p>'));
	panel.appendChild(createFormattingButton('* Pecsét', '<p><img src="https://prohardver.hu/dl/upc/2018-04/292543_245114_jimbcs_pecset_75x75_2.png" alt="" /></p>'));
    panel.appendChild(createFormattingButton('* Nevezd meg', '<p><img src="https://prohardver.hu/dl/upc/2016-03/292543_dog_footprint-24.png" alt="" /> <b><i><a href="https://prohardver.hu/tema/re_ndruu_segits_kereshetove_tenni_a_ph-s_arckepek/hsz_1-50.html" target="_blank" rel="noopener">Nevezd meg az új arcképedet. Köszönjük!</a></i></b></p>'));
    panel.appendChild(createFormattingButton('* Egyéni arc beáll', '<p><b><i>Egyéni arcképe beállításra került. – jim bcs – 2019.xx.xx.</i></b></p>'));
    panel.appendChild(createFormattingButton('! Klón !', '<p>Üdv! <b>A Prohardver lapcsalád oldalain egy Felhasználó <i>(az Üzemeltető előzetes írásbeli engedélye nélkül)</i> egy Felhasználói Fiókkal rendelkezhet, melyet más részére nem engedhet át!</b> Egyezést találtunk xxxxxx fiókkal. Ezért érdeklődnék, melyik fiókot szeretnéd megtartani?</p>'));
    panel.appendChild(createFormattingButton('[Pontosítás!]', ' <p><a href="http://#" target="_blank" rel="noopener"><b>Pontos típus, model? Privátba kérem!</b></a></p>'));
    panel.appendChild(createFormattingButton('[Árazhatatlan!]', '[L:http://#][B]Árazhatatlan! Összefoglaló szerint! Ne írj új hsz.-t, a pontos adatokat privátba kérem a módosításhoz![/B][/L]'));
    panel.appendChild(createFormattingButton('[Összefoglaló!]', '<p><a href="http://#" target="_blank" rel="noopener"><b>Légy oly kedves és az összefoglalót olvasd el, benne van amit nem szeretnénk látni a felvezetéskor és az is ahogyan szeretnénk!</b></a></p>'));
    panel.appendChild(createFormattingButtonWithQuery('[Beárazás vége]', '<p class="tac"><b><i>Az alábbi linken található beárazások elkészültek:</i></b></p>
<p class="tac"><b><i><code><tt><a href="Add meg a hosszászólás linkjét URL." target="_blank" rel="noopener">[#68990-69223]</a></tt></code></i></b></p>
<p class="tac"><small>Az árak a hozzászólásaitokba vannak szerkesztve.</small></p>
<p></p>
<p class="tac"><img src="https://prohardver.hu/dl/upc/2018-02/292543_jim_bcs_2.png" alt="" /></p>'));
    panel.appendChild(createFormattingButton('[Beárazva 2018]', ' <p class="tac"><img src="https://prohardver.hu/dl/upc/2018-02/292543_jim_bcs_2.png" /></p>'));
    panel.appendChild(createFormattingButton('[~Ár]', ' <p><a href="http://#" target="_blank" rel="noopener"><b>~k</b></a></p>'));
    }
})();
