export function getUserLanguage(){
    let res = navigator.language
    if (!(res.startsWith('de') || res.startsWith('en')))
        return 'en'
    return res.substring(0, 2)
}