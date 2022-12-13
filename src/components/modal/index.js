import styles from "./styles.module.css"


class Modal{
    el = document.createElement('div')
    wrapper = document.createElement('div')
    #name = 'modal'
    constructor(child){
     this.child = child  
     this.init()
     this.remove = this.remove.bind(this)
    }
    init(){
        window.addEventListener('keydown',this.#keyEscape.bind(this))
        this.el.classList.add(styles.modal) 
        this.el.setAttribute('data-name',this.#name)
        this.wrapper.classList.add(styles.child) 
        this.wrapper.appendChild(this.child) 
        this.el.appendChild(this.wrapper)
        this.el.addEventListener('click',this.#clickRemove)
    }
    #keyEscape(ev){
      if(ev.keyCode === 27)
      this.remove()
    }
    #clickRemove(ev){
        if(ev.target === this)
        this.remove()
    }
    render(){
      
        return this.el
    }
    remove(){
        window.removeEventListener('keydown',this.#keyEscape)
        this.el.removeEventListener('click',this.#clickRemove)
        this.el.remove()
    }

}

export default Modal