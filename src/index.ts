
enum Services {
    EDIT = "edit",
    HIGHLIGHT = "highlight",
    COMMENT = "comment",
    DOWNLOAD = "download",
    NONE = "none",
}

let activeService = Services.NONE as string;
let editTmpHtmlElement: HTMLElement;

function editService(e: HTMLElement) {
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
    tmpSpanText.innerHTML = selected?.toString() as string;
    tmpSpanText.style.backgroundColor = (
        document.getElementById("su-pgedit-input-color") as HTMLInputElement
    ).value;
    const range = selected?.getRangeAt(0);
    range?.extractContents();
    range?.insertNode(tmpSpanText);
}

function commentService(targetElement: HTMLElement, e: MouseEvent) {
    targetElement.style.position = "relative"

    let tmpCommentElement = document.createElement("div");
    tmpCommentElement.className = "su-pgedit-comment-wrapper"
    tmpCommentElement.id = "su-pgedit-comment-wrapper"
    tmpCommentElement.innerHTML = getSU_pgeditCommentElement()

    //@ts-ignore
    tmpCommentElement.style.left = `${e.clientX - e.target.getBoundingClientRect().left}px`
    //@ts-ignore
    tmpCommentElement.style.top = `${e.clientY - e.target.getBoundingClientRect().top}px`

    targetElement.appendChild(tmpCommentElement)
 }

function downloadService() {
    // @ts-ignore
    html2pdf().from(document.body).save(`${document.head.title}.pdf`);
}

function setCurrentService(service: string) {
    document
        .getElementsByClassName(`su-pgedit-wrapper__${activeService}__active`)[0]
        ?.classList.remove("su-pgedit__active-service-selected");

    if (activeService !== service) {
        activeService = service;
        document
            .getElementsByClassName(`su-pgedit-wrapper__${service}__active`)[0]
            ?.classList.add("su-pgedit__active-service-selected");
    } else {
        if (activeService === Services.EDIT) editTmpHtmlElement.setAttribute("contentEditable", "false");

        activeService = Services.NONE
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
        <div class="su-pgedit-wrapper__show-hide">
            <div class="su-pgedit-wrapper__show-hide__up-down" id="su-pgedit-wrapper__show-hide__up-down"></div>
        </div>
    `;
}

function getSU_pgeditCommentElement(){
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
    `
}

window.onload = function () {

    let tmpDivElement: HTMLDivElement = document.createElement("div");
    tmpDivElement.className = "su-pgedit-wrapper center-items";
    tmpDivElement.id = "su-pgedit-wrapper"
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
        let targetElement = e.target as HTMLElement;

        if (activeService === Services.EDIT) {
            editService(targetElement);
        }

        if(activeService === Services.COMMENT){
            if(targetElement.className === "su-pgedit-comment-wrapper"){
                targetElement.children[0].classList.remove("hide")
            }

            if(targetElement.classList.contains("su-pgedit-comment-wrapper__comment-box__exit")){
                targetElement.parentElement?.parentElement?.parentElement?.remove()
            }
    
            if(targetElement.classList.contains("su-pgedit-comment-wrapper__comment-box__minimize")){
                targetElement.parentElement?.parentElement?.classList.add("hide")
            }

            if(!targetElement.classList.toString().includes("su-pgedit-comment-wrapper") && !targetElement.classList.toString().includes("su-pgedit-wrapper")){
                commentService(targetElement, e)
            }

            if(targetElement.classList.contains("su-pgedit-comment-wrapper__comment-box__comment-section")){
                editService(targetElement);
            }
        }

    });

    let showHideBtn: HTMLElement = document.getElementById("su-pgedit-wrapper__show-hide__up-down") as HTMLElement;
    let suPgEdit: HTMLElement = document.getElementById("su-pgedit-wrapper") as HTMLElement;
    let serviceBtns: Element[] = document.getElementsByClassName("su-pgedit-wrapper-btn") as unknown as Element[];
    suPgEdit.style.height = "50px"
    showHideBtn.onclick = function(){
        if(suPgEdit.style.height === "50px"){
            showHideBtn.style.rotate = "180deg"
            suPgEdit.style.height = "0"
            serviceBtns.forEach(element => element.classList.add("visibility-hidden"))
        } else {
            showHideBtn.style.rotate = "0deg"
            suPgEdit.style.height = "50px"
            serviceBtns.forEach(element => element.classList.remove("visibility-hidden"))
        }
    }

};
