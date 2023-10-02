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
    editTmpHtmlElement = e;
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
function commentService(targetElement, e) {
    targetElement.style.position = "relative";
    let tmpCommentElement = document.createElement("div");
    tmpCommentElement.className = "su-pgedit-comment-wrapper";
    tmpCommentElement.id = "su-pgedit-comment-wrapper";
    tmpCommentElement.innerHTML = getSU_pgeditCommentElement();
    //@ts-ignore
    tmpCommentElement.style.left = `${e.clientX - e.target.getBoundingClientRect().left}px`;
    //@ts-ignore
    tmpCommentElement.style.top = `${e.clientY - e.target.getBoundingClientRect().top}px`;
    targetElement.appendChild(tmpCommentElement);
}
function downloadService() {
    // @ts-ignore
    html2pdf().from(document.body).save(`${document.head.title}.pdf`);
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
function getSU_pgeditCommentElement() {
    return `
        <span class="su-pgedit-comment-wrapper__comment-box">
            <div class="su-pgedit-comment-wrapper__comment-box__minimize-max">
                <div class="su-pgedit-comment-wrapper__comment-box__minimize" id="su-pgedit-comment-wrapper__comment-box__minimize"></div>
                <div class="su-pgedit-comment-wrapper__comment-box__exit" id="su-pgedit-comment-wrapper__comment-box__exit"></div>
            </div>
            
            <span class="su-pgedit-comment-wrapper__comment-box__comment-section" id="su-pgedit-comment-wrapper__comment-box__comment-section">
                Comment...
            </span>
        </span>
    `;
}
window.onload = function () {
    let tmpDivElement = document.createElement("div");
    tmpDivElement.className = "su-pgedit-wrapper center-items";
    tmpDivElement.innerHTML = getSU_pgeditComponent();
    document.body.appendChild(tmpDivElement);
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
        var _a, _b, _c, _d, _e;
        let targetElement = e.target;
        if (activeService === Services.EDIT) {
            editService(targetElement);
        }
        if (activeService === Services.COMMENT) {
            if (targetElement.className === "su-pgedit-comment-wrapper") {
                targetElement.children[0].classList.remove("hide");
            }
            if (targetElement.classList.contains("su-pgedit-comment-wrapper__comment-box__exit")) {
                (_c = (_b = (_a = targetElement.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.remove();
            }
            if (targetElement.classList.contains("su-pgedit-comment-wrapper__comment-box__minimize")) {
                (_e = (_d = targetElement.parentElement) === null || _d === void 0 ? void 0 : _d.parentElement) === null || _e === void 0 ? void 0 : _e.classList.add("hide");
            }
            if (!targetElement.classList.toString().includes("su-pgedit-comment-wrapper") && !targetElement.classList.toString().includes("su-pgedit-wrapper")) {
                commentService(targetElement, e);
            }
            if (targetElement.classList.contains("su-pgedit-comment-wrapper__comment-box__comment-section")) {
                editService(targetElement);
            }
        }
    });
};
