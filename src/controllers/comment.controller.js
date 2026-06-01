const { Comment } = require('../db/models');
const MESES_VISIBILIDAD = parseInt(process.env.MESES_VISIBILIDAD || '6', 10);

const createComment = async (req, res) => {
    try {
        const { comentario } = req.body;
        const { id_post , id_user} = req.params;

        await Comment.create({
            comentario,
            fecha_publicacion : new Date(),
            visible : true,
            id_user,
            id_post
        })

        res.status(201).json({message: "El comentario fue agregado correctamente"});
        return 

    }catch(err){
        res.status(500).json({message: `${err}`});
        return  
    }
}

const getCommentsByPost = async (req, res) => {
    try {
        const id_post = req.params.id_post;
        const comments = await Comment.findAll({ where: { id_post, visible: true } });
        res.status(200).json(comments);
        return 
    } catch (err) {
        res.status(500).json({ message: `${err}` });
        return 
    }
};

const deleteComment = async (req, res) => {
    try {
        const id = req.params.id;
        const comment = await Comment.findByPk(id);
        const textoComment = comment.comentario;
        await comment.destroy();
        res.status(200).json({ message: `El Comentario: ${textoComment} eliminado` });
        return 
    } catch (err) {
        res.status(500).json({ message: `${err}` });
        return 
    }
};


const updateComment = async (req, res) => {
    try {
        const id = req.params.id;
        const { comentario } = req.body;
        const comment = await Comment.findByPk(id);
        await comment.update({ comentario });
        res.status(200).json({ message: `El Comentario: ${comment.comentario} actualizado` });
        return 
    } catch (err) {
        res.status(500).json({ message: `${err}` });
        return 
    }
};

const updateVisibilityByMonth = async (req, res) => {
    try {
        const mes = (req.body && req.body.mes) ? req.body.mes : MESES_VISIBILIDAD;
        const comments = await Comment.findAll();

        const promises = comments.map(async (comment) => {
            const visible = comment.antiguedadMes < mes;
            return Comment.update({ visible }, { where: { id: comment.id } });
        });

        await Promise.all(promises);
        return res.status(200).json({ message: "Comentarios actualizados", mesesUsados: mes });
    } catch (err) {
        return res.status(500).json({ message: `${err}` });
    }
};


module.exports = {
    createComment,
    getCommentsByPost,
    deleteComment,          
    updateComment,
    updateVisibilityByMonth,
}