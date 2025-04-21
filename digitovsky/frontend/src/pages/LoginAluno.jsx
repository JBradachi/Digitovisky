import React, { useEffect, useState } from "react";
import "../../style/global.css";
import { useNavigate } from "react-router-dom";
import styles from "../../style/LoginAluno.module.css";

import { Alert } from "../components/Alert";

export default function LoginAluno() {
  const [nomeAluno, setNomeAluno] = useState("");
  const [pathAvatar,setPathAvatar] = useState("")
  const [numeroTurma, setNumeroTurma] = useState(true);
  const rotaNomeAluno = "http://localhost:8080/aluno/nome"
  const rotaImg = "http://localhost:8080/images/avatars"

  const [message, setMessage] = useState("")

  const navigate = useNavigate();

  // redireciona para SelecionarAvatar
  function clickImage() {
    postNomeAluno()
    // Pra selecionar o avatar não é importante ter o nome cadastrado. O nome só é importante pra jogar
    navigate("/SelecionarAvatar");
  }

  // redireciona para home
  function returnHome() {
    navigate("/");
  }

  // Quando a página renderiza, carrega os dados do aluno
  useEffect(() => {
    fetchDataAluno()
  }, [])


  async function fetchDataAluno(){
    return await fetch(`${rotaNomeAluno}`, {
      method: 'GET',
    })
      .then((message) => message.text())
      .then((nome) => {
        setNomeAluno(nome)
      })
      .catch((error) => {
        //alert("um erro inesperado ocorreu ao realizar o login");
        setMessage("Um erro inesperado ocorreu ao realizar o login.");
        console.log("LoginAluno.jsx >>> ", error)
      })
  }

  async function postNomeAluno(){
    return await fetch(`${rotaNomeAluno}`, {
      method: 'POST',
      body: nomeAluno
    })
      .then((response)=> {
        if (!response.ok) {
          try {
            // Primeiramente é tentado recuperar os campos da resposta que indicam que deu errado. Se não conseguir, trata como um erro genérico
            if ('field' in response && 'message' in response){
              //alert(response.field + ' : ' + response.message)
              setMessage(response.field + ' : ' + response.message)
              return
            }
            else {
              throw response 
            }
          }catch (error){
            if (nomeAluno === '' || nomeAluno === undefined || nomeAluno === null) return
            //alert("Um ??????? erro inesperado ocorreu ao contatar o backend") 
            setMessage("Um erro inesperado ocorreu ao contatar o backend.") 
            console.log("LoginAluno.jsx >>> ", error)
            return
          }
        }
      })
      .catch((error) => {
        //alert("um erro ocorreu ao tentar recuperar o nome do usuario")
        setMessage("Um erro ocorreu ao tentar recuperar o nome do aluno.")
        console.log("LoginAluno.jsx >>> ", error)
        throw new error
      })
  }


  async function jogar(e){
    e.preventDefault()
    // TODO: recarregar rota de texto antes de efetivamente ir para a página
    if (nomeAluno.length == 0){
      //alert("Ops! Você precisa escolher seu nome")
      setMessage("Ops! Você precisa escolher seu nome!")
      return
    }
    try {
      await postNomeAluno()
      // Só vai pra próxima rota se o post funcionar
      navigate("/VideoEducativo")
    }
    catch(error){
      console.log("LoginAluno.jsx >>> ", error)
      return false
    }
  }


  return (
    <>
      <div className={styles.content}>
      <Alert message={message} setMessage={setMessage} />
        <button className={styles.return} onClick={returnHome}>
          &lt;
        </button>
        <form onSubmit={(e) => jogar(e)} className={styles.card}>
          <img
            className={styles.avatar}
            src={rotaImg}
            onClick={clickImage}
          />
          <input
            className={styles.input_nome}
            type="text"
            onChange={(e) => setNomeAluno(e.target.value)}
            placeholder="Digite seu nome..."
            defaultValue={nomeAluno}
            required
          />
          {/* <input
            className={styles.input}
            type="text"
            onChange={(e) => setNumeroTurma(e.target.value)}
            placeholder="Número da turma"
            defaultValue={""}
          /> */}
          <button
            className={styles.primary_button}
            type="submit"
          >
            JOGAR
          </button>
        </form>
      </div>
    </>
  );
}
