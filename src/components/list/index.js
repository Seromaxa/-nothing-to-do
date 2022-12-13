import Card from "../card"
import style from "./styles.module.css"

// type rootStyles = {
//     list:{
//         names: string[],
//         add:boolean
//     },
//     li:{
//         names:String,
//         add:boolean
//     }
// }

class List {
  el = document.createElement("ul")
  lastItem
  constructor({ arr, info, del, cardStyles, rootStyles }) {
    this._events = []
    this.cardStyles = cardStyles
    this.remove = this.remove.bind(this)
    this.defaultStyles = {
      list: [style.list],
      li: [style.item],
    }
    this.rootStyles = rootStyles
    this.init(arr, info, del)
  }
  init(arr, info, del) {
    this.#setStyles()
    arr
      ? arr.map((item) => {
          const li = document.createElement("li")
          this.defaultStyles?.li.forEach((item) => li.classList.add(item))
          const card = new Card(item, info, del)
          if (this.cardStyles) card.setStyles(this.cardStyles)
          li.appendChild(card.render())
          this.el.appendChild(li)
          this.lastItem = li
        })
      : null
    this.defaultStyles?.list.map((item) => this.el.classList.add(item))
  }
  append(el) {
    const li = document.createElement("li")
    this.defaultStyles.li.map((item) => li.classList.add(item))
    li.appendChild(el)
    this.el.appendChild(li)
    this.setLastItem(li)
  }
  #setStyles() {
    if (this.rootStyles) {
      Object.keys(this.rootStyles).map((item) =>
        this.rootStyles[item].add
          ? (this.defaultStyles[item] = [
              ...this.defaultStyles,
              ...this.rootStyles[item].names,
            ])
          : (this.defaultStyles[item] = this.rootStyles[item].names)
      )
    }
  }

  addEvent(ev, callback) {
    this._events.push({ ev: ev, fn: callback })
    this.el.addEventListener(ev, callback)
  }
  get el() {
    return this.el
  }
  get lastItem() {
    return this.lastItem
  }

  setLastItem(el) {
    this.lastItem = el
  }
  render() {
    return this.el
  }

  remove() {
    this._events.map((item) => this.el.removeEventListener(item.ev, item.fn))
    this.el.remove()
  }
}

export default List
