import express from "express";
import ContatoController from "./Controllers/ContatoController";
const Router = express.Router();

 // ADD New CONTATO
Router.post("/contato/new", ContatoController.CreateNewContato);


// GET CONTATO BY ID 
 Router.get("/contato/:id", ContatoController.findOneContatoById );


//GET All contatos
Router.get("/contato", ContatoController.findallContatos);


 // UPDATE CONTATO BY ID
Router.put("/contato/:id", ContatoController.UpdateOneContatoById);

// DELETE CONTATO BY ID
Router.delete("/contato/:id", ContatoController.DeleteOneContatoById);



export default Router;