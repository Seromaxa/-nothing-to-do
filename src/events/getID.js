
export function getID (ev){
    return ev.path.filter(item=>item.dataset?.name === 'card')[0].id
}