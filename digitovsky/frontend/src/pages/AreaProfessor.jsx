import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "../../style/global.css";
import styles from "../../style/AreaProfessor.module.css";
import isAuth from "../components/isAuth";

function AreaProfessor() {
  const navigate = useNavigate();

  function returnLogin() {
    navigate("/LoginProfessor");
  }

  function redirectToPage(page) {
    navigate(page);
  }

  return (
    <div className={styles.content}>
      <button className={styles.return} onClick={returnLogin}>
        &lt;
      </button>

      <div className={styles.card}>
        <h1>Área do <br />Professor</h1>
        <div className={styles.botoes}>
          <button
            className={styles.primary_button}
            onClick={() => redirectToPage("/CadastrarTexto")}
          >
            Cadastrar <br /> Novo Texto
          </button>
          <button
            className={styles.primary_button}
            onClick={() => redirectToPage("/AreaTexto")}
          >
            Gerenciar
            <br /> Textos
          </button>
        </div>
      </div>
    </div>
  );
}
export default isAuth(AreaProfessor)
