import styles from './header.module.css'

class Header {
    #el = document.createElement('header')
    #nav = document.createElement('nav')
    #items = []
    constructor(){
    this.styling = {
        conteiner:[styles.header],
        nav:[styles.navigation]
    }
    this.#init()
    }
    #init(){
        Object.keys(this.styling).map(item=>{
            if(item === 'conteiner'){
                this.styling[item].length > 0 ? this.styling[item].map(item=>this.#el.classList.add(item)):item
            }
            if(item === 'nav'){
                this.styling[item].length > 0 ? this.styling[item].map(item=>this.#nav.classList.add(item)):item
            }
        })
        this.#el.append(this.#nav)
    } 
    render(){
        this.#init()
        return this.#el
    }
    #addElement(el){
        if(!el.hasAttribute('id')){
            let index = this.#items.length
            let id = `${el.localName}_${index}`
            el.setAttribute('id',id)
        }
        this.#items.push(el.id)
    }
    addElToleftside(el){
      this.#addElement(el)
        this.#nav.before(el)
      
    }
    addElToNav(el){
        this.#addElement(el)
        this.#nav.appendChild(el)
    }
    removeEl(id){
        if(!this.#el.children[id]){
            if(!this.#nav.children[id]){
                return
            }
            this.#nav.children[id].remove()
            this.#items = this.#items.filter(item=>item !== id)
            return
        }
        this.#el.children[id].remove()
        this.#items = this.#items.filter(item=>item !== id)
    }
    getElement(id){
        if(!this.#el.children[id]){
            if(!this.#nav.children[id]){
                return
            }
            return this.#nav.children[id]
        }
        return this.#el.children[id]
    }
    get items(){
        return this.#items
    }
    get nav(){
        return this.#nav
    }
     
}

export default Header