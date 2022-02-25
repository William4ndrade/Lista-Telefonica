import contatoType from "../../types/ContatosType";
import contatosType from "../../types/contatoType";
import http from "./HttpHandlers";



class CrudHandler{


    public async GetAllcontatos(){
        try {
            const Response = await http.get("/contato")
            return Response.data
        } catch (error) {
            console.error("Falha ao buscar todos os contatos ", error);
        }

    }


    public async CreateNewContato(body:{ EMAIL: string, NOME: String, TELEFONE: String, IMAGE_URL: string}):Promise<boolean>{
        try {
            const Response = await http.post("/contato/new", body);
            if(Response.status == 201){
                return true
            }else{
                return false;
            }

        } catch (error) {
            return false;
        }


    }


    public async DeleteContatoByid(id:number):Promise<boolean>{
        try {
            const Response = await http.delete(`/contato/${id}`)
            if(Response.status == 200){
                return true
            }

            return false
        } catch (error) {
            return false
        }
    }
    


    public async UpdateContatoById(contato:contatoType, id: number){
        try{
            if(contato.ID){
                 const Response = await http.put(`/contato/${id}`, 
                     contato
                 )

                if(Response.status === 200){
                    return true;
                }

            }

           return false;

        }catch{
            return false;
        }






    }



}

export default new CrudHandler()