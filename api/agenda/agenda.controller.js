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

const getPersons = (req, res) => {
    res.json(persons)
}

const getPersonById = (req, res) => {
    const { id } = req.params
    const person = persons.find(person => person.id === Number(id))
    if (person) { res.json(person) } else { res.status(404).end() }
}

const deletePerson = (req, res) => {
    const { id } = req.params
    const personsFiltered = persons.filter(person => person.id !== Number(id))
    res.status(200).json(personsFiltered)
    //res.status(204).end()
}

const postPerson = (req, res) => {
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

}

module.exports = {
    getPersons,
    getPersonById,
    deletePerson,
    postPerson
}