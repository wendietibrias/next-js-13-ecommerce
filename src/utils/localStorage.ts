
export const setItemLocalstorage = (name : string , data : any) => {
    return localStorage.setItem(name , JSON.stringify(data));
}