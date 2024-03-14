// ==UserScript==
// @name         Ármester Responsive for Kendek
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Administration toolbar for Prohardver
// @author       jim bcs, Kendek
// @include      /^https://(itcafe|prohardver|mobilarena|fototrend|gamepod)\.hu/(tema|privat)/.*$/
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment-with-locales.min.js
// ==/UserScript==

let buttons = [
    {title: 'Mancs', content: '<p><img src="https://prohardver.hu/dl/upc/2016-03/292543_dog_footprint-24.png" alt="" /></p>'},
    {title: 'Pecsét', content: '<p><img src="https://prohardver.hu/dl/upc/2018-04/292543_245114_jimbcs_pecset_75x75_2.png" alt="" /></p>'},
    {title: 'Szóköz', content: '<p><img src="https://prohardver.hu/dl/upc/2018-07/292543_194655_gray_line_3.jpg" alt="" /></p>'},
    {title: 'Nevezd meg', content: '<p><img src="https://prohardver.hu/dl/upc/2016-03/292543_dog_footprint-24.png" alt="" /> <b><i><a href="https://prohardver.hu/tema/re_ndruu_segits_kereshetove_tenni_a_ph-s_arckepek/hsz_1-50.html" target="_blank" rel="noopener">Nevezd meg az új arcképedet. Köszönjük!</a></i></b></p>'},
    {title: 'Egyéni arc beáll', content: '<p><b><i>Egyéni arcképe beállításra került. – jim bcs – 2023.xx.xx.</i></b></p>'},
    {title: 'Klón', content: '<p>Üdv! <b>A Prohardver lapcsalád oldalain egy Felhasználó <i>(az Üzemeltető előzetes írásbeli engedélye nélkül)</i> egy Felhasználói Fiókkal rendelkezhet, melyet más részére nem engedhet át!</b> Egyezést találtunk xxxxxx fiókkal. Ezért érdeklődnék, melyik fiókot szeretnéd megtartani?</p>'},
    {title: 'Pontosítás', content: '<p><a href="http://#" target="_blank" rel="noopener"><b>Pontos típus, model? Privátba kérem!</b></a></p>'},
    {title: 'Árazhatatlan', content: '<p><a href="http://#" target="_blank" rel="noopener"><b>Árazhatatlan! Összefoglaló szerint! Ne írj új hsz.-t, a pontos adatokat privátba kérem a módosításhoz!</b></a></p>'},
    {title: 'Összefoglaló', content: '<p><a href="http://#" target="_blank" rel="noopener"><b>Légy oly kedves és az összefoglalót olvasd el, benne van amit nem szeretnénk látni a felvezetéskor és az is ahogyan szeretnénk!</b></a></p>'},
];

let MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

function addButton(container, title, content) {
    let btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-group');
    btnContainer.classList.add('mr-1');
    let btn = document.createElement('button');
    btn.classList.add('btn', 'btn-secondary', 'btn-sm');
    btn.innerHTML = title;
    btn.setAttribute('type', 'button');
    btn.onclick = () => {
        tinyMCE.activeEditor.setContent(tinyMCE.activeEditor.getContent() + content, {format: 'raw'});
    }
    btnContainer.appendChild(btn);
    container.appendChild(btnContainer);
}

function createControls() {
    let root = document.createElement('div');
    root.classList.add('msg-controls');
    let container = document.createElement('div');
    buttons.forEach(btn => {
        addButton(container, btn.title, btn.content);
    });
    root.appendChild(container);
    return root;
}

(function() {
    'use strict';
    let msgList = document.getElementsByClassName('msg-list')[2];
    if (msgList != undefined) {
        let list = msgList.getElementsByClassName('list-unstyled')[0];
        let observer = new MutationObserver(mutationList => {
            let m = mutationList.filter(e => Array.from(e.addedNodes).filter(f => f.classList != undefined && (f.classList.contains('msg-editor') || f.classList.contains('media-body'))).length > 0);
            if (m.length > 0) {
                let controls = createControls();
                document.getElementsByClassName('msg-form')[0].appendChild(controls);
            }
        });
        observer.observe(list, {attributes: false, childList: true, subtree: true})
    }
})();