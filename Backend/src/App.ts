import express, { Application } from "express";
import cors from "cors";
import Router from "./Routes";
import rateLimit  from "express-rate-limit";
import { appendFile } from "fs";



class App{


    public express:Application;


    public constructor(){
        this.express = express();
        this.SetMiddlewares()
        this.SetRoutes();
        
    }


    private SetMiddlewares():void{ 
        this.express.use(express.json());
        this.express.use(cors());
        
    }

    private SetRoutes():void {
        this.express.use(Router)
    }


   


}


export default new App().express;