"use strict";

const AccessService = require("../serviecs/access.service");

class AccessController {
    signup = async (req, res, next) => {
        try{
            console.log(`[P]::signup::`, req.body)
            return res.status(201).json(await AccessService.signUp(req.body))
        } catch (error) {
            next(error)
        }

    }
}

module.exports = new AccessController()
