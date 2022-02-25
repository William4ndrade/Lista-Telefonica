import { where } from "sequelize/types";
import ContatoInterface from "../Interfaces/ContatoInterface";
import DtoResponse from "../Interfaces/DTOS/DtoResponse";
import ContatoModel from "../Models/ContatoModel";
import ContatoValidations from "../Validations/ContatoValidations";

class ContatoService {


    public static async CreateNewContatoService(contato: ContatoInterface): Promise<DtoResponse> {

        if (ContatoValidations.Isvalid(contato)) {
            const { EMAIL, IMAGE_URL, NOME, TELEFONE } = contato

            try {
                const CreateResponse = await ContatoModel.create({
                    EMAIL, IMAGE_URL, NOME, TELEFONE
                });

                return {
                    code: 201,
                    message: "Contato criado com sucesso!",
                    body: contato

                };

            } catch (error) {
                return {
                    code: 400,
                    message: "Falha ao criar novo contato",
                    body: {
                        erro: error
                    }
                    // está retornando o erro inteiro, com tempo eu trataria isso pra nao retornar informação sensivel
                }
            }




        }

        return {
            code: 400,
            message: "Novo contato invalido!"
        }

    }


    public static async FindAllContatos(): Promise<DtoResponse> {

        try {
            const Response = await ContatoModel.findAll();
            const toReturn = Response.length === 0 ? {
                code: 204,
                message: "Nenhum contato encontrado",
                body: Response
            }

                :
                {
                    code: 200,
                    message: "Contatos encontrados com sucesso!",
                    body: Response
                }

            return toReturn;

        } catch (error) {
            return {
                code: 400,
                message: "Falha ao encontrar contatos",
                body: {
                    erro: error
                }
            }

        }

    }

    public static async FindOneContatoById(id: number): Promise<DtoResponse> {
        try {
            const Response = await ContatoModel.findOne({ where: { id } })
            return  (Response ? 
                
                {
                    code: 200,
                    message: "Contato encontrado com sucesso!",
                    body: Response || {}
    
                }:

                {
                    code: 204,
                    message: "Contato não encontrado!"
                }
                
                
                
                )



        } catch (error) {
            return {
                code: 400,
                message: "Falha ao encontrar contato",
                body: {
                    erro: error
                }
            }

        }
    }

    public static async DeleteOneById(id: number): Promise<DtoResponse> {
        try {
            const Response = await ContatoModel.destroy({ where: { id } })
            return (Response > 0 ?

                {
                    code: 200,
                    message: "Contato excluido com sucesso!",
                    body: Response

                }

                :

                {
                    code: 204,
                    message: "Não há conteudo para ser excluido",
                    body: Response

                }

            )
        } catch (error) {
            return {
                code: 400,
                message: "Falha ao excluir contato",
                body: {
                    erro: error
                }
            }

        }
    }

    public static async UpdateOneContatoById(id: number, contato: ContatoInterface): Promise<DtoResponse>{
        console.log(contato)
        if(ContatoValidations.Isvalid(contato)){
            
            try {
                const Response = await ContatoModel.update(contato, {
                    where: {
                        id: id
                    }
                })
                return  (
                    Response[0] >0 ?
                    {
                        code: 200, 
                        message: "contato atualizado com sucesso",
                        body: Response
                    }
                    :
                    {
                        code: 204, 
                        message: "contato não existe",
                        
                    }
                )
                
               


            } catch (error) {
                
                return {
                    code: 400,
                    message: "falha ao atualizar lista de contatos",
                    body: {
                        erro: error
                    }
                }



            }

            




        }

        return {
            code: 400,
            message: "valores invalidos!"
        }


    }


}


export default ContatoService