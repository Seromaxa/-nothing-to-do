import styling from './styles.module.css'
import {INFO,DEL,INFO_TEXT,DEL_TEXT} from "../../constants"
// type styles = {
//     skeleton:{
//         names:string[],
//         add:boolean
//     }
//     conteiner:{
//         names: string[],
//         add:boolean
//     },
//     title:{
//         names:string[],
//         add:boolean
//     }
//     body:{
//         names:string[],
//         add:boolean
//     }
//     buttonConteiner:{
//         names:string[],
//         add:boolean
//     }
//     buttonInfo:{
//         names:string[],
//         add:boolean
//     }
//     buttonDelete:{
//         names:string[],
//         add:boolean
//     }
// }

// type info && del = {
//     text:string 
//     data:string
// }


class Card {
    el = document.createElement('div')
    del = document.createElement('button')
    info = document.createElement('button')
    id
    delEvents = []
    infoEvents = []
    constructor(data,info,del,styles){
        this.infoOptions = info
        this.delOptions = del
        this.skeleton = true
        this.data = data
        this.defaultStyles = {
            skeleton:[styling.skeleton],
            conteiner:[styling.conteiner],
            title:[styling.title],  
            body:[styling.body],
            buttonConteiner:[styling.button_conteiner],
            buttonInfo:[styling.button],
            buttonDelete:[styling.button]
        }
        this.styles = styles
        this.init()
        this.remove = this.remove.bind(this)
        
       
    }
    init(){
      this.title = document.createElement('h5')
      this.body = document.createElement('p')
      this.toggles = document.createElement('div')
      this.el.setAttribute('data-name','card')
      if(this.data){
        this.id = this.data.id
        this.title.textContent = this.data.title
        this.body.textContent = this.data.body
        this.info.setAttribute('data-name',this.infoOptions?.data || INFO)
        this.del.setAttribute('data-name', this.delOptions?.data || DEL)
        this.el.setAttribute('id',this.id)
        this.skeleton = false
      }

      if(this.skeleton){
        this.el.classList.add(this.defaultStyles.skeleton.join(' '))
      }


      this.info.textContent = this.infoOptions?.text || INFO_TEXT
      this.del.textContent = this.delOptions?.text || DEL_TEXT
      
      this.toggles.appendChild(this.info)
      this.toggles.appendChild(this.del)
      
      this.el.appendChild(this.title)
      this.el.appendChild(this.body)
      this.el.appendChild(this.toggles)
      this.#setStyles()
    }  
    #setStyles(){
        if(this.styles){

        Object.keys(this.styles).map(item=>{
            this.defaultStyles[item] = this.styles[item].add ? this.defaultStyles[item].concat(this.styles[item].names):this.styles[item].names
        })
        }
         const {conteiner,title,body,buttonConteiner,buttonDelete,buttonInfo} = this.defaultStyles
   
         this.#listStyle(conteiner,this.el)
         this.#listStyle(title,this.title)
         this.#listStyle(body,this.body)
         this.#listStyle(buttonConteiner,this.toggles)
         this.#listStyle(buttonDelete,this.del)
         this.#listStyle(buttonInfo,this.info)
    }
    #listStyle(arr,el){
        el.classList.forEach(item=>item !== this.defaultStyles.skeleton[0]?el.classList.remove(item):item)
        arr.map(item=>el.classList.add(item))
       
    }
    setData(value){
        this.data = value
        this.id = value.id
        this.del.setAttribute('data-name','delete')
        this.info.setAttribute('data-name','info')
        this.el.setAttribute('id',this.id)
        this.title.textContent = this.data.title
        this.body.textContent = this.data.body
       
        this.el.classList.remove(styling.skeleton)
           
    }
    setStyles(value){
        this.styles = value
        this.#setStyles()
    }
  
    render(){
        return this.el
    }

    addLisnetDel(ev,fn){
        this.del.addEventListener(ev,fn)
        this.delEvents.push({ev,callback:fn})
    }
    addLisnetInfo(ev,fn){
        this.info.addEventListener(ev,fn)
        this.infoEvents.push({ev,callback:fn})
    }
    removeDel(){
        this.delEvents.map(item=>this._del.removeEventListener(item.ev,item.callback))
        this.delEvents = []
        this.del.remove()
    }
    removeInfo(){
        this.infoEvents.map(item=>this._info.removeEventListener(item.ev,item.callback))
        this.infoEvents = []
        this.info.remove()
    }
    removeTogler(){
        this.delEvents.map(item=>this._del.removeEventListener(item.ev,item.callback))
            this.infoEvents.map(item=>this._info.removeEventListener(item.ev,item.callback))
            this.delEvents = []
            this.infoEvents = []
            this.toggles.remove()
    }
    remove(){
            this.delEvents.map(item=>this._del.removeEventListener(item.ev,item.callback))
            this.infoEvents.map(item=>this._info.removeEventListener(item.ev,item.callback))
            this.delEvents = []
            this.infoEvents = []
            this.el.remove()     
    }
}


export default Card