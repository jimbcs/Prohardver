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
    if (thrUsers) {
        var thrList = thrUsers.getElementsByTagName("ul")[0];

        while (thrList.firstChild) {
            thrList.removeChild(thrList.firstChild);
        }
    }
    // Your code here...
    function createMarker() {
        var domelement = document.createElement('div');
        domelement.setAttribute('id', 'jimbcsmarker');
        return domelement;
    }

    function createFormattingButton(title, content) {
        var button = document.createElement('input');
        button.setAttribute('type', 'button');
        button.setAttribute('value', title);
        button.onclick = function() {
            tinyMCE.activeEditor.execCommand('mceInsertContent', !1, content);
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

            tinyMCE.activeEditor.execCommand('mceInsertContent', !1, format.replace('%URL%', url).replace('%TITLE%', linkTitle));
        };

        return button;
    }

    setInterval(() => {
        var panel = document.querySelector('div.rtif-formats-tmce');
        if (panel) {
            var jimbcsmarker = document.querySelector('div#jimbcsmarker');
            if (!jimbcsmarker)
            {
                panel.appendChild(createMarker());
                panel.appendChild(createFormattingButton('Beárazva!', ' <p class="tac"><img src="https://prohardver.hu/dl/upc/2017-06/51464_162803_tuomas_2.png" /></p>'));
                panel.appendChild(createFormattingButton('~Ár', ' <a href="http://#" target="_blank" rel="noopener"><b>~k</b></a></p>'));
            }
        }
    }, 1000);
})();