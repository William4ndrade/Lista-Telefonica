import React, { useEffect, useState } from 'react';
import crudHandlers from '../../services/Http/crudHandlers';
import contatosType from '../../types/contatoType';
import Contatosfield from '../Contatosfield';
import HeaderLista from '../HeaderLista';
import Modal, { Styles } from 'react-modal';

 import './styles.css';
import ModalNewContato from '../ModalNewContato';
 


Modal.setAppElement("#root") 

const customStyles:Styles = {
    content: {
      width: "50%"
      
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.756)',
        display: "flex",
        alignItems:"center",
        justifyContent: "center"
    }
  };


const ListaTelefonica: React.FC = () => {

  
     
    const [contatos, setcontatos] = useState<contatosType | [] >([]);
    const [ModalCreateIsOpen, SetModalCreateIsOpen] = useState<boolean>(false);




    useEffect(() => {

        (async () => {
           const Response = await crudHandlers.GetAllcontatos();

           setcontatos(Response.body)
        })()

    }, [])
   




  return (
        <main>
            <HeaderLista Setmodal={SetModalCreateIsOpen} Modal={ModalCreateIsOpen} />
            <div className='contatosarea'>
                  {
                    contatos  ? <Contatosfield  contatos={contatos} /> : ""
                  }
                    
            </div>

            <ModalNewContato Setmodal={SetModalCreateIsOpen} Modal={ModalCreateIsOpen } contatos={contatos} Setcontatos={setcontatos}/>

               
            



        </main>



  )
}

export default ListaTelefonica;