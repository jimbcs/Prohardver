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

    panel.appendChild(createFormattingButton('* Mancs', '[IMG:https://prohardver.hu/dl/upc/2016-03/292543_dog_footprint-24.png][/IMG]'));
    panel.appendChild(createFormattingButton('* Szóköz', '[IMG:https://prohardver.hu/dl/upc/2018-07/292543_194655_gray_line_3.jpg][/IMG]'));
	panel.appendChild(createFormattingButton('* Pecsét', '[IMG:https://prohardver.hu/dl/upc/2018-04/292543_245114_jimbcs_pecset_75x75_2.png][/IMG]'));
    panel.appendChild(createFormattingButton('* Nevezd meg', '[IMG:https://prohardver.hu/dl/upc/2016-03/292543_dog_footprint-24.png][/IMG] [B][I][L:https://prohardver.hu/tema/re_ndruu_segits_kereshetove_tenni_a_ph-s_arckepek/hsz_1-50.html]Nevezd meg az új arcképedet. Köszönjük![/L][/I][/B]'));
    panel.appendChild(createFormattingButton('* Egyéni arc beáll', '[B][I]Egyéni arcképe beállításra került. – jim bcs – 2019.xx.xx.[/I][/B]'));
    panel.appendChild(createFormattingButton('* Egyéni arc', 'Egyéni arckép beállítva.'));
    panel.appendChild(createFormattingButton('* Új egyéni arc', 'Új egyéni arckép beállítva.'));
    panel.appendChild(createFormattingButton('! Klón !', 'Üdv! [B]A Prohardver lapcsalád oldalain egy Felhasználó [I](az Üzemeltető előzetes írásbeli engedélye nélkül)[/I] egy Felhasználói Fiókkal rendelkezhet, melyet más részére nem engedhet át![/B] Egyezést találtunk xxxxxx fiókkal. Ezért érdeklődnék, melyik fiókot szeretnéd megtartani?'));
    panel.appendChild(createFormattingButton('! Moderálva !', '[OFF][I][L:http://#][B][Moderálva!][/B][/L][/I][/OFF]'));
    panel.appendChild(createFormattingButton('[Pontosítás!]', ' [L:http://#][B]Pontos típus, model? Privátba kérem![/B][/L]'));
    panel.appendChild(createFormattingButton('[Árazhatatlan!]', '[L:http://#][B]Árazhatatlan! Összefoglaló szerint! Ne írj új hsz.-t, a pontos adatokat privátba kérem a módosításhoz![/B][/L]'));
    panel.appendChild(createFormattingButton('[Összefoglaló!]', '[L:http://#][B]Légy oly kedves és az összefoglalót olvasd el, benne van amit nem szeretnénk látni a felvezetéskor és az is ahogyan szeretnénk![/B][/L]'));
    panel.appendChild(createFormattingButtonWithQuery('[Beárazás vége]', '[P:C][B][I]Az alábbi linken található beárazások elkészültek:[/I][/B]\n[B][I][M][L:%URL%]%TITLE%[/L][/M][/I][/B]\n[OFF]Az árak a hozzászólásaitokba vannak szerkesztve.[/OFF][/P]',
                                                  'Add meg a hozzászólások linkjét!'));
    panel.appendChild(createFormattingButton('[Beárazva 2018]', ' [P:C][IMG:https://prohardver.hu/dl/upc/2018-02/292543_jim_bcs_2.png][/IMG][/P]'));
    panel.appendChild(createFormattingButton('[~Ár]', ' [L:http://#][B]~', 'k[/B][/L]'));
    }
})();
