const { User } = require("../db/models");

const createUser = async (req, res) => {
    try {
        const datosUsuario = req.body;
        const usuarioCreado = await User.create(datosUsuario);
        res.status(201).json(usuarioCreado);
    }catch(err)
    {
        res.status(500).json({message: `${err}`});
        return
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const datosUsuario = req.body;
        const usuarioActualizado = await User.update(datosUsuario, {
            where: { id }
        });
        res.status(200).json(datosUsuario);
        return 
    }catch(err)
    {
        res.status(500).json({message: `${err}`});
        return
    }
}

const deleteUser = async(req,res) => {
    try {
        const id = req.params.id;
        const usuario = await User.findByPk(id);
        const deleteUser = await User.destroy({where : {id}});
        res.status(200).json({message: `Usuario ${usuario.nickname} eliminado correctamente`}); 
        return 
    }catch(err)
    {
        res.status(500).json({message: `${err}`});
        return
    }
   
}

const getUserById = async(req, res) => {
    try {
        const id = req.params.id;
        const usuario = await User.findByPk(id);
        res.status(200).json(usuario);
        return
    }catch(err)
    {
        res.status(500).json({message: `${err}`});
        return
    }
}

const getAllUsers = async (_, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
        return
    }catch(err)
    {
        res.status(500).json({message: `${err}`});
        return
    }
}



module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    getAllUsers
}
