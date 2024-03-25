import 'dotenv/config'
import Sequelize from 'sequelize'


const connection = new Sequelize(process.env.DATABASE, process.env.USER, '', {
    host: process.env.HOST,
    dialect: process.env.DIALECT
})

//it tests whether the connection is worling.
/*
async function testDb() {
    try {
        await connection.authenticate()
        console.log('Connection to the database successfully created.')

   } catch (error) {
        console.error('Connection failed.', error)
    }
}
testDb() */
export default connection