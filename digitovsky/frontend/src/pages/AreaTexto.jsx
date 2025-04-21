import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardTexto from "./CardTexto";
import isAuth from "../components/isAuth";

import styles from "../../style/AreaTexto.module.css";

function AreaTexto() {

  const [modo, setModo] = useState("nenhum")
  const [textos, setTextos] = useState("")
  const [cinza, setCinza] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    fetchDados()

  } ,[])

  const rotaTexto = "http://localhost:8080/texto/getInfoTextos"

  async function fetchDados() {
    return await fetch(`${rotaTexto}`, {
      method: 'GET',
      headers: {
        'Authorization': localStorage.getItem("email")
      },
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
              throw error
            }
          }catch (error){
            alert("Um erro inesperado ocorreu ao contatar o backend.")
            console.log("AreaTexto.jsx >>> ", error)
            return
          }
        }

        console.log("AreaTexto.jsx >>> Textos recuperados")
        return response.json()
      })
      .then((response) => {
        setTextos(response)
      })
      .catch((error) => {
        alert("Um erro ocorreu inesperado ocorreu em areaTexto.")
        console.log("AreaTexto.jsx >>> ", error)
        throw new error
      })
  }
  function returnProfessor() {
    navigate("/AreaProfessor");
  }

  return (
    <div className={styles.content}>
      <button className={styles.return} onClick={returnProfessor}>
        &lt;
    </button>
      <select
        onChange={(e) => {
          setModo(e.target.value)
        }}
        name="modo"
        className={styles.select}
      >
      {/* TO DO: Remover opção nenhum e deixar como padrao visualizar texto */}
        <option value="nenhum">Escolha o modo de edição</option>
        <option value="selecionar">Selecionar Texto</option>
        <option value="deletar">Deletar Texto</option>
        <option value="atualizar">Editar Texto</option>
      </select>
      {
        textos ? (
          <>
            <h1 className={styles.h1}>Central de <br /> Conteúdos</h1>
            <div className={styles.contentTextos}>
              {
                textos.map((dado) => (
                  <CardTexto key={dado.id} texto={dado} modo={modo} reload={fetchDados} />
                ))
              }
            </div>
          </>
        ) : (
          <p>Carregando ...</p>
        )
      }
    </div>
  );
}

export default isAuth(AreaTexto)
