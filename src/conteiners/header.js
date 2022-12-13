import Header from "../components/header"
import {
  DEL_TEXT,
  ADD_TEXT,
  FILL_TEXT,
  CLEAR_TEXT,
  DELETED_ITEMS_TEXT,
  REMOVE,
} from "../constants"
import addCard from "../events/headerEvents/addCard"
import deleteLastItem from "../events/headerEvents/deleteLastItem"
import clear from "../events/headerEvents/clear"
import fillList from "../events/headerEvents/fillList"
import Controller from "../app/controler"
import { showDeleted } from "../events/headerEvents/showDeleted"
import store from "../app/postStore"
import { eventController } from "../events/eventcontroller"

const SHOW_DELETED = "showDeleted"

const header = new Header()
const controllerHeader = new Controller(store.state.deleted, header.render())
controllerHeader.setArr(store.state.deleted)
controllerHeader.setControledElem(header.render())

const add = document.createElement("button")
const deleteLast = document.createElement("button")
const fill = document.createElement("button")
const deleteAll = document.createElement("button")
const dellModall = document.createElement("button")

add.textContent = ADD_TEXT
deleteLast.textContent = DEL_TEXT
fill.textContent = FILL_TEXT
deleteAll.textContent = CLEAR_TEXT
dellModall.textContent = DELETED_ITEMS_TEXT
dellModall.setAttribute("id", SHOW_DELETED)

add.addEventListener("click", addCard)
deleteLast.addEventListener("click", deleteLastItem)

fill.addEventListener("click", fillIng)

deleteAll.addEventListener("click", clear)
dellModall.addEventListener("click", showDeleted)

function fillIng() {
  eventController.toggle = !eventController.toggle
  eventController.process = !eventController.process
  fillList()
}

header.addElToNav(add)
header.addElToNav(deleteLast)
header.addElToNav(fill)
header.addElToNav(deleteAll)
controllerHeader.deleted ? header.addElToNav(dellModall) : null

header.render().addEventListener("del", (ev) => {
  if (ev.detail.toggle && !header.getElement(SHOW_DELETED)) {
    header.addElToNav(dellModall)
  }
  if (!ev.detail.toggle && header.getElement(SHOW_DELETED)) {
    header.removeEl(SHOW_DELETED)
  }
})
export const controller = controllerHeader
export default header
