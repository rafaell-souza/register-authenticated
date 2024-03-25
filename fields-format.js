const passLength = /^.{8,12}$/
const passFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[><=&%$#@!\+\?\*\(\)\.,\[\]\-_\^`~\/\\])/

const emailLength = /^.{5,250}@/
const emailFormat = /^[a-zA-Z0-9._%+-]{5,250}@(gmail)\.(com)$/

const nameLength = /^.{6,40}$/
const nameFormat = /^[a-zA-Z\s]+$/

const numberFormats = /^\(\d{3}\)\s?\d{3}-\d{4}$/

const regex = {
passFormat, passLength, nameFormat, nameLength, numberFormats, 
emailFormat, emailLength
}
export default regex