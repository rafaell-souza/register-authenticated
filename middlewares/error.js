import { definError } from "../custon-errors/errors-api.js"

export const errorApi = (
    error, request, response, next) => {

    const statusCode = error.statusCode || 500 
    const message = error.statusCode? error.message : 'Internal server error'
    return response.status(statusCode).json({message})
}