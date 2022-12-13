import { DELEY } from "../constants"

export function trevelDom(el,callback){
    callback(el)
    el = el.firstElementChild
    while(el){
      trevelDom(el,callback)
      el = el.nextElementSibling
      
    }
}

export function deley(){
  return new Promise(res=>setTimeout(res,DELEY))
}

