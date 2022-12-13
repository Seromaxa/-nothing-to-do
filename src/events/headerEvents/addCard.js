import { ROOT_API } from "../../constants";
import Card from "../../components/card";
import store from "../../app/postStore"
import { deley } from "../../utilts";
import {fetcher} from "../../api/fetch"
import listPosts from "../../conteiners/listPosts"

async function addCard (){

const {nextId} = store.state
const card = new Card()
listPosts.append(card.render())
if(nextId >= 100){
    store.setState(prev=>({
        ...prev,
        nextId:1
    }))
}
store.setState(prev=>({...prev,nextId:prev.nextId + 1}))

try {
    const res = await fetcher(ROOT_API + `/${nextId}`)
    if(!res.ok){
        throw new Error('Something wrong try later')
    }
    const data = await res.json()

    store.setState(prev=>({...prev,posts:[...prev.posts,data]}))
    
    await deley()
    card.setData(data)
      
} catch (error) {
    card.setData({title:error.message})
    await deley()
    card.remove()
    
}

}


export default addCard