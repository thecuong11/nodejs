"use strict";

const bcrypt = require('bcrypt')
const shopModel = require('../models/shop.model')
const crypto = require('crypto')
const KeyToKenService = require("./keyToken.service");
const {createToKenPair} = require("../auth/authUtils");
const RoleShop = {
    SHOP: 'SHOP',
    WRITE: 'WRITE',
    EDITOR: 'EDITOR'
}
class AccessService {
    static signUp = async ({name, email, password}) => {
        try{
            // Step1: check email exists?

            // const holderShop = await shopModel.findOne({email}).lean()
            // if (holderShop) {
            //     return {
            //         code: 'xxxx',
            //         message: 'Shop already registered!'
            //     }
            // }

            const passwordHash = await bcrypt.hash(password, 10)

            console.log('passmahoa::', passwordHash)

            const newShop = await shopModel.create({
                name, email, password: passwordHash, roles: [RoleShop.SHOP]
            })

            // if (newShop){
            //     // Create privateKey, publicKey
            //     const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
            //         modulusLength: 4096
            //     })

                // console.log({privateKey, publicKey}) //Save connection KeyStore

                // const publicKeyString = await KeyToKenService.createKeyToKen({
                //     userId: newShop._id,
                //     publicKey
                // })
                //
                // if (!publicKeyString) {
                //     return {
                //         code: 'xxxx',
                //         message: 'publicKeyString error'
                //     }
                // }
                //
                // // create token pair
                // const tokens = await createToKenPair({userId: newShop._id, email}, publicKey, privateKey)
                // console.log('Created Token Success::', tokens)
                //
                // return {
                //     code: 201,
                //     metadata: {
                //         shop: newShop,
                //         tokens
                //     }
                // }
            // }

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