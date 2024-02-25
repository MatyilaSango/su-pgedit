"use strict";
window.onload = function () {
    const pgEditObj = new PGEDIT();
    let tmpDivElement = document.createElement("div");
    tmpDivElement.className = "su-pgedit-wrapper center-items";
    tmpDivElement.id = "su-pgedit-wrapper";
    tmpDivElement.innerHTML = pgEditObj.getSU_pgeditComponent();
    document.body.appendChild(tmpDivElement);
    //@ts-ignore
    document.getElementById("su-pgedit-wrapper__edit").onclick = function () {
        pgEditObj.setCurrentService(Services.EDIT);
    };
    //@ts-ignore
    document.getElementById("su-pgedit-wrapper__highlight").onclick =
        function () {
            pgEditObj.setCurrentService(Services.HIGHLIGHT);
        };
    //@ts-ignore
    document.getElementById("su-pgedit-wrapper__comment").onclick = function () {
        pgEditObj.setCurrentService(Services.COMMENT);
    };
    //@ts-ignore
    document.getElementById("su-pgedit-wrapper__download").onclick = function () {
        pgEditObj.setCurrentService(Services.DOWNLOAD);
        pgEditObj.downloadService();
    };
    document.onselectionchange = function () {
        if (pgEditObj.activeService === Services.HIGHLIGHT) {
            pgEditObj.hightlightService();
        }
    };
    document.addEventListener("click", function (e) {
        var _a, _b, _c, _d, _e;
        let targetElement = e.target;
        if (pgEditObj.activeService === Services.EDIT) {
            pgEditObj.editService(targetElement);
        }
        if (pgEditObj.activeService === Services.COMMENT) {
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
                pgEditObj.commentService(targetElement, e);
            }
            if (targetElement.classList.contains("su-pgedit-comment-wrapper__comment-box__comment-section")) {
                pgEditObj.editService(targetElement);
            }
        }
    });
    let showHideBtn = document.getElementById("su-pgedit-wrapper__show-hide__up-down");
    let suPgEdit = document.getElementById("su-pgedit-wrapper");
    let serviceBtns = document.querySelectorAll(".su-pgedit-wrapper-btn");
    console.log();
    suPgEdit.style.height = "50px";
    showHideBtn.onclick = function () {
        if (suPgEdit.style.height === "50px") {
            showHideBtn.style.rotate = "180deg";
            suPgEdit.style.height = "0";
            serviceBtns.forEach(element => element.classList.add("visibility-hidden"));
        }
        else {
            showHideBtn.style.rotate = "0deg";
            suPgEdit.style.height = "50px";
            serviceBtns.forEach(element => element.classList.remove("visibility-hidden"));
        }
    };
};
