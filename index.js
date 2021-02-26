const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())

const PORT = process.env.PORT || 3001

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));

const persons = [{
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
},
{
    id: 2,
    name: 'Laura Monsalve',
    number: '040-1234445445'
},
{
    id: 3,
    name: 'Laura Ramos',
    number: '040-144454456'
}

]

app.get('/', (req, res) => {
    res.send('Esta es la agenda de las Lauras')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const quantity = persons.length
    let date = new Date()
    res.send(`Phonebook has info for ${quantity} people <br> <br> ${date} `)
})

app.get('/api/persons/:id', (req, res) => {
    const { id } = req.params
    const person = persons.find(person => person.id === Number(id))
    if (person) { res.json(person) } else { res.status(404).end() }
})

app.delete('/api/persons/:id', (req, res) => {
    const { id } = req.params
    const personsFiltered = persons.filter(person => person.id !== Number(id))
    res.status(200).json(personsFiltered)
    //res.status(204).end()
})

app.post('/api/persons/', (req, res) => {
    const payload = req.body;
    if (!payload.name) {
        res.status(400).send({ error: "missing name" })
        return
    }

    if (!payload.number) {
        res.status(400).send({ error: "missing number" })
        return
    }

    if (persons.some((person) => person.name === payload.name)) {
        res.status(409).send({ error: "name must be unique" })
        return
    }

    const randomId = Math.floor(Math.random() * 1000)

    const newPerson = {
        id: randomId,
        ...payload
    }

    persons.push(newPerson)

    res.status(200).json(newPerson)

    const { id } = randomId

})


