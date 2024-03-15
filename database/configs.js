const Sequelize = require('sequelize')

const db = new Sequelize('codespace', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

//testing whether the connection is working
async function testDb() {
    try {
        await db.authenticate()
        console.log('Connection to the database successfully created.')

   } catch (error) {
        console.error('Connection failed.', error)
    }
}
testDb()


module.exports = db