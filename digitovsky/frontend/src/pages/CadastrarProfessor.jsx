
import React, { useEffect, useState } from "react"; import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "../../style/global.css"
import styles from "../../style/CadastrarProfessor.module.css"
import Token from "./Token";
import { Alert } from "../components/Alert";


export default function CadastrarProfessor() {

  const [modalState, setModalState] = useState(false)
  const [nomeProfessor, setNomeProfessor] = useState("")
  const [emailProfessor, setEmailProfessor] = useState("")
  const [senhaProfessor, setSenhaProfessor] = useState("")
  const [senhaNovamente, setSenhaNovamente] = useState("")

  const [message, setMessage] = useState("")


  const rotaLoginProfessor = "http://localhost:8080/professor/cadastro"

  const navigate = useNavigate();


  function returnLogin() {
    navigate("/LoginProfessor");
  }

  function validaInformacoes() {
    if (nomeProfessor.length == 0 || emailProfessor.length == 0 || senhaProfessor.length == 0 || senhaNovamente.length == 0){
      setMessage("ATENÇÃO: Preencha todos os campos.")
      //alert("ATENÇÃO: Preencha todos os campos")
      return
    }
    if (senhaNovamente != senhaProfessor || senhaProfessor.length == 0){
      //alert("ATENÇÃO: as senhas devem ser iguais e precisam ser preenchidas")
      setMessage("ATENÇÃO: as senhas devem ser iguais e precisam ser preenchidas.")
      return
    }
    if (senhaProfessor.length < 8){
      //alert("ATENÇÃO: Sua senha é muita curta. A senha deve possuir pelo menos 8 caracteres")
      setMessage("ATENÇÃO: Sua senha é muita curta. A senha deve possuir pelo menos 8 caracteres.")
      return
    }
    setModalState(true)
  }

  async function cadastraProfessor(token) {
    if (token == undefined || token.length == 0){
      alert("ATENÇÃO: Preencha o campo de iToken")
      return
    }
    return await fetch(`${rotaLoginProfessor}`, {
      method: 'POST',
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        nome: nomeProfessor,
        senha: senhaProfessor,
        email: emailProfessor,
        iToken: token
      })
    })
    .then((response)=> {
        if (!response.ok) {
          // Primeiramente é tentado recuperar os campos da resposta que indicam que deu errado. Se não conseguir, trata como um erro genérico
          const obj = response.json()
            .then((data) => {
              if (data.hasOwnProperty('field') && data.hasOwnProperty('message')) {
                alert(data.field + ' : ' + data.message)
                return
              }
              else {
                throw response 
              }
            })
            .catch((error) => {
              //alert("Um erro inesperado ocorreu ao contatar o backend")
              setMessage("Um erro inesperado ocorreu ao contatar o backend.")
              console.log("CadastrarProfessor.jsx >>> ", error)
              return
            })
          return
        }
        // Caso tudo tenha dado certo
        alert("Cadastro realizado com sucesso!!")
        setTimeout(2000)
        navigate('/LoginProfessor')
      })
    .catch((error) => {
      alert("um erro inesperado ocorreu ao cadastrar o professor");
      console.log("CadastrarProfessor.jsx >>> ", error)
      throw new error
    })
  }

  return (
    <>
      { modalState ? (
          <Token close={() =>setModalState(false)} cadastro={cadastraProfessor} />
      ) : null }
    <div className={modalState ? styles.content_grayscale : styles.content}>
        <button className={styles.return} onClick={returnLogin}>
        &lt;
      </button>

      <div className={styles.card}>
          <h1>Cadastro!</h1>
          <input className={styles.input} onChange={(e) => setNomeProfessor(e.target.value)} id="name"  type="text" placeholder="Digite seu nome" />
          <input className={styles.input} onChange={(e) => setEmailProfessor(e.target.value)} id="email" type="text" placeholder="Digite seu e-mail" />
          <input className={styles.input} onChange={(e) => setSenhaProfessor(e.target.value)} id="passsword" type="password" placeholder="Digite sua senha" />
          <input className={styles.input} onChange={(e) => setSenhaNovamente(e.target.value)} id="passsword" type="password" placeholder="Digite sua senha novamente" />
          <button
            className={styles.primary_button}
            onClick={() => validaInformacoes()}>
              ENTRAR
          </button>
      </div>
      <Alert message={message} setMessage={setMessage} />
    </div>
    </>
  )
}

