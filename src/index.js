"use strict";
var Services;
(function (Services) {
    Services["EDIT"] = "edit";
    Services["HIGHLIGHT"] = "highlight";
    Services["COMMENT"] = "comment";
    Services["DOWNLOAD"] = "download";
    Services["NONE"] = "none";
})(Services || (Services = {}));
let activeService = Services.NONE;
let editTmpHtmlElement;
function editService(e) {
    if (editTmpHtmlElement)
        editTmpHtmlElement.setAttribute("contentEditable", "false");
    editTmpHtmlElement = e.target;
    if (!editTmpHtmlElement.classList.toString().includes("su-pgedit-wrapper")) {
        editTmpHtmlElement.setAttribute("contentEditable", "true");
        editTmpHtmlElement.focus();
    }
}
function hightlightService() {
    let selected = window.getSelection();
    let tmpSpanText = document.createElement("span");
    tmpSpanText.innerHTML = selected === null || selected === void 0 ? void 0 : selected.toString();
    tmpSpanText.style.backgroundColor = document.getElementById("su-pgedit-input-color").value;
    const range = selected === null || selected === void 0 ? void 0 : selected.getRangeAt(0);
    range === null || range === void 0 ? void 0 : range.extractContents();
    range === null || range === void 0 ? void 0 : range.insertNode(tmpSpanText);
}
function commentService() { }
function downloadService() {
    // @ts-ignore
    // html2pdf().from(document.body).save(`${document.head.title}.pdf`);
}
function setCurrentService(service) {
    var _a, _b;
    (_a = document
        .getElementsByClassName(`su-pgedit-wrapper__${activeService}__active`)[0]) === null || _a === void 0 ? void 0 : _a.classList.remove("su-pgedit__active-service-selected");
    if (activeService !== service) {
        activeService = service;
        (_b = document
            .getElementsByClassName(`su-pgedit-wrapper__${service}__active`)[0]) === null || _b === void 0 ? void 0 : _b.classList.add("su-pgedit__active-service-selected");
    }
    else {
        if (activeService === Services.EDIT)
            editTmpHtmlElement.setAttribute("contentEditable", "false");
        activeService = Services.NONE;
    }
}
window.onload = function () {
    function getSU_pgeditComponent() {
        return `
            <div class="su-pgedit-wrapper-btn center-items" id="su-pgedit-wrapper__edit">
                <div class="su-pgedit-wrapper__edit__active"></div>
                <div class="su-pgedit-wrapper__edit"></div>
            </div>
            <div class="su-pgedit-wrapper-btn center-items" id="su-pgedit-wrapper__highlight">
                <div class="su-pgedit-wrapper__highlight__active"></div>
                <div class="su-pgedit-wrapper__highlight"></div>
                <input class="su-pgedit-input-color" id="su-pgedit-input-color" type="color">
            </div>
            <div class="su-pgedit-wrapper-btn center-items" id="su-pgedit-wrapper__comment">
                <div class="su-pgedit-wrapper__comment__active"></div>
                <div class="su-pgedit-wrapper__comment"></div>
            </div>
            <div class="su-pgedit-wrapper-btn center-items" id="su-pgedit-wrapper__download">
                <div class="su-pgedit-wrapper__download__active"></div>
                <div class="su-pgedit-wrapper__download"></div>
            </div>
        `;
    }
    let tmpDivElement = document.createElement("div");
    tmpDivElement.className = "su-pgedit-wrapper center-items";
    tmpDivElement.innerHTML = getSU_pgeditComponent();
    document.body.appendChild(tmpDivElement);
    // document.head.innerHTML += `<meta http-equiv="Content-Security-Policy" content="script-src-elem 'self'  http://localhost:* http://127.0.0.1:* 'unsafe-inline' 'unsafe-eval';">`
    // let tmplScriptElement = document.createElement("script");
    // tmplScriptElement.type = "application/javascript";
    // tmplScriptElement.src =
    //     "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    // document.head.appendChild(tmplScriptElement);
    //@ts-ignore
    document.getElementById("su-pgedit-wrapper__edit").onclick = function () {
        setCurrentService(Services.EDIT);
    };
    //@ts-ignore
    document.getElementById("su-pgedit-wrapper__highlight").onclick =
        function () {
            setCurrentService(Services.HIGHLIGHT);
        };
    //@ts-ignore
    document.getElementById("su-pgedit-wrapper__comment").onclick = function () {
        setCurrentService(Services.COMMENT);
    };
    //@ts-ignore
    document.getElementById("su-pgedit-wrapper__download").onclick = function () {
        setCurrentService(Services.DOWNLOAD);
        downloadService();
    };
    document.onselectionchange = function () {
        if (activeService === Services.HIGHLIGHT) {
            hightlightService();
        }
    };
    document.addEventListener("click", function (e) {
        if (activeService === Services.EDIT) {
            editService(e);
        }
    });
};
