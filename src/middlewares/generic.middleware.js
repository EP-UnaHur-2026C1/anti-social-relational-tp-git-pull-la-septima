const validateId = (modelo) => {
    return async(req, res, next) => {
        try{
            const {id} = req.params
            if(isNaN(id)||parseInt(id) <= 0){
                res.status(400).json({message: 'El id debe ser un numero válido'})
                return
            }
            const instance = await modelo.findByPk(id)
            if (!instance){
                res.status(404).json({message: `El id ${id} no fue encontrado`})
                return
            }
        }catch(err){
            res.status(500).json(`${err}`)
            return
        }
        next()
    }
}

const validateSchema = (Schema) => {
    return (req, res, next) => {
        const{error} = Schema.validate(req.body, {
            abortEarly:false
        })
        if(error){
            const errorMsj = error.details.map(e => e.message)
            res.status(400).json(errorMsj)
            return
        }
        next()
    }
}

module.exports = {
    validateId,
    validateSchema
}