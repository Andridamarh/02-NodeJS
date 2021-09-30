// 1. pastikan selalu import dotenv di line pertama
import "dotenv/config";
import express from "express";
import cors from "cors";
import compress from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
// for access models to db
import models,{sequelize} from "./models/IndexModel";
import routes from './routes/IndexRoute'

// declare port
const port = process.env.PORT || 1337;

const app = express();
// parse body params and attache them to req.boy
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// use helmet spy bisa dikenali SEO
app.use(helmet());
// secure apps by setting various HTTP headers
app.use(compress());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// load models dan simpan di req.context
app.use(async (req,res,next) =>{
    req.context = {models};
    next();
});

app.use(process.env.URL_DOMAIN, (req, res) => {
  res.send("Hello Eshopay");
});

// call routes
app.use(process.env.URL_API+"/category",routes.CategoryRoute)
app.use(process.env.URL_API+"/products",routes.ProductsRoute)

// set to false agar tidak di drop tables yang ada di database
const dropDatabaseSync = false;

sequelize.sync({force : dropDatabaseSync}).then(async ()=>{
    if(dropDatabaseSync){
        console.log("Database do not drop");
    }

    app.listen(port,()=>{
        console.log(`Server is listening on Port ${port}`);
    });

})



export default app;