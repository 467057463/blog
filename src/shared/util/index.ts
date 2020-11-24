export function generateMongoUri(user, pass, dbName){
  return `mongodb://${user}:${pass}@localhost/${dbName}`
}