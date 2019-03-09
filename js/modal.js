class Modal {
    constructor(obj, id_modal, ) {
        this.obj = obj;
        this.id_modal = id_modal;
    }

    size(size = 3){
        const s = ['s', 'm-s', 'm', 'm-l', 'l'];
        this.size = s[size-1];
    }

    colorHeader(background = 'rgba(103, 117, 240, 1)', text = '#fff'){
        this.textColorHeader = text;
        this.borderColorHeader = background;

        const transparencyBackground = background.substring(background.length-2,background.length-1) -.1;
        this.backgroudColorHeader = `${background.substring(0,background.length-2)}${transparencyBackground})`;
    }

    colorBody(background = 'rgba(255, 255, 255, 1)', text = '#000'){
        this.textColorBody = text;
        this.backgroudColorBody = background;
    }

    colorFooter(background = 'rgba(103, 117, 240, 1)', text = '#fff'){
        this.textColorFooter = text;
        this.borderColorFooter = background;

        const transparencyBackground = background.substring(background.length-2,background.length-1) -.1;
        this.backgroudColorFooter = `${background.substring(0,background.length-2)}${transparencyBackground})`;
    }

    borderRadius(radius = '5px'){
        this.borderRadius = radius;
    }

    divisions(division = ['h', 'b', 'f']){
        this.division = division;
    }

    html(content = ['<h2>header content</h2>', '<p>body content</p>', '<p>footer content</p>']){
        var div = "";
        for (var i=0;i<this.division.length;i++){
            const part = this.division[i].replace('h', 'header')
                .replace('b', 'body')
                .replace('f', 'footer');
            const closeModal = i === 0 ?
                `<span class="close-modal"><i class="material-icons">close</i></span>` : "" ;
            div += `
                <div class="${part}-modal">
                    ${closeModal}
                    ${content[i]}
                </div>
                `;
        }
        this.content = div;
    }

    create(){
        const size = this.size !== "s" &&
        this.size !== "m-s" &&
        this.size !== "m" &&
        this.size !== "m-l" &&
        this.size !== "l" ? 'm' : this.size;
        $(this.obj).html(`
            <div id="${this.id_modal}" class="modal-modal modal-${size}">
                <div class="overflow-modal">
                    <div class="container-modal">
                        ${this.content}
                    </div>
                </div>

            </div>
            `);

        $(`[data-modal="${this.id_modal}"]`).click( function () {
            var id = $(this).attr("data-modal");
            var el = document.getElementById(id);
            $(el).toggleClass("show");
            $('body').toggleClass("overflow-hidden");
        });

        $(`#${this.id_modal} .close-modal`).click( function () {
            $(this).parent().parent().parent().parent().toggleClass("show");
            $('body').toggleClass("overflow-hidden");
        });

        $(`#${this.id_modal} > .overflow-modal > .container-modal`).css({
            'border-radius': `${this.borderRadius}`
        });

        $(`#${this.id_modal} > .overflow-modal > .container-modal > .header-modal`).css({
            'background-color': `${this.backgroudColorHeader}`,
            'color': `${this.textColorHeader}`,
            'border-bottom': `1px solid ${this.borderColorHeader}`
        });

        $(`#${this.id_modal} > .overflow-modal > .container-modal > .body-modal`).css({
            'background-color': `${this.backgroudColorBody}`,
            'color': `${this.textColorBody}`
        });

        $(`#${this.id_modal} > .overflow-modal > .container-modal > .footer-modal`).css({
            'background-color': `${this.backgroudColorFooter}`,
            'color': `${this.textColorFooter}`,
            'border-top': `1px solid ${this.borderColorFooter}`
        });
    }
}