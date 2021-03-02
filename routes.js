const persons = require('./api/agenda')


const myFunctions = (app) => { app.use('/api/persons', persons) }

module.exports = myFunctions