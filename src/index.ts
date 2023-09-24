let activeService = "";

enum Services {
    EDIT = "edit",
    HIGHLIGHT = "highlight",
    COMMENT = "comment",
    DOWNLOAD = "download",
    NONE = "none",
}

function editService() { }

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

function commentService() { }

function downloadService() { }

function setCurrentService(service: string) {
    document
        .getElementsByClassName(`su-pgedit-wrapper__${activeService}__active`)[0]
        ?.classList.remove("su-pgedit__active-service-selected");
    activeService = service;
    document
        .getElementsByClassName(`su-pgedit-wrapper__${service}__active`)[0]
        ?.classList.add("su-pgedit__active-service-selected");
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

    let tmpDivElement: HTMLDivElement = document.createElement("div");
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
    };

    document.onselectionchange = function () {
        if (activeService === Services.HIGHLIGHT) {
            hightlightService();
        }
    };
};
