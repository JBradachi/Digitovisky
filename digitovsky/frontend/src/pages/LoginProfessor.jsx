import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "../../style/global.css"
import styles from "../../style/LoginProfessor.module.css"
import isAuth from "../components/isAuth";

import { Alert } from "../components/Alert";

export default function LoginProfessor() {

  const [senhaProfessor, setSenhaProfessor] = useState("")
  const [emailProfessor, setEmailProfessor] = useState("")
  const navigate = useNavigate();

  const [message, setMessage] = useState("")

  const rotaLoginProfessor = "http://localhost:8080/professor/login"

  function returnHome() {
    navigate("/");
  }

  async function loginProfessor(){
      return await fetch(`${rotaLoginProfessor}`, {
      method: 'POST',
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        email: emailProfessor,
        senha: senhaProfessor
      })
    })
    .then((response) => response.json())
      .then((response) => {
        if (!response.ok) {
          try {
            if (response.hasOwnProperty('field') && response.hasOwnProperty('message')) {
              //alert(response.field + ' : ' + response.message)
              setMessage(response.field + ' : ' + response.message)
              return
            }
          }
          catch(error) {
            throw error
          }
        }
      console.log("LoginProfessor.jsx >>> Login realizado com sucesso!!!")
      // Explicação:
      // Para proteger as rotas, permitindo que somente um usuário autenticado utilize o sistema, é guardado no localStorage a variável 'signed'. Se o professor não tiver passado pela tela de login e entrar em uma rota sem essa variavel, ela redireciona para a home
      localStorage.setItem('email', emailProfessor)
      navigate('/AreaProfessor')
    })
    .catch((error) => {
      //alert("Um erro inesperado ocorreu!!!")
      setMessage("Um erro inesperado ocorreu!!!")
      console.log("LoginProfessor.jsx >>> ", error)
      throw new error
    })
  }

  return (
    <div className={styles.content}>
      <Alert message={message} setMessage={setMessage} />
      <button className={styles.return} onClick={returnHome}>
        &lt;
      </button>

      <div className={styles.card}>
          <h1>Login do <br /> Professor</h1>
          <input  id="email" className={styles.name} onChange={(e) => setEmailProfessor(e.target.value)} type="text" placeholder="Digite seu email" />
          <input
          id="passsword" type="password" onChange={(e) => setSenhaProfessor(e.target.value)} placeholder="Digite sua senha" />
          <button
            className={styles.primary_button}
            onClick={() => loginProfessor()}>
              ENTRAR
          </button>
          <div className={styles.cadastro}>
              <p>Não possui uma conta?</p>
              <a onClick={() => navigate('/CadastrarProfessor')}>Cadastre-se!</a>
          </div>
      </div>
    </div>
  )
}

