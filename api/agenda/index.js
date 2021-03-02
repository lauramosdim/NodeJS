const { Router } = require('express')
const router = new Router()
const controller = require('./agenda.controller')

// router.get('/', (req, res) => {
//     res.json({ msj: 'Esta es la agenda de las Lauras' })
// })

router.get('/', controller.getPersons)

// router.get('/info', (req, res) => {
//     const quantity = persons.length
//     let date = new Date()
//     res.send(`Phonebook has info for ${quantity} people <br> <br> ${date} `)
// })

router.get('/:id', controller.getPersonById)

router.delete('/:id', controller.deletePerson)

router.post('/', controller.postPerson)

module.exports = router



