import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Modal, { Styles } from 'react-modal';
import crudHandlers from '../../services/Http/crudHandlers';
import body from '../../types/bodytype';
import contatoType from '../../types/ContatosType';
import contatosType from '../../types/contatoType';
import contatosype from '../../types/contatoType';
import FeedbackType from '../../types/FeedbackTypes';
import Feedback from '../Feedback';

import "./styles.css"

Modal.setAppElement("#root")

const customStyles: Styles = {
    content: {
        width: "50%",
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



const ModalShowContato = (props: { Setmodal: Dispatch<SetStateAction<boolean>>; Modal: boolean; contato: contatoType }) => {

    const [feedback, SetFeedback] = useState<FeedbackType>({
        Active: false,
        text: "",
        color: "RED"
    })
    const [FormUpdate, SetFormUpdate] = useState<contatoType>({
        EMAIL: "",
        IMAGE_URL: "",
        NOME: "",
        TELEFONE: "",
        ID: 0
    })

    const [IsUpdatable, SetIsUpdatable] = useState<boolean>(false);

    async function HandleFormFields(ev: React.ChangeEvent<HTMLInputElement>){

      
        
        const Atual =  ev.target.id.toUpperCase();
        const {...formdata}: any = props.contato;
        formdata[Atual] = ev.target.value;
        SetFormUpdate(formdata)
       
        
     
    }


    async function HandleUpdate(){
        if(FormUpdate.ID){
            const Body = {
                EMAIL: FormUpdate.EMAIL,
                IMAGE_URL: FormUpdate.IMAGE_URL,
                NOME: FormUpdate.NOME,
                TELEFONE: FormUpdate.TELEFONE ,
                ID: FormUpdate.ID
            }
            console.log(Body)
            const Resp = await crudHandlers.UpdateContatoById(Body, FormUpdate.ID);
            if(Resp){
                SetFeedback({
                    Active: true,
                    color: "GREEN",
                    text: "Usuário Atualizado com sucesso"
                })

                setTimeout(() => {
                    window.location.reload();
                },2000)
            }else{

                SetFeedback({
                    Active: true,
                    color: "RED",
                    text: "Falha ao atualizar contato!"
                })
            }

        }else{
            SetFeedback({
                Active: true,
                color: "RED",
                text: "Falha ao atualizar contato"
            })


        }
        




    }


    async function DeleteAtualUser(id: number | undefined) {

        if (id) {
            const Response = await crudHandlers.DeleteContatoByid(id);
            if (Response) {
                SetFeedback({
                    Active: true,
                    text: "Contato " + id + " excluido",
                    color: "GREEN"
                })

                setTimeout(() => {
                    window.location.reload()
                }, 2500)
            } else {
                SetFeedback({
                    Active: true,
                    text: "Falha ao excluir contato",
                    color: "RED"
                })
            }

        } else {
            SetFeedback({
                Active: true,
                text: "Falha ao excluir contato",
                color: "RED"
            })

        }

    }



    

    useEffect(() => {
        setTimeout(() => {
            SetFeedback({
                Active: false,
                text: "",
                color: "RED"
            })
        }, 2000)
    }, [feedback.Active])

    return (
        <Modal
            isOpen={props.Modal}
            onRequestClose={() => props.Setmodal(!Modal)}
            style={customStyles}
            contentLabel={"Registrando novo contato"}
        >
            {!IsUpdatable ?
                (
                    <>
                        <div className='headercontatosection'>
                            <h3 className='titleregister'>{props.contato.NOME}</h3>
                            <div>
                                <i onClick={() => SetIsUpdatable(true)} className="fas fa-edit"></i>
                                <i onClick={() => DeleteAtualUser(props.contato.ID)} className="fas fa-trash-alt"></i>
                            </div>

                        </div>

                        <main className='mainshowuser'>
                            <img className='contatoimg' src={props.contato.IMAGE_URL} alt="avatar" draggable={false} />

                            <div className='infos'>

                                <div className='information'>
                                    <span className='label'> Email: </span>
                                    <span className='content'> {props.contato.EMAIL} </span>
                                </div>

                                <div className='information'>
                                    <span className='label'> Telefone: </span>
                                    <span className='content'> {props.contato.TELEFONE} </span>
                                </div>

                                <div className='information'>
                                    <span className='label'> ID: </span>
                                    <span className='content'> {props.contato.ID} </span>
                                </div>


                            </div>



                        </main>
                    </>)

                :

                (
                    <>
                        <div className='headercontatosectionUpdate'>
                            <h3 className='titleregister'>Nome</h3>
                            <input onChange={e => HandleFormFields(e)} type="text" name="nome" id="nome" defaultValue={props.contato.NOME} />
                        </div>

                        <main className='mainshowuser'>
                            <img className='contatoimg' src={props.contato.IMAGE_URL} alt="avatar" draggable={false} />

                            <div className='infos'>

                                <div className='informationupdate'>
                                    <span className='labelupdate'> Email: </span>
                                    <input onChange={e => HandleFormFields(e)} defaultValue={props.contato.EMAIL} placeholder='Email' type="text" className='inputupdate' name="Email" id="email" />
                                </div>

                                <div className='informationupdate'>
                                    <span className='labelupdate'> Telefone: </span>
                                    <input onChange={e => HandleFormFields(e)}  defaultValue={props.contato.TELEFONE} placeholder='Telefone' type="number" className='inputupdate' name="telefone" id="telefone" />
                                </div>

                                <div className='informationupdate'>
                                    <span className='labelupdate'> Avatar Url: </span>
                                    <input defaultValue={props.contato.IMAGE_URL}  onChange={e => HandleFormFields(e)} placeholder='Avatar URL' type="url" className='inputupdate' name="url" id="IMAGE_URL" />
                                </div>


                            


                               


                            </div>

                           

                        </main>

                        <div className='buttons updatebtn' >
                                <button onClick={() => HandleUpdate()} id='submit' type="submit">Atualizar</button>
                                <button onClick={ () => SetIsUpdatable(false)} id='cancell'>Cancelar</button>
                        </div>

                    </>)























            }




            {
                feedback.Active ? <Feedback color={feedback.color} text={feedback.text} /> : ""
            }

        </Modal>
    )
}

export default ModalShowContato;