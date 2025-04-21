import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../style/global.css";
import styles from "../../style/Texto.module.css";

// componente pra Read e Delete
export default function TextoVisualiza(props) {
  const navigate = useNavigate();

  const [texto, setTexto] = useState("");
  const rotaVisualiza = "http://localhost:8080/texto/visualizar"

  useEffect(() => {
    loadData();
  }, []);

  function returnArea() {
    props.close();
  }

  async function loadData() {
    return await fetch(`${rotaVisualiza}/${props.info.id}`, {
      method: "GET",
      headers: {
        'Authorization': localStorage.getItem("email")
      },
    })
      .then((response) => {
        if (!response.ok) {
          try {
            // Primeiramente é tentado recuperar os campos da resposta que indicam que deu errado. Se não conseguir, trata como um erro genérico
            if ("field" in response && "message" in response) {
              alert(response.field + " : " + response.message);
              return;
            } else {
              throw error;
            }
          } catch (error) {
            alert("Um erro inesperado ocorreu ao contatar o backend.");
            console.log("TextoVisualiza.jsx >>> ", error);
            return;
          }
        }

        console.log("TextoVisualiza.jsx >>> texto carregado com sucesso");
        return response.json();
        // Caso tudo tenha dados certo
      })
      .then((response) => {
        setTexto(JSON.stringify(response));
      })
      .catch((error) => {
        alert("Um erro inesperado ocorreu ao visualizar o texto.");
        console.log(error);
        throw new error();
      });
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <button className={styles.return} onClick={returnArea}>
          &lt;
        </button>
        <div className={styles.card}>
          <h1>
            <span>Título: {props.info.title.length > 30 ? <>{props.info.title.slice(0,30)}...</> : props.info.title}</span>
            <span> Dificuldade: {props.info.userId}</span>
          </h1>
          <div className={styles.texto}>
            <p id="texto-">{texto}</p>
          </div>
          <button className={styles.primary_button} onClick={returnArea}>
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
