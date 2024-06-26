import { Services } from "../enum/enum";
import { IPGEDIT } from "../interface/IPGEDIT";
// @ts-ignore
import html2pdf from "html2pdf.js";

/**
 * @class PGEDIT.
 * @implements IPGEDIT
 */
export class PGEDIT implements IPGEDIT {
    private _activeService;
    private editTmpHtmlElement: HTMLElement | undefined;

    constructor() {
        this._activeService = Services.NONE as string;
    }

    /**
     * @inheritdoc
     */
    public get activeService(): string {
        return this._activeService;
    }

    /**
     * @inheritdoc
     */
    editService(e: HTMLElement) {
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
        tmpSpanText.innerHTML = selected?.toString() as string;
        tmpSpanText.style.backgroundColor = (document.getElementById("su-pgedit-input-color") as HTMLInputElement).value;
        const range = selected?.getRangeAt(0);
        range?.extractContents();
        range?.insertNode(tmpSpanText);
    }

    /**
     * @inheritdoc
     */
    commentService(targetElement: HTMLElement, e: MouseEvent) {
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
        html2pdf().from(document.body).save(`${document.head.title}_page.pdf`);
    }

    /**
     * @inheritdoc
     */
    setCurrentService(service: string) {
        document.getElementsByClassName(`su-pgedit-wrapper__${this.activeService}__active`)[0]?.classList.remove("su-pgedit__active-service-selected");

        if (this.activeService !== service) {
            this._activeService = service;
            document.getElementsByClassName(`su-pgedit-wrapper__${service}__active`)[0]?.classList.add("su-pgedit__active-service-selected");
        } else {
            if (this.activeService === Services.EDIT)
                this.editTmpHtmlElement?.setAttribute("contentEditable", "false");

            this._activeService = Services.NONE;
        }
    }

    /**
     * @inheritdoc
     */
    getSU_pgeditComponent() {
        return `
            <div class="su-pgedit-wrapper-btn center-items" id="su-pgedit-wrapper__edit">
                <div class="su-pgedit-wrapper__edit__active" id="su-pgedit-wrapper_active"></div>
                <div class="su-pgedit-wrapper__edit"></div>
            </div>
            <div class="su-pgedit-wrapper-btn center-items" id="su-pgedit-wrapper__highlight">
                <div class="su-pgedit-wrapper__highlight__active" id="su-pgedit-wrapper_active"></div>
                <div class="su-pgedit-wrapper__highlight"></div>
                <input class="su-pgedit-input-color" id="su-pgedit-input-color" type="color">
            </div>
            <div class="su-pgedit-wrapper-btn center-items" id="su-pgedit-wrapper__comment">
                <div class="su-pgedit-wrapper__comment__active" id="su-pgedit-wrapper_active"></div>
                <div class="su-pgedit-wrapper__comment"></div>
            </div>
            <div class="su-pgedit-wrapper-btn center-items" id="su-pgedit-wrapper__download">
                <div class="su-pgedit-wrapper__download__active" id="su-pgedit-wrapper_active"></div>
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
