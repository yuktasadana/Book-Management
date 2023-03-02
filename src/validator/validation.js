const valid = function (data){
    if(typeof(data)===undefined || typeof(data)===null) { return false}
    if(typeof (data) ==="string" && data.trim().length>0) {return true}
}
const validISBN = function(ISBN){
    // return /^(97(8|9))?\d{9}(\d|X)$/.test(ISBN);
    return /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(ISBN)
}
const validEmail=function(email){
    // const emailRegex=/\S+@\S+\.\S+/
     const emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-][a-z]{1,4}$/
    return emailRegex.test(email)
}
const validMobile=function(mobile){
    const mobileRegex=/^[6789]\d{9}$/

    return mobileRegex.test(mobile)
}
const validReleasedAt = function (releasedAt) {
    return /((\d{4}[\/-])(\d{2}[\/-])(\d{2}))/.test(releasedAt)
}
const ValidName=function(name){
    const nameRegex=/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    return nameRegex.test(name)
}
const isValid = function (value) {
    if (typeof (value) === undefined || typeof (value) === null) { return false }
    if (typeof (value) === "string" && value.trim().length > 0) { return true }
    if (typeof (value) === "number" && value.toString().trim().length > 0) { return true }
}
const isValidObjectId = function (objectId) {
    return /^[0-9a-fA-F]{24}$/.test(objectId)
}
const isValidPincode = function (data) {
  const pincodeRegex = /^[0-9]{6}$/;
  return pincodeRegex.test(data);
}

module.exports = {valid,validEmail,validISBN,validMobile,validReleasedAt,ValidName,isValid,isValidObjectId,isValidPincode}