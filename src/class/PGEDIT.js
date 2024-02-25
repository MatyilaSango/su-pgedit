"use strict";
/**
 * @class PGEDIT.
 * @implements IPGEDIT
 */
class PGEDIT {
    constructor() {
        this._activeService = Services.NONE;
    }
    /**
     * @inheritdoc
     */
    get activeService() {
        return this._activeService;
    }
    /**
     * @inheritdoc
     */
    editService(e) {
        if (this.editTmpHtmlElement)
            this.editTmpHtmlElement.setAttribute("contentEditable", "false");
        this.editTmpHtmlElement = e;
        if (!this.editTmpHtmlElement.classList.toString().includes("su-pgedit-wrapper")) {
            this.editTmpHtmlElement.setAttribute("contentEditable", "true");
            this.editTmpHtmlElement.focus();
        }
    }
    /**
     * @inheritdoc
     */
    hightlightService() {
        let selected = window.getSelection();
        let tmpSpanText = document.createElement("span");
        tmpSpanText.innerHTML = selected === null || selected === void 0 ? void 0 : selected.toString();
        tmpSpanText.style.backgroundColor = document.getElementById("su-pgedit-input-color").value;
        const range = selected === null || selected === void 0 ? void 0 : selected.getRangeAt(0);
        range === null || range === void 0 ? void 0 : range.extractContents();
        range === null || range === void 0 ? void 0 : range.insertNode(tmpSpanText);
    }
    /**
     * @inheritdoc
     */
    commentService(targetElement, e) {
        targetElement.style.position = "relative";
        let tmpCommentElement = document.createElement("div");
        tmpCommentElement.className = "su-pgedit-comment-wrapper";
        tmpCommentElement.id = "su-pgedit-comment-wrapper";
        tmpCommentElement.innerHTML = this.getSU_pgeditCommentElement();
        //@ts-ignore
        tmpCommentElement.style.left = `${e.clientX - e.target.getBoundingClientRect().left}px`;
        //@ts-ignore
        tmpCommentElement.style.top = `${e.clientY - e.target.getBoundingClientRect().top}px`;
        targetElement.appendChild(tmpCommentElement);
    }
    /**
     * @inheritdoc
     */
    downloadService() {
        // @ts-ignore
        html2pdf().from(document.body).save(`${document.head.title}.pdf`);
    }
    /**
     * @inheritdoc
     */
    setCurrentService(service) {
        var _a, _b, _c;
        (_a = document.getElementsByClassName(`su-pgedit-wrapper__${this.activeService}__active`)[0]) === null || _a === void 0 ? void 0 : _a.classList.remove("su-pgedit__active-service-selected");
        if (this.activeService !== service) {
            this._activeService = service;
            (_b = document.getElementsByClassName(`su-pgedit-wrapper__${service}__active`)[0]) === null || _b === void 0 ? void 0 : _b.classList.add("su-pgedit__active-service-selected");
        }
        else {
            if (this.activeService === Services.EDIT)
                (_c = this.editTmpHtmlElement) === null || _c === void 0 ? void 0 : _c.setAttribute("contentEditable", "false");
            this._activeService = Services.NONE;
        }
    }
    /**
     * @inheritdoc
     */
    getSU_pgeditComponent() {
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
            <div class="su-pgedit-wrapper__show-hide">
                <div class="su-pgedit-wrapper__show-hide__up-down" id="su-pgedit-wrapper__show-hide__up-down"></div>
            </div>
        `;
    }
    /**
     * @inheritdoc
     */
    getSU_pgeditCommentElement() {
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
}
