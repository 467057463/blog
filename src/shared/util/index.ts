export function generateMongoUri(user, pass, dbName){
  return `mongodb://${user}:${pass}@localhost/${dbName}`
}

export function resSuccess(message, data){
  return{
    code: 0,
    message,
    data
  }
}

export function resError(message, code = -1){
  return{
    code,
    message,
    data: null
  }
}