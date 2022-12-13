import store from "../../app/postStore"
import { getID } from "../getID"
import { REMOVE, RESTORE, FULLREMOVE } from "../../constants"
import { controller } from "../../conteiners/header"

function deleteCard(arg, ev) {
  let id = +getID(ev)
  const child = ev.path.filter((item) => item.localName === "li")[0]
  child.classList.add("remove")
  setTimeout(() => {
    child.remove()
  }, 300)
  if (arg === REMOVE) {
    store.removeOneItem(id)
    controller.setDeleted(store.state.deleted)
  }
  if (arg === RESTORE) {
    store.restoreItem(id)
    controller.setDeleted(store.state.deleted)
  }
  if (arg === FULLREMOVE) {
    store.fullRemoveItem(id)
    controller.setDeleted(store.state.deleted)
  }

  return id
}

export default deleteCard
