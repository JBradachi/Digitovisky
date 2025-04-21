import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../style/global.css";
import styles from "../../style/Texto.module.css";

// componente pra Read e Delete
export default function TextoRD(props) {
  const navigate = useNavigate();

  function returnArea() {
    props.close()
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.card}>
        <button className={styles.return} onClick={returnArea}>X</button>

          <h1>
            <span>Título</span> : <span>dificul {/* Variavel */}</span>
          </h1>
          <div className={styles.texto}>
            <p id="texto-">Texto...................................................................................................................................................................................................................................................................------------------------------------------------------------------------------------------..</p>
          </div>

          <button className={styles.primary_button} onClick={returnArea}>
            Selecionar {/* Deve mudar conforme o modo selecionado (Para Selecionar OU Apagar)*/}
          </button>
        </div>
      </div>
    </div>
  );
}
