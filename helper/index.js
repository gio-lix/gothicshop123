import cookie from 'cookie'


export function cookieParse (req) {
    return cookie.parse(req ? req.headers.cookie || '' : ' ')

}
export const currency = (item) => {
    return parseFloat(item).toFixed(2)
}
export const checkIndexSize = (num) => {
    switch (num) {
        case 'XS':
            return 0
        case 'L':
            return 1
        case 'S':
            return 2
        case 'XL':
            return 3
        case 'M':
            return 4
        case 'XXL':
            return 5
    }
}
export const checkIndexType = (num) => {
    switch (num) {
        case 0:
            return 'XS'
        case 1:
            return 'L'
        case 2:
            return 'S'
        case 3:
            return 'XL'
        case 4:
            return 'M'
        case 5:
            return 'XXL'
    }
}
export  function translateCl(item) {
    switch (item) {
        case 'მაისურები':
            return 't-shirts'
        case 'კაპიუშონი':
            return 'hoodies-cardigans'
        case 'შარვარი-შორტები':
            return 'trousers-shorts'
        case 'ქურთუკები':
            return 'coats-jackets'
        case 'კაბები':
            return 'dresses-skirts'
        default:
            return item
    }
}
export  function translateSho(item) {
    switch (item) {
        case 'ფეხსაცმელი':
            return 'boots'
        case 'კრიპერი':
            return 'creepers'
        case 'სანდალი':
            return 'sandals'
        case 'სნიკერსი':
            return 'sneakers'
        case 'ქუსლიანი':
            return 'heels'
        default:
            return item
    }
}