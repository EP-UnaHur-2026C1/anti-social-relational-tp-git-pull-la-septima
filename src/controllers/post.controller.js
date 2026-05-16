const { Post, Post_Images } = require("../db/models");

const createPost = async (req, res) => {
    try {
        const { texto, images } = req.body
        const id_user = req.params.id_user
        const postCreado = await Post.create({
            texto, 
            fechaPublicacion: new Date(),
            id_user
        });

        for (const img of images) { 
            const url = img.url_image;
            await Post_Images.create({ url_image: url, id_post: postCreado.id });
        }
      
      const resultado = await Post.findByPk(postCreado.id, { include : ['images']});

      res.status(201).json(resultado)

    }catch(err)
    {
        res.status(500).json({message: `${err}`});
        return
    }
}

module.exports = {
    createPost
}