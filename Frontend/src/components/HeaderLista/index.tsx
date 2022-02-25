import React, { Dispatch, SetStateAction } from 'react';


import './styles.css';

const HeaderLista = (props: {Setmodal: Dispatch<SetStateAction<boolean>> ; Modal: boolean}) => {
  return (
      <header className='Listheader' >
          
           <i  onClick={() => props.Setmodal(!props.Modal)} title='novo contato'  className="far fa-plus-square"></i>
      </header>
  );
}

export default HeaderLista;