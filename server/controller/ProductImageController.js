
const createProductImage = async(req,res,next)=>{
    const files = req.files;
    const prodId = req.prodId;

    const rowImages = files.map(el =>{
        return {...el,prim_prod_id : prodId}
    });
    
    try {
        const result = await req.context.models.product_images.bulkCreate(
            rowImages
        );

        req.prodId = prodId
        next();

    } catch (error) {
        return res.sendStatus(404).send(error)
    }
}

const findProdImagesById = async(req,res)=>{
    const prodId = req.prodId;
    
    try {
        const result = await req.context.models.product_images.findAll(
            {where : {prim_prod_id : parseInt(prodId)}}
        );
        return res.send(result);

    } catch (error) {
        return res.send(404).send(error)
    }
}

export default {
    createProductImage,
    findProdImagesById
}