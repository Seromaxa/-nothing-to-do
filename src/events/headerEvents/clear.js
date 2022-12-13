import store from "../../app/postStore";
import {trevelDom} from "../../utilts";
import listPosts from "../../conteiners/listPosts"
import { controller } from "../../conteiners/header";
import {eventController} from "../eventcontroller"






 function clear(){
    if(store.state.posts.length <= 1){
        return
    }
    eventController.toggle = false
    eventController.process = false
    let counter = store.state.posts.length
    let deley = 300
    store.setState(prev=>({...prev,deleted:[...prev.deleted,...prev.posts.splice(1,prev.posts.length -1)],posts:[prev.posts[0]]}))
    controller.setDeleted(store.state.deleted)
    listPosts.setLastItem(listPosts.render().firstElementChild)
  trevelDom(listPosts.render(),(el)=>{
        if(el.localName === 'li' && el !== listPosts.render().firstElementChild ){
          setInterval(()=>{
            el.classList.add('remove')
            setInterval(()=>{
               el.remove()
                         
              },deley)
           
          
          },counter * deley)
          counter--
    
        }
        
    }) 
    
 
}

export default clear