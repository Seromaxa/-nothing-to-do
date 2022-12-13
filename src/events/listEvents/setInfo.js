import Modal from "../../components/modal"
import Card from "../../components/card"
import store from "../../app/postStore"
import { getID } from "../getID"



function setInfo (ev,styles){
    const id = +getID(ev)
    ev.target.blur()
    const data = store.getInfo(id) 
    const card = new Card (data)
    card.removeTogler()
    card.setStyles({
       conteiner:{names:[styles.conteiner],add:false},
       title:{names:[styles.title],add:false},
       body:{names:[styles.body],add:false}
    
    })
    const modal = new Modal(card.render())
    document.body.appendChild(modal.render())
   
    
}

export default setInfo