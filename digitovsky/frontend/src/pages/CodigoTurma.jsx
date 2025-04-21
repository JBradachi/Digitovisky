
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../style/global.css"
import styles from "../../style/CodigoTurma.module.css"

export default function CodigoTurma() {
  const navigate = useNavigate();

  function returnLogin() {
    navigate("/CadastrarProfessor");
  }

  function redirectToPage(page) {
    navigate(page);
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <button className={styles.return} onClick={props.close}>&lt;</button>
          <div className={styles.card}>
              <h1>Código da turma</h1>
              {/* <input id="iToken" type="text" placeholder="iToken" /> */}
              <p className={styles.codigo}>XKJA984</p>

              <button
                className={styles.primary_button}
                onClick={() => redirectToPage('/AreaProfessor')}>
                  PROSSEGUIR
              </button>
          </div>
        </div>
    </div>
  )
}
