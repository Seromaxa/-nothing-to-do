import List from "../../components/list"
import Modal from "../../components/modal"
import store from "../../app/postStore"
import Card from "../../components/card"
import listPosts from "../../conteiners/listPosts"
import styles from "../../styles/deleteList.module.css"
import deleteCard from "../listEvents/deleteCard"
import {
  RESTORE,
  FULLREMOVE,
  FULL_DEL,
  DEL_TEXT,
  RESTORE_TEXT,
} from "../../constants"

export function showDeleted() {
  const { deleted } = store.state

  const listDeleted = new List({
    arr: deleted,
    info: { text: RESTORE_TEXT, data: RESTORE },
    del: { text: DEL_TEXT, data: FULL_DEL },
    cardStyles: {
      conteiner: { names: [styles.card], add: false },
      title: { names: [styles.title], add: false },
      body: { names: [styles.body], add: false },
    },
    rootStyles: {
      list: {
        names: [styles.list],
        add: false,
      },
      li: {
        names: [styles.item],
      },
    },
  })

  listDeleted.addEvent("click", function restoreing(ev) {
    if (ev.target.dataset.name === RESTORE) {
      const id = deleteCard(RESTORE, ev)
      const data = store.state.posts.find((item) => item.id == id)
      const card = new Card(data)
      listPosts.append(card.render())
    }
    if (ev.target.dataset.name === FULL_DEL) {
      deleteCard(FULLREMOVE, ev)
    }
    if (!store.state.deleted.length) {
      listDeleted.remove()
      modal.remove()
    }
  })

  const modal = new Modal(listDeleted.render())
  document.body.appendChild(modal.render())
}
