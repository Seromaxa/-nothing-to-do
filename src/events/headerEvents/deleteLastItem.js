import listPosts from "../../conteiners/listPosts"
import store from "../../app/postStore"
import {REMOVE} from "../../constants"
import {controller} from "../../conteiners/header"



function deleteLastItem(){
    const lastitem = listPosts.render().children[listPosts.render().children.length - 1]
    const id = store.state.posts[store.state.posts.length - 1]?.id
     if(!id || !lastitem){
        return
     }
    lastitem.classList.add(REMOVE)
    setInterval(()=>{lastitem.remove()},300)
    store.removeOneItem(id)
    controller.setDeleted(store.state.deleted)
}

export default deleteLastItem