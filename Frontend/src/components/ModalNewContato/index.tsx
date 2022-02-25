import { env } from 'process';
import React, { ContextType, Dispatch, SetStateAction, useEffect, useState } from 'react';
import Modal, { Styles } from 'react-modal';
import crudHandlers from '../../services/Http/crudHandlers';
import contatosType from '../../types/contatoType';
import FeedbackType from '../../types/FeedbackTypes';
import Feedback from '../Feedback';

import "./styles.css"

Modal.setAppElement("#root") 

const customStyles:Styles = {
    content: {
        width: "30%",
        backgroundColor: "rgb(22, 22, 22)",
        border: "none",
        top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
       
        
       
      
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.756)',
       
    }
  };

const ModalNewContato = (props:{Setmodal: Dispatch<SetStateAction<boolean>> ; Modal: boolean ; Setcontatos: Dispatch<SetStateAction<contatosType | []>> ; contatos: contatosType | []} ) => {

    
    const [feedback, SetFeedback] = useState<FeedbackType>({
      Active: false,
      text: "",
      color: "RED"
    })
    const [formState, SetformState] = useState({
        nome: "",
        email: "",
        image_url: `https://avatars.dicebear.com/api/avataaars/${Math.floor(Math.random() * 100 )}.svg`,
        telefone: ""
    })

    async function  handleSubmit(e:React.FormEvent<HTMLFormElement>){
       e.preventDefault();
       if(formState.email && formState.nome && formState.telefone && formState.image_url){
            const data = {
              EMAIL: formState.email,
              NOME: formState.nome,
              IMAGE_URL: formState.image_url,
              TELEFONE: formState.telefone
            }

            const Response = await crudHandlers.CreateNewContato(data);
            if(Response){
                SetFeedback({
                   Active: true,
                   color: 'GREEN',
                   text: "Contato adicionado!"
                })
               
              
                CleanFormState()

                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }else{
                SetFeedback({
                  Active: true,
                  color: 'RED',
                  text: "Falha ao adicionar!"
              })


            }


       }else{
          SetFeedback({
            Active: true,
            text: "Preencha todos os campos!",
            color: "RED" 
          })

       }


    }

    function HandleFields(event:React.ChangeEvent<HTMLInputElement>){
        const {... data}:any = formState;
        const atualinput = event.target.id;
        data[atualinput] = event.target.value
        SetformState(data);    

    } 

    function HandleCancel(e:React.MouseEvent<HTMLButtonElement>){
        e.preventDefault()
        props.Setmodal(!props.Modal)

    }

    function CleanFormState(){
      SetformState(
        {
          nome: "",
          email: "",
          image_url: `https://avatars.dicebear.com/api/avataaars/${Math.floor(Math.random() * 100 )}.svg`,
          telefone: ""
      }
      )
    }


    useEffect(()=>{
        setTimeout(() => {
            SetFeedback({
              Active: false,
              color: "RED",
              "text": ""
            })
        }, 2000)

    }, [feedback.Active])


  return (
      <Modal 
        isOpen={props.Modal}
        onRequestClose={() => props.Setmodal(!props.Modal)}
        style={customStyles}
        contentLabel={"Registrando novo contato"}
      > 

         <h3 className='titleregister'>Novo Contato</h3>   
        <form onSubmit={e => handleSubmit(e)} action="#" method="post">

    
            <input value={formState.nome} onChange={e => HandleFields(e)} required placeholder='Nome' type="text" name="nome" id="nome" />
            <input value={formState.email}  onChange={e => HandleFields(e)} required placeholder='Email' type="email" name="email" id="email" />
            <input value={formState.image_url} onChange={e => HandleFields(e)} required  placeholder='Avatar Url' type="url" name="image_url" id="image_url" />
            <input value={formState.telefone} onChange={e => HandleFields(e)}  placeholder='Número de telefone' required type="number" name="telefone" id="telefone" />


            <div className='buttons' >
                <button id='submit' type="submit">Criar</button>
                <button onClick={e => HandleCancel(e)} id='cancell'>Cancelar</button>
            </div>




        </form>

            {
              feedback.Active ?  <Feedback color={feedback.color} text={feedback.text}  /> : ""
            }

         
      </Modal>
  )
}

export default ModalNewContato;