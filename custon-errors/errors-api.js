export class definError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

export class BadRequestError extends definError {
    constructor(message) {
        super(message, 400)
    }
}

export class NotFoundError extends definError {
    constructor(message) {
        super(message, 404)
    }
}

export class UnauthorizedError extends definError {
    constructor(message) {
        super(message, 401)
    }
}