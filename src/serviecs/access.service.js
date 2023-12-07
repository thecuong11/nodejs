"use strict";

const bcrypt = require('bcrypt')
const shopModel = require('../models/shop.model')
const crypto = require('crypto')
const KeyToKenService = require("./keyToken.service");
const {createToKenPair} = require("../auth/authUtils");
const {getInfoData} = require('../utils')
const RoleShop = {
    SHOP: 'SHOP',
    WRITE: 'WRITE',
    EDITOR: 'EDITOR'
}
class AccessService {
    static signUp = async ({name, email, password}) => {
        try{
            // Step1: check email exists?

            const holderShop = await shopModel.findOne({email}).lean()
            if (holderShop) {
                return {
                    code: 'xxxx',
                    message: 'Shop already registered!'
                }
            }

            const passwordHash = await bcrypt.hash(password, 10)

            console.log('passmahoa::', passwordHash)

            const newShop = await shopModel.create({
                name, email, password: passwordHash, roles: [RoleShop.SHOP]
            })

            if (newShop){

                const privateKey = crypto.randomBytes(64).toString('hex')
                const publicKey = crypto.randomBytes(64).toString('hex')

                console.log({privateKey, publicKey}) //Save connection KeyStore

                const keyStore = await KeyToKenService.createKeyToKen({
                    userId: newShop._id,
                    publicKey,
                    privateKey
                })

                if (!keyStore) {
                    return {
                        code: 'xxxx',
                        message: 'keyStore error'
                    }
                }

                // create token pair
                const tokens = await createToKenPair({userId: newShop._id, email}, publicKey, privateKey)
                console.log('Created Token Success::', tokens)

                return {
                    code: 201,
                    metadata: {
                        shop: getInfoData({ fileds: ['_id', 'name', 'email'], object: newShop}),
                        tokens
                    }
                }
            }

            return {
                code: 200,
                metadata: null
            }

        } catch (error) {
            return {
                code:'xxx',
                message: error.message,
                status: 'error access'
            }
        }
    }
}

module.exports = AccessService