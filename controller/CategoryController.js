import { sequelize } from "../models/IndexModel";

const findCategoryBySQL = async(req,res)=>{
    const result = await sequelize.query("select cate_id,cate_name from category",{
        type : sequelize.QueryTypes.SELECT,
        model : req.context.models.Category,
        mapToModel : true
    });

    return res.send(result);
}

const findAllRows = async(req,res)=>{
    const result = await req.context.models.category.findAll();
    return res.send(result);
}

const cateProducts = async(req,res)=>{
    const result = await req.context.models.category.findAll({
        include : [{
            model : req.context.models.products
        }]
    });
    return res.send(result);
}

const findCategoryById = async(req,res)=>{
    const result = await req.context.models.category.findByPk(
        req.params.id
    );
    return res.send(result);
}

const createCateRow = async(req,res)=>{
    const {cate_id,cate_name} = req.body;
    const result = await req.context.models.category.create({
        cate_id : cate_id,
        cate_name : cate_name
    });
    return res.send(result);
}

// update category set cate_name = ${1} where cate_id = ${2}

const updateCateRow = async(req,res)=>{
    const {cate_name} = req.body;
    const result = await req.context.models.category.update(
        {cate_name : cate_name},
        {
            returning : true,
            where : {cate_id : req.params.id}
        }
        );
    return res.send(result);
}

// delete from category where cate_id=${id}

const deleteCateRow = async(req,res)=>{
    const id = req.params.id;
    const result = await req.context.models.category.destroy({
        where : {cate_id : id}
    }).then(result=>{
        return res.send(`delete ${result} rows.`)
    }).catch(error=>{
        return res.sendStatus(404).send(`Data not found.`)
    });
}

export default {
    findCategoryBySQL,
    findAllRows,
    findCategoryById,
    createCateRow,
    updateCateRow,
    deleteCateRow,
    cateProducts
}