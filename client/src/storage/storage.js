export function setInStorage(key, obj) {
    if(!key) {
        console.error('Error: Key is missing');
    }
    try {
        localStorage.setItem(key, JSON.stringify(obj));
    } catch(err) {
        console.log('Error : ', err);
    }
}

export function getFromStorage(key) {
    if(!key) {
        return null;
    }

    try {   
        const valueStr = localStorage.getItem(key);
        if(valueStr) {
            return valueStr;
        }
    } catch (err) {
        console.log('Error : getFromStorage is not key! ( ', err, ' )')
    }
}