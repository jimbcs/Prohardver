// ==UserScript==
// @name         PH! Adatlap Tg. Responsive 2019
// @version      1.0
// @description  Topikgazdák adatlapján megjelennek a topikjaik.
// @author       jim bcs
// @include      *prohardver.hu/tag*
// @include      *itcafe.hu/tag*
// @include      *logout.hu/tag*
// @include      *mobilarena.hu/tag*
// @include      *gamepod.hu/tag*
// @updateURL    https://raw.
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var re = /tag\/([^.]+).html(\?cpt_code=.+)?$/;
    var username = document.baseURI.match(re)[1];

    var form = document.forms[0];
    var toBefore = form.nextSibling;

    function addItem(item)
    {
        var div = document.createElement("div");
        div.classList.add("full");
        div.appendChild(item);
        form.parentNode.insertBefore(div, toBefore);
    }

    function addItemInP(item)
    {
        var p = document.createElement("p");

        p.innerHTML = item;
        addItem(p);
    }

    var oReq = new XMLHttpRequest();
    oReq.onload = function(e)
    {
        var parser=new DOMParser();
        var htmlDoc=parser.parseFromString(oReq.responseText, "text/html");
        var msgbody = htmlDoc.querySelector("div.msg-content, div#msg1.msg.flc > div.text");
        var body = msgbody.getElementsByTagName("P");
        for (var i = 0; i < body.length; ++i)
        {
            var links = body[i].getElementsByTagName("A");
            if (links && links.length < 2)
                continue;

            var re = /tag\/([^.]+).html(\?cpt_code=.+)?$/;
            var actualUser = links[0].href.match(re)
            if (!actualUser || actualUser[1] !== username)
                continue;

            var clone = body[i].cloneNode(true);

            while (clone.childNodes[0].textContent[0] !== "●")
                clone.removeChild(clone.firstChild);

            addItem(document.createElement("hr"));
            addItemInP("<b>Topikgazda</b>");
            addItem(clone);
            break;
        }
    };

    // hack: sync lekeres, hogy a link atiranyito script bevarja ezt.
    oReq.open("GET", "/tema/topikgazdak_es_topikjaik/hsz_1-1.html", false);
    oReq.send();

})();
