import { sendStatus } from "express/lib/response";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import UpDownloadHelper from "../helpers/UpDownloadHelper";

const findAllRows = async (req, res) => {
  try {
    const result = await req.context.models.products.findAll();
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404).send("no data found.");
  }
};

const createRows = async (req, res) => {
  // process.cwd return value working directory
  // __dir return value module directory
  const uploadDirect = process.cwd() + "/storages";

  const options = {
    multiples: true,
    keepExtensions: true,
    uploadDir: uploadDirect,
    maxFileSize: 50 * 1024 * 1024, // 5MB
  };

  // object formidable
  const form = formidable(options);

  // onpart untuk override stream sebelum di write ke folder
  form.onPart = function (part) {
    if (!part.filename || part.filename.match(/\.(jpg|jpeg|png)$/i)) {
      this.handlePart(part);
    } else {
      form._error(new Error("File type is not supported"));
    }
  };

  form.parse(req, async (error, fields, files) => {
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
        error: null, // error.stack klo mau diisi
      });
    }

    if (files.uploadFile.length > 1) {
      return res.status(400).json({
        status: "error",
        message: "only one file allowed",
        error: null,
      });
    }

    const uploadFile = files.uploadFile.path;
    const seq = path.sep;
    const urlImage = uploadFile
      .substr(uploadFile.lastIndexOf(seq), uploadFile.length)
      .replace(seq, "");

    const attributes = fields;

    try {
      const result = await req.context.models.products.create({
        prod_name: fields.prod_name,
        prod_price: fields.prod_price,
        prod_desc: fields.prod_desc,
        prod_rating: parseInt(fields.prod_rating),
        prod_view_count: parseInt(fields.prod_view_count),
        prod_user_id: parseInt(fields.prod_user_id),
        prod_cate_id: parseInt(fields.prod_cate_id),
        prod_stock: parseInt(fields.prod_stock),
        prod_url_image: urlImage,
      });

      return res.send(result);
    } catch (error) {
      return res.status(404).json({
        status: "Failed",
        message: "",
        error: error,
      });
    }
  });
};

const updateProduct = async (req, res) => {
  try {
    const singlePart = await UpDownloadHelper.uploadSingleFile(req);
    const { attrb: { file, fields, filename }, status: { status } } = singlePart;
    if (status === "succeed") {
      try {
        const result = await req.context.models.products.update(
          {
            prod_name: fields.prod_name,
            prod_price: fields.prod_price,
            prod_desc: fields.prod_desc,
            prod_rating: parseInt(fields.prod_rating),
            prod_view_count: parseInt(fields.prod_view_count),
            prod_user_id: parseInt(fields.prod_user_id),
            prod_cate_id: parseInt(fields.prod_cate_id),
            prod_stock: parseInt(fields.prod_stock),
            prod_url_image: filename,
          },
          { returning: true, where: { prod_id: parseInt(req.params.id) } }
        );

        return res.send(result);
      } catch (error) {
        return res.sendStatus(404).send(error);
      }
    }
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const createProductImage = async(req,res,next)=>{
    try {
        const multipart = await UpDownloadHelper.uploadMultipleFile(req);
        const { attrb: { files, fields }, status: { status } } = multipart
        try {
            const result = await req.context.models.products.create({
              prod_name: fields.prod_name,
              prod_price: fields.prod_price,
              prod_desc: fields.prod_desc,
              prod_rating: parseInt(fields.prod_rating),
              prod_view_count: parseInt(fields.prod_view_count),
              prod_user_id: parseInt(fields.prod_user_id),
              prod_cate_id: parseInt(fields.prod_cate_id),
              prod_stock: parseInt(fields.prod_stock),
              prod_url_image: ""
            });

            // simpan prodId di object req
            req.prodId = result.dataValues.prod_id;
            req.files = files;
            next();

        } catch (error) {
          
        }
        
    } catch (error) {
      
    }
}

const findProdById = async (req,res) => {
  try {
    const prodId = req.params.id
    const result = await req.context.models.products.findAll({
      where : {prod_id : parseInt(prodId)}
    }) 
    return res.send(result)
  } catch (error) {
    return res.sendStatus(404).send('No Data Found')
  }
}

export default {
  findAllRows,
  createRows,
  updateProduct,
  createProductImage,
  findProdById
};
