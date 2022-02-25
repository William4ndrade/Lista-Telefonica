import ContatoService from "../Services/ContatoService"
import {Request, Response} from "express";
import DtoResponse from "../Interfaces/DTOS/DtoResponse";
import ContatoInterface from "../Interfaces/ContatoInterface";
import ContatoValidations from "../Validations/ContatoValidations";

class ContatoController{


    public static async CreateNewContato(req:Request ,res: Response<DtoResponse>){
       const ResponseService = await ContatoService.CreateNewContatoService(req.body);
       return res.status(ResponseService.code).json(ResponseService);  
    }   

    public static async findallContatos(req: Request, res: Response<DtoResponse>){
        const ResponseService = await ContatoService.FindAllContatos();
        return res.status(ResponseService.code).json(ResponseService);

    }

    public static async findOneContatoById(req: Request, res: Response<DtoResponse>) {
        const id = parseInt(req.params.id);
        const ResponseService = await ContatoService.FindOneContatoById(id);
        return res.status(ResponseService.code).json(ResponseService);

    }

    public static async DeleteOneContatoById(req: Request, res: Response<DtoResponse>) {
        const id = parseInt(req.params.id);
        const ResponseService = await ContatoService.DeleteOneById(id);
        return res.status(ResponseService.code).json(ResponseService);

    }

    public static async UpdateOneContatoById(req: Request, res: Response<DtoResponse>) {
        const id = parseInt(req.params.id);
        const ResponseService = await ContatoService.UpdateOneContatoById(id, req.body);
        return res.status(ResponseService.code).json(ResponseService);

    }







}

export default ContatoController;