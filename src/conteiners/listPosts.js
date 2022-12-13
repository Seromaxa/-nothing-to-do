import List from "../components/list"
import store from "../app/postStore"
import deleteCard from "../events/listEvents/deleteCard"
import setInfo from "../events/listEvents/setInfo"
import { REMOVE, DEL, INFO } from "../constants"
import styles from "../styles/infoPage.module.css"

const { posts } = store.state

const listPosts = new List({ arr: posts })

listPosts.addEvent("click", function delItem(ev) {
  if (ev.target.dataset.name === DEL) {
    deleteCard(REMOVE, ev)
  }
  if (ev.target.dataset.name === INFO) {
    setInfo(ev, styles)
  }
})

export default listPosts
