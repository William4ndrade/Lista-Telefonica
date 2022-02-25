import ContatoInterface from "../Interfaces/ContatoInterface";

class ContatoValidations{


    private static lengthvalidation(element: string): boolean{
        return element.length > 0 && element.length <= 500;
    }

   

    private static telefonevalidation(telefone:string): boolean{
        var regex = new RegExp('^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$'); 
        return regex.test(telefone);
        
    }

    public static Isvalid(contato: ContatoInterface ):boolean{
        return this.telefonevalidation(contato.TELEFONE) && this.lengthvalidation(contato.EMAIL) && this.lengthvalidation(contato.NOME) && this.lengthvalidation(contato.IMAGE_URL);     


    }


}

export default ContatoValidations;