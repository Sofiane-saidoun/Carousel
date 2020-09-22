class Carousel {
  // @param {HTMLElement} element
  // @param {Object} options
  // @param {Object} options.slidesToScroll nombres d'elements a faire défiler
  // @param {Object} options.slidesVisible nombres d'elements visible dans un slide
  constructor(element, options = {}) {
    this.element = element;
    this.options = Object.assign(
      {},
      {
        slidesToScroll: 1,
        slidesVisible: 1,
      },
      options
    );
    let children = [].slice.call(element.children);
    this.currentItem = 0;
    this.root = this.createDivWithClass("carousel");
    this.container = this.createDivWithClass("carousel_container");

    this.root.appendChild(this.container);
    this.element.appendChild(this.root);
    this.items = children.map((child) => {
      let item = this.createDivWithClass("carousel_item");
      item.appendChild(child);
      this.container.appendChild(item);
      return item;
    });
    this.setStyle();
    this.createNavigation();
  }
  setStyle() {
    let ration = this.items.length / this.options.slidesVisible;
    this.container.style.width = ration * 100 + "%";
    this.items.forEach(
      (item) => (item.style.width = 100 / this.items.length + "%")
    );
  }

  createNavigation() {
    let nextButton = this.createDivWithClass("carousel_next");
    let prevButton = this.createDivWithClass("carousel_prev");
    this.root.appendChild(nextButton);
    this.root.appendChild(prevButton);
    nextButton.addEventListener("click", this.next.bind(this));
    prevButton.addEventListener("click", this.prev.bind(this));
  }

  next() {
    this.goToItem(this.currentItem + this.options.slidesToScroll);
  }
  prev() {
    this.goToItem(this.currentItem - this.options.slidesToScroll);
  }

  goToItem(index) {
    let translateX = (index * -100) / this.items.length;
    this.container.style.transform = `translate3D(${translateX}% , 0 ,0)`;
    this.currentItem = index;
  }

  /*
    @param {string} className
    @return {HTMLElement}
    */
  createDivWithClass(className) {
    let div = document.createElement("div");
    div.setAttribute("class", className);
    return div;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  new Carousel(document.querySelector("#carousel1"), {
    slidesToScroll: 3,
    slidesVisible: 3,
  });
});
