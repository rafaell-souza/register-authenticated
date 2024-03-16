const { GetOne, GetAll } = require('./rules/read')
const { updateAll, updateSome } = require('./rules/update')
const { create } = require('./rules/create')
const { exclude } = require('./rules/delete')


module.exports = {
GetAll, GetOne, updateAll, updateSome, exclude, create}