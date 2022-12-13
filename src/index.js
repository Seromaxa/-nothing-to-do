import "./styles/index.css"
import listPosts from "./conteiners/listPosts"
import header from "./conteiners/header"
import { eventController } from "./events/eventcontroller"
import fillList from "./events/headerEvents/fillList"

window.addEventListener("scroll", () => {
  if (!eventController.toggle && eventController.process) {
    eventController.toggle = true
    fillList()
  }
})

const main = document.createElement("main")
main.classList.add("main")

document.body.append(header.render())
document.body.appendChild(main)
main.appendChild(listPosts.render())
