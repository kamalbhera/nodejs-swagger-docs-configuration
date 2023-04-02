const express = require('express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const app = express();

const PORT = 3000

let bookArray = [{
        id: 1,
        title: "Notes title"
    }]

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Library API",
            version: "1.0.0"
        }
    },
    apis: ['app.js'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

/**
 * @swagger
 * /notes:
 *   get:
 *     description: Get all notes
 *     responses:
 *       200:
 *         description: Success
 */
app.get('/notes', (req, res) => {
    res.send(bookArray)
})

/**
 * @swagger
 * /notes:
 *   post:
 *     description: create new book
 *     parameters: 
 *     - name: title
 *       description: title of the book
 *       in: query
 *       type: String
 *     responses:
 *       201:
 *         description: Created
 */
app.post('/notes', (req, res) => {
    console.log(req.query)
    bookArray.push({
        id: bookArray[bookArray.length - 1].id + 1,
        title: req.query.title
    })
    res.status(201).send(bookArray)
})


app.listen(PORT, () => {
    console.log("App listening on", PORT)
})