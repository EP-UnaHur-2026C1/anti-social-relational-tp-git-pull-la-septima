const { User } = require("../db/models");

const createUser = async (req, res) => {

    const datosUsuario = req.body;
    const usuarioCreado = await User.create(datosUsuario);
    res.status(201).json(usuarioCreado);
}

const updateUser = async (req, res) => {
    const nickname = req.params.nickname;
    const datosUsuario = req.body;
    const usuarioActualizado = await User.update(datosUsuario.nickname, {
        where: { nickname }
    });
    res.status(200).json(datosUsuario);
    return 
}

const deleteUser = async(req,res) => {
    try {
        const nickname = req.params.nickname;
        const deleteUser = await User.destroy({where : {nickname}});
        res.status(200).json(nickname);
        return 
    }catch{
        return res.status(500).json({message: "error interno del servidor "});
    }
    
}

module.exports = {
    createUser,
    updateUser,
    deleteUser
}
