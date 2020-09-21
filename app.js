class Carousel {

    // @param {HTMLElement} element
    // @param {Object} options
    // @param {Object} options.slidesToScroll nombres d'elements a faire défiler
    // @param {Object} options.slidesVisible nombres d'elements visible dans un slide
    constructor(element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1
        }, options)
        this.children = [].slice.call(element.children)
        let ration = this.children.length / this.options.slidesVisible
        let root = this.createDivWithClass("carousel")
        this.container = this.createDivWithClass('carousel_container')

        root.appendChild(this.container)
        this.element.appendChild(root)
        this.children.forEach((child) => {
            let item = this.createDivWithClass('carousel_item')
            item.style.width = 100 / this.children.length + "%"
            item.appendChild(child)
            this.container.appendChild(item)
        })
    }
    setStyle() {
        let ration = this.children.length / this.options.slidesVisible
        this.container.style.width = (ration * 100) + "%"


    }




    /*
    @param {string} className
    @return {HTMLElement}
    */
    createDivWithClass(className) {
        let div = document.createElement("div")
        div.setAttribute("class", className)
        return div
    }

}







document.addEventListener("DOMContentLoaded", function () {

    new Carousel(document.querySelector("#carousel1"), {
        slidesToScroll: 3,
        slidesVisible: 3
    })

})