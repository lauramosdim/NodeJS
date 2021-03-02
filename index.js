const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())

app.use(cors())

const PORT = process.env.PORT || 3001

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));

const routesConfig = require('./routes')

routesConfig(app)
