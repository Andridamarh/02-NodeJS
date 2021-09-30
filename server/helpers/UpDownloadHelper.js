import formidable from "formidable";
import fs from "fs";
import path from "path";

const uploadDirect = process.cwd() + "/storages/";

const uploadSingleFile = async (req) => {
  // process.cwd return value working directory
  // __dir return value module directory

  const options = {
    multiples: true,
    keepExtensions: true,
    uploadDir: uploadDirect,
    maxFileSize: 50 * 1024 * 1024, // 5MB
  };

  // object formidable
  const form = formidable(options);

  // declare promise variable
  const result = new Promise((resolve, reject) => {
    form.onPart = function (part) {
      if (!part.filename || part.filename.match(/\.(jpg|jpeg|png)$/i)) {
        this.handlePart(part);
      } else {
        form._error(new Error("File type is not supported"));
      }
    };

    form.parse(req, async (error, fields, files) => {
      if (error) {
        return reject({
          status: "error",
          message: `${error}`,
        });
      }

      const uploadFile = files.uploadFile.path;
      const seq = path.sep;
      const filename = uploadFile
        .substr(uploadFile.lastIndexOf(seq), uploadFile.length)
        .replace(seq, "");

      return resolve({
        attrb: {
          file: files.uploadFile,
          fields: fields,
          filename: filename,
        },
        status: {
          status: "succeed",
          message: "",
        },
      });
    });
  });

  return result;
};

const uploadMultipleFile = async (req) => {
  // process.cwd return value working directory
  // __dir return value module directory

  const options = {
    multiples: true,
    keepExtensions: true,
    uploadDir: uploadDirect,
    maxFileSize: 50 * 1024 * 1024, // 5MB
  };

  // object formidable
  const form = formidable(options);

  // declare promise variable
  const result = new Promise((resolve, reject) => {
    form.onPart = function (part) {
      if (!part.filename || part.filename.match(/\.(jpg|jpeg|png)$/i)) {
        this.handlePart(part);
      } else {
        form._error(new Error("File type is not supported"));
      }
    };

    form.parse(req, async (error, fields, files) => {
      if (error) {
        return reject({
          status: "error",
          message: `${error}`,
        });
      }

      let listOfFiles = []

      if(files){
          let fileAttr = {
            prim_id : 0,
            prim_filename : "",
            prim_filesize : 0,
            prim_filetype : "",
            prim_url : "",
            prim_primary : false
          }
          
          const sep = path.sep;
          let uploadFile = "";
          let fileName = "";
          
          files.uploadFile.forEach((el)=>{
              uploadFile = el.path;
              fileName = uploadFile.substring(uploadFile.lastIndexOf(sep),uploadFile.length).replace(sep,"");

              fileAttr = {
                prim_id : 0,
                prim_filename : fileName,
                prim_filesize : el.size,
                prim_filetype : el.type,
                prim_url : process.env.URL_IMAGE+fileName,
                prim_primary : false
              }

              listOfFiles = [...listOfFiles, fileAttr];
          })
      }

      return resolve({
        attrb: {
          files: listOfFiles,
          fields: fields
        },
        status: {
          status: "succeed",
          message: "",
        },
      });
    });
  });

  return result;
};

const showProductImage = async (req, res) => {
    const filename = req.params.filename;
    const url = `${process.cwd()}/${process.env.UPLOAD_DIR}/${filename}`;
    fs.createReadStream(url)
      .on("error", () => responseNotFound(req, res))
      .pipe(res);
  };
  
  function responseNotFound(req, res) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
  

export default {
  uploadSingleFile,
  showProductImage,
  responseNotFound,
  uploadMultipleFile
};
