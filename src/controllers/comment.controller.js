const { Comment } = require('../db/models');

const createComment = async (req, res) => {
    try {
        const { comentario } = req.body;
        const { id_post , id_user} = req.params;

        const craeteComment = await Comment.create({
            comentario,
            fecha_publicacion : new Date(),
            visible : true,
            id_user,
            id_post
        })

        res.status(201).json(comentario)
        return 

    }catch(err){
        res.status(500).json({message: `${err}`});
        return  
    }
}

module.exports = {
    createComment
}