const generateCode = (length) => {
    let character = 'QWERTYUIOPASDFGHJKLZXCVBNM'
    let numbers = '123456789'
    let code = ''
    for(let i = 0 ;i<length -1 ;i++){
        code +=character.charAt(Math.floor(Math.random()*character.length))
    }
    return `${code}${numbers.charAt(Math.random()*numbers.length)}`
}
export default generateCode