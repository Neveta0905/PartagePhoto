const rateLimit = require('express-rate-limit')

const limiter = (minutes,maxrequest) => rateLimit({
    windowMs: minutes * 60 * 1000, // 15 minutes
    max: maxrequest, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (request, response, next, options) =>
        response.status(429).json({error:'Too many connexions'}),
})

module.exports = limiter