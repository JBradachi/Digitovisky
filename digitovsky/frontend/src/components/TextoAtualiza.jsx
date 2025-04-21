import React, { useEffect, useState } from "react";
import { redirectDocument, useNavigate } from "react-router-dom";

import "../../style/global.css";
import styles from "../../style/TextoUpdate.module.css";
import isAuth from "./isAuth";
import { Alert } from "./Alert";

// componente para alterar o texto
 function TextoAtualiza(props) {

  const navigate = useNavigate()

  const [texto, setTexto] = useState("")
  const [titulo, setTitulo] = useState(props.info.titulo)
  const [dificuldade, setDificuldade] = useState()

  const [message, setMessage] = useState()

  const rotaAtualiza = "http://localhost:8080/texto/update"
  const rotaVisualiza = "http://localhost:8080/texto/visualizar"

  useEffect(() => {
    loadData()
  },[])

  function returnArea() {
    props.close()
  }

  async function loadData(){
    return await fetch(`${rotaVisualiza}/${props.info.id}`, {
      method: 'GET',
    })
      .then((response)=> {
        if (!response.ok) {
          // Primeiramente é tentado recuperar os campos da resposta que indicam que deu errado. Se não conseguir, trata como um erro genérico
          const obj = response.json()
            .then((data) => {
              if (data.hasOwnProperty('field') && data.hasOwnProperty('message')) {
                //alert(data.field + ' : ' + data.message)
                setMessage(data.field + ' : ' + data.message)
                return
              }
              else {
                throw response 
              }
            })
            .catch((error) => {
              //alert("Um erro inesperado ocorreu ao contatar o backend.")
              setMessage("Um erro inesperado ocorreu ao contatar o backend.")
              console.log("TextoAtualiza.jsx >>> ", error)
              return
            })
          return
        }
        return response.text()
      })
    .then((response) => {
        setTexto(response)
      })
      .catch((error) => {
        //alert("Um erro ocorreu ao contatar o backend.")
        setMessage("Um erro ocorreu ao contatar o backend.")
        console.log("TextoAtualiza.jsx >>> ", error)
        throw new error
      })

  }

  async function atualizaTexto(e){
    e.preventDefault()
    if (dificuldade === "" || dificuldade === "Nenhum" || dificuldade === undefined){
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
    const data = {
      titulo: titulo,
      texto: texto,
      dificuldade: dificuldade
    }
    return await fetch(`${rotaAtualiza}/${props.info.id}`, {
      method: 'POST',
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(data)
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
          } catch (error){
            throw error
          }
        }
        alert("Texto atualizado com sucesso!!")
        props.reload()
        returnArea()
      })
      .catch((error) => {
        //alert("Um erro ocorreu durante a atualização do texto.")
        setMessage("Um erro ocorreu durante a atualização do texto.")
        console.log("TextoAtualiza.jsx >>> ", error)
      })
  }


  return (
    <div className={styles.overlay}>
      <Alert message={message} setMessage={setMessage} />
      <div className={styles.content}>
        <form name="form" className={styles.card} onSubmit={(e) => atualizaTexto(e)}>
        <button className={styles.return} onClick={returnArea}>X</button>
          
          <input
            type="text"
            placeholder="Insira o título do texto"
            onChange={(e)=> setTitulo(e.target.value)}
            defaultValue={props.info.titulo}
            className={styles.titulo}
            required
          >
          </input>
          <select
            onChange={(e) => {
              setDificuldade(e.target.value)
            }}
            name="dificuldade"
            className={styles.select}
            form="form"
            required
          >
            <option value="Nenhum">Selecione a dificuldade</option>
            <option value="Fácil">Fácil</option>
            <option value="Média">Média</option>
            <option value="Difícil">Difícil</option>
          </select>
          <textarea
            type="text"
            className={styles.texto}
            defaultValue={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
          />
          <button value="Editar" className={styles.primary_button} type="submit">
            Editar
          </button>
        </form>
      </div>
    </div>
  );
}
export default isAuth(TextoAtualiza)
