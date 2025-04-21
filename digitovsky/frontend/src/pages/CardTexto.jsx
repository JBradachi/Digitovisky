import React, { useState } from "react";
import styles from "../../style/AreaTexto.module.css";

import TextoDeleta from "../components/TextoDeleta";
import TextoAtualiza from "../components/TextoAtualiza";
import TextoSeleciona from "../components/TextoSeleciona";
import TextoVisualiza from "../components/TextoVisualiza";
import isAuth from "../components/isAuth";
import { Alert } from "../components/Alert";

// Recebe a dificuldade do texto
 function CardTexto(props) {
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");

  function handleOpenModal() {
    if (
      (props.modo === undefined) |
      (props.modo === null) |
      (props.modo === "nenhum") |
      (props.modo.lenght === 0) | // será que não seria length?
      (props.modo === "")
    ) {
      //alert("Por favor, escolha um modo para manipular o texto!!!");
      setMessage("Por favor, escolha um modo para manipular o texto!!!");
      return;
    }
    setOpenModal(true);
  }

  return (
    <div 
      className={styles.overlay} 
      //onClick={handleOpenModal} 
      >
      <Alert message={message} setMessage={setMessage} />
      <div 
        //onClick={handleOpenModal} 
        className={styles.content_text}
      >
        <div 
          onClick={handleOpenModal} 
          id={props.texto.id}
        >
          <p className={styles.titulo}>
            <span>Título: {props.texto.titulo.length > 30 ? <p>{props.texto.titulo.slice(0,30)}...</p> : props.texto.titulo}</span>
            <b></b>
            <span>Dificuldade: {props.texto.dificuldade}</span>
          </p>
          <p id="texto-" className={styles.texto}>
            Texto: {props.texto.texto}
          </p>
        </div>
        {openModal
          ? {
              selecionar: (
                <TextoSeleciona
                  close={() => setOpenModal(false)}
                  info={props.texto}
                />
              ), // Não precisa funcionar nessa sprint
              deletar: (
                <TextoDeleta
                  reload={props.reload}
                  close={() => setOpenModal(false)}
                  info={props.texto}
                />
              ),
              atualizar: (
                <TextoAtualiza
                  reload={props.reload}
                  close={() => setOpenModal(false)}
                  info={props.texto}
                />
              ),
            }[props.modo]
          : null}
      </div>
    </div>
  );
}
export default isAuth(CardTexto)
