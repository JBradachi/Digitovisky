
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/global.css";
import styles from "../../style/Start.module.css";

export default function CadastrarProfessor() {
  const navigate = useNavigate();

  const rotaLogoutProfessor = "http://localhost:8080/professor/limpar"
  useEffect(() => {
    localStorage.clear();
    LogoutProfessor();
  }, [])

  async function LogoutProfessor(){
    fetch(`${rotaLogoutProfessor}`, {
      method: 'GET'
    })
    .then((response) => {
        // Caso a resposta tenha dado certo, nada precisa ser feito. Só é necessário confirmar o fluxo em caso de erro
        if (!response.ok) {
          try {
            // Primeiramente é tentado recuperar os campos da resposta que indicam que deu errado. Se não conseguir, trata como um erro genérico
            if ('field' in response && 'message' in response){
              alert(response.field + ' : ' + response.message)
              return
            }
            else {
              throw error
            }
          }catch (error){
            alert("Um erro inesperado ocorreu ao contatar o backend.")
            console.log("Start.jsx >>> ", error)
            return
          }
      }
    })
  }
  function pushAluno() {
    navigate("/LoginAluno");
  }

  function pushProfessor() {
    navigate("/LoginProfessor");
  }
  return (
    <div className={styles.content}>
      <img src="/assets/images/logo.png" alt="Logo" className={styles.logo} />
      <img src="/assets/images/name.png" alt="Nome" className={styles.name} />
      <div className={styles.buttons}>
        <button className={styles.primary_button} onClick={pushAluno}>
          Sou Aluno
        </button>
        <button className={styles.secondary_button} onClick={pushProfessor}>
          Sou Professor
        </button>
      </div>
    </div>
  )
}
