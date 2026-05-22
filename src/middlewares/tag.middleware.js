const {validateId, validateSchema} = require("./generic.middleware");
const {Tag} = require("../db/models")
const {tagSchema} = require("../schemas/tag.schema")

const validateTagId = validateId(Tag)

const validateSchemaTag = validateSchema(tagSchema)

module.exports = {
    validateTagId, validateSchemaTag
}