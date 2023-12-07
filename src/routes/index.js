"use strict";

const express = require('express')
const {apiKey} = require('../auth/checkAuth')
const {permission} = require('../auth/checkAuth')
const router = express.Router()

// Check apikey
router.use(apiKey)

// Check permission
router.use(permission('0000'))

router.use('/v1/api', require('./access'))

module.exports = router