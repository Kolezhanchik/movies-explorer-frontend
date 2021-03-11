export default class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    getInitialCards(path=''){
        
        return fetch(`${this._url}/${path}`,{
            method: 'GET',
            headers: this._headers,
        })
        .then((res) => {
            if(res.ok) {  return res.json(); }
            
            return Promise.reject(`Error happen ${res.status}`)
        })
        
    }
}

