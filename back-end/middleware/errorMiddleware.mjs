//middleware = f(x)s that execute during the request response cycle

//change default express error handler
//to over-ride express default handler, you wanna pass in err, req, res, and next to call in further middleware
const errorHandler = (err, req, res, next) => {
    //create a status code variable
    const statusCode = res.statusCode ? res.statusCode : 500

    //res.status and pass in the statusCode
    res.status(statusCode)

    //respond with json
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export default errorHandler;