
class Controller{
    #toggle = false
    #process = false
    #deleted = false

    get toggle(){
        return this.#toggle
    }
   get process(){
    return this.#process
   }
   get deleted(){
    return this.#deleted
   }
   set toggle(val){
    if(typeof val !== 'boolean' ){
        return
    }
    this.#toggle = val
   }
   set process(val){
    if(typeof val !== 'boolean' ){
        return
    }
    this.#process = val
   }
   setControledElem(el){
    this.controled = el
   }
   setArr(arr){
    this.arr = arr
    this.#deleted = !!this.arr.length
   }
    setDeleted(arr){
        this.arr = arr
        this.#deleted = !!this.arr.length
     
        const event = new CustomEvent('del',{detail:{
            toggle:this.#deleted
        }})
        this.controled.dispatchEvent(event)

    }
  
}



export default Controller