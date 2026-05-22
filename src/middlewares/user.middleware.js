const {validateId, validateSchema} = require("./generic.middleware");
const {User} = require("../db/models")
const {userSchema} = require("../schemas/user.schema")

const validateUserId = validateId(User)

const validateSchemaUser = validateSchema(userSchema)

module.exports = {
    validateSchemaUser,
    validateUserId
}