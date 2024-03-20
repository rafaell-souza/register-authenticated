const Sequelize = require('sequelize')

const db = new Sequelize('codespace', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

//it tests whether the connection is worling.


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