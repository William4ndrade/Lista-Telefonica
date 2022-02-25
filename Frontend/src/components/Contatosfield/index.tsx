import React, { useState } from 'react';
import contatosType from '../../types/contatoType';
import ModalShowContato from '../ModalShowContato';
import contatoType from '../../types/ContatosType';

import './styles.css';
import body from '../../types/bodytype';



const Contatosfield = (props: { contatos: contatosType }) => {

  
    const [modal, SetModal] = useState<boolean>(false);
    const initialstatebody:contatoType ={
        EMAIL:"",
        IMAGE_URL: "",
        NOME: "",
        TELEFONE: "",
        ID: 0
    } 
    const [body, setBody] = useState<contatoType>(initialstatebody);
    
    
    function handleClick(data: contatoType){
        setBody(data);
        SetModal(!modal);
        
    }


    return (
        <>
            {
                props.contatos.map((e, i) => {
                    return (
                        <div onClick={(ev) => handleClick(e)} className='ContatoField'>
                             <img className='contatopicture' src={e.IMAGE_URL} alt="ImageContato" />

                            <div  className='ContatoInfos'>
                                <span className='nome'>{e.NOME}</span>
                                <span className='email'> <span className='title'>Email: </span> {e.EMAIL} </span>
                                <span className='telefone'> <span className='title'>Telefone:</span>  {e.TELEFONE}</span>
                            </div>

                            
                        </div>
                    )



                })


            }

            <ModalShowContato Modal={modal} Setmodal={SetModal} contato={body} />
        </>

    )
}

export default Contatosfield;