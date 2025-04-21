import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import styles from "../../style/CadastrarTexto.module.css";
import isAuth from "../components/isAuth";
import { Alert } from "../components/Alert";

function CadastrarTexto() {
  const [texto, setTexto] = useState("")
  const [dificuldade, setDificuldade] = useState("")
  const [titulo, setTitulo] = useState("")
  const [message, setMessage] = useState("")

  const rotaCadastraTexto = "http://localhost:8080/texto/create"
  styles.texto

  const navigate = useNavigate();

  function returnProfessor() {
    navigate("/AreaProfessor");
  }

  async function cadastraTexto(e){
    e.preventDefault()
    if (dificuldade === undefined || dificuldade === "" || dificuldade === "Nenhum"){
      //alert("Atenção!! Selecione uma dificuldade.")
      setMessage("Atenção!! Selecione uma dificuldade.")
      return
    }
    if (titulo.length === 0){
      //alert("Insira um título!!!")
      setMessage("Insira um título!!!")
      return
    }
    if (texto.length === 0){
      //alert("O texto não deve ser vazio!!!")
      setMessage("O texto não deve ser vazio!!!")
      return
    }
    const dados = {
      texto: texto,
      dificuldade: dificuldade,
      titulo: titulo,
      email: localStorage.getItem("email")
    }
    return await fetch(`${rotaCadastraTexto}`, {
      method: 'POST',
      headers: {
        'Authorization': localStorage.getItem("email"),
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(dados)
    })
      .then((response)=> {
        if (!response.ok) {
          try {
            // Primeiramente é tentado recuperar os campos da resposta que indicam que deu errado. Se não conseguir, trata como um erro genérico
            if ('field' in response && 'message' in response){
              alert(response.field + ' : ' + response.message)
              return
            }
            else {
              throw new Error("Sei lá, erro genérico")
            }
          } catch (error){
            alert("Um erro inesperado ocorreu ao contatar o backend.")
            console.log("CadastrarTexto.jsx >>> ", error)
            return
          }
        }

        // Caso tudo tenha dado certo
        alert("Texto cadastrado com sucesso!!")
        returnProfessor()
      })
      .catch((error) => {
        alert("Um erro inesperado ocorreu ao cadastrar o texto.")
        console.log("CadastrarTexto.jsx >>> ", error)
        throw new error
      })

  }
  return (
    <div className={styles.content}>
      <Alert message={message} setMessage={setMessage} />
      <button className={styles.return} onClick={returnProfessor}>
        &lt;
      </button>

      <form className={styles.card} name="cadastraTexto" onSubmit={(e) => cadastraTexto(e)}>
        <h1>Cadastrar texto</h1>
        <input
          type="text"
          className={styles.input}
          placeholder="Insira o título do texto"
          onChange={(e)=> setTitulo(e.target.value)}
          required />
        <select
          onChange={(e) => {
            setDificuldade(e.target.value)
          }}
          className={styles.select}
          name="dificuldade"
          form="cadastraTexto"
          required
        >
          <option className={styles.input} value="Nenhum">Selecione a dificuldade</option>
          <option className={styles.input} value="Fácil">Fácil</option>
          <option className={styles.input} value="Média">Média</option>
          <option className={styles.input} value="Difícil">Difícil</option>
        </select>
        <textarea
          type="text"
          className={styles.texto}
          onChange={(e)=> setTexto(e.target.value)}
          placeholder="Insira o novo Texto"
          required />
        <button className={styles.primary_button} type="submit" value="Cadastra texto">
          Cadastrar texto

        </button>
      </form>
    </div>
  );
}

export default isAuth(CadastrarTexto);
