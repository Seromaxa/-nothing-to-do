
class Store{
  constructor(name,state){
    this._name = name
    this._state = state
    this.#init()
  }
  #setItem(){
    localStorage.setItem(this._name,JSON.stringify(this._state))
  }
  #init(){
    for(let i = 0; i < localStorage.length;i++){
        if(localStorage.key(i) === this._name){
            this._state = JSON.parse(localStorage.getItem(localStorage.key(i)))
            return
        }
    
    }
    this.#setItem()
  }

  setState(val){
    if(typeof val === 'function'){
      this._state = val(this._state)
      this.#setItem()
      return
    }
    localStorage.setItem(this.name,JSON.stringify(val))
  }  

  get state(){
    return this._state
  }

}

export default Store