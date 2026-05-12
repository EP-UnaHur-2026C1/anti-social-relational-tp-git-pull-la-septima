const { User } = require("../db/models");

const createUser = async (req, res) => {

    const datosUsuario = req.body;
    const usuarioCreado = await User.create(datosUsuario);
    res.status(201).json(usuarioCreado);
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    const datosUsuario = req.body;
    const usuarioActualizado = await User.update(datosUsuario, {
        where: { id }
    });
    res.status(200).json(usuarioActualizado);
}

module.exports = {
    createUser,
    updateUser
}
