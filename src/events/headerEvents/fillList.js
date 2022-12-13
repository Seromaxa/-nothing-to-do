import addCard from "./addCard"
import listPosts from "../../conteiners/listPosts"
import { eventController } from "../eventcontroller"

let timer

function fillList() {
  if (!eventController.toggle) {
    clearInterval(timer)
    return
  }
  const listBox = listPosts.render().getBoundingClientRect()

  timer = setInterval(() => {
    if (!eventController.toggle) {
      clearInterval(timer)
      return
    }
    const lastItem = listPosts.lastItem
    const ItemBox = lastItem ? lastItem.getBoundingClientRect() : 0
    const winHeight =
      document.documentElement.scrollTop + document.documentElement.clientHeight

    if (
      ItemBox?.right + 30 > listBox.right &&
      lastItem.offsetTop + lastItem.offsetHeight >= winHeight - 60
    ) {
      eventController.toggle = false
      clearInterval(timer)
      return
    }

    addCard(listPosts.render(), (el) => listPosts.append(el))
  }, 300)
}

export default fillList
