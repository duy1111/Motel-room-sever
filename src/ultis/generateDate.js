import moment from "moment"


const formatDate = (timeObject) => {
    let day = timeObject.getDay() === 0 ? 'Chủ nhật' : `Thứ ${timeObject.getDay() + 1}`
    let date = `${timeObject.getDate()}/${timeObject.getMonth()+1}/${timeObject.getFullYear()}`
    let time = `${timeObject.getHours()}:${timeObject.getMinutes()}`
    return `${day} ${time} ${date}`
    
}
const generateDate = () => {
    let gapExpire = Math.ceil(Math.random()*29 +1)
    let today = new Date()
    let expireDay = moment(today).add(gapExpire,'d').toDate()
    return {
        today :  formatDate(today),
        expireDay : formatDate(expireDay)
    }
}
export default   generateDate
