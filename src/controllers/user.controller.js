const { User } = require("../db/models");

const createUser = async (req, res) => {

    const datosUsuario = req.body;
    const usuarioCreado = await User.create(datosUsuario);
    res.status(201).json(usuarioCreado);
}

module.exports = {
    createUser  
}
