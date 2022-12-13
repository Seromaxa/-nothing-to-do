import Store from "./store";


class PostsStor extends Store {
    constructor(){
        super('posts',{posts:[],deleted:[],nextId:1})
       
    }
    removeOneItem(id){
        super.setState(prev=>({
            ...prev,
            posts:[...prev.posts.filter(item=>item.id !== id)],
            deleted:[...prev.deleted,...prev.posts.filter(item=>item.id === id)]
         }))
    }
    restoreItem (id){
        super.setState(prev=>({
            ...prev,
            deleted:[...prev.deleted.filter(item=>item.id !== id)],
            posts:[...prev.posts,...prev.deleted.filter(item=>item.id === id)]
         }))
    }
    fullRemoveItem(id){
        super.setState(prev=>({
            ...prev,
            deleted:[...prev.deleted.filter(item=>item.id !== id)]
        }))
    }
    getInfo(id){
        return this.state.posts.find(item=>item.id == id)
    }
    
}

const store = new PostsStor()

export default store