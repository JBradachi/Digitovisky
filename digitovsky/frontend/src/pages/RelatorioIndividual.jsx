import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../style/RelatorioIndividual.module.css";
import VerificaResposta from "../components/VerificaResposta";

import { Alert } from "../components/Alert";


// TODO: adicionar requisição de dificuldade
export default function RelatorioIndividual() {
  const navigate = useNavigate();
  const [nomeAluno, setNomeAluno] = useState("");
  const [dificuldadeTexto, setDificuldadeTexto] = useState("");
  const [relatorioIndividual, setRelatorioIndividual] = useState("");

  const rotaNomeAluno = "http://localhost:8080/aluno/nome"
  const rotaImg = "http://localhost:8080/images/avatars";
  const rotaRecuperaRelatorio = "http://localhost:8080/relatorio";
  const rotaDificuldadeRelatorio = "http://localhost:8080/texto/getDificuldade";

  const [message, setMessage] = useState("")

  async function fetchDataAluno() {
    return await fetch(`${rotaNomeAluno}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          try {
            // Primeiramente é tentado recuperar os campos da resposta que indicam que deu errado. Se não conseguir, trata como um erro genérico
            if ('field' in response && 'message' in response){
              //alert(response.field + ' : ' + response.message)
              setMessage(response.field + ' : ' + response.message)
              return
            }
            else {
              throw error
            }
          }catch (error){
            //alert("Um erro inesperado ocorreu ao contatar o backend")
            setMessage("Um erro inesperado ocorreu ao contatar o backend.")
            console.log("RelatorioIndividual.jsx >>> ", error)

            return
          }
        }
        return response.text()
      })
      .then((nome) => {
        const nomeSplit = nome.trim().split(" ")
        if (nome.trim().split(" ").length > 1){
          const nomeFiltrado = nomeSplit[0] + " " + nomeSplit[1]
          setNomeAluno(nomeFiltrado);
        }
        else {
          setNomeAluno(nomeSplit);
        }
        console.log("RelatorioIndividual.jsx >>> recebido informações do aluno");
      })
      .catch((error) => {
        //alert("um erro ocorreu ao tentar recuperar o nome do usuario");
        setMessage("Um erro ocorreu ao tentar recuperar o nome do aluno.");
        console.log("RelatorioIndividual.jsx >>> ", error);
      });
  }
  async function fetchDificuldade() {
    return await fetch(`${rotaDificuldadeRelatorio}`, {
      method: "GET",
    })
      .then((message) => {
        VerificaResposta(message)
        return message.text()
      })
      .then((dados) => {
        setDificuldadeTexto(dados);
        console.log("RelatorioIndividual.jsx >>> recebido dificuldade");
      })
      .catch((error) => {
        //alert("um erro ocorreu ao tentar recuperar a dificuldade");
        setMessage("Um erro ocorreu ao tentar recuperar a dificuldade.");
        console.log("RelatorioIndividual.jsx >>> ", error);
      });
  }

  async function fetchRelatorioIndividual() {
    return await fetch(`${rotaRecuperaRelatorio}`, {
      method: "GET",
    })
      .then((message) => {
        console.log("RelatorioIndividual.jsx >>> ", message)
        if (!message.ok) {
          try {
            // Primeiramente é tentado recuperar os campos da resposta que indicam que deu errado. Se não conseguir, trata como um erro genérico
            if ('field' in message && 'message' in message){
              //alert(message.field + ' : ' + message.message)
              setMessage(message.field + ' : ' + message.message)
              return
            }
            else {
              throw error
            }
          }catch (error){
            //alert("Um erro inesperado ocorreu ao contatar o backend")
            setMessage("Um erro inesperado ocorreu ao contatar o backend.")
            console.log("RelatorioIndividual.jsx >>> ", error)
            return
          }
        }
        return message.json()
      })
      .then((dados) => {
        setRelatorioIndividual(dados);
        console.log("RelatorioIndividual.jsx >>> ", dados)
        console.log("RelatorioIndividual.jsx >>> recebido relatorio");
      })
      .catch((error) => {
        //alert("um erro ocorreu ao tentar recuperar o nome do usuario");
        setMessage("Um erro ocorreu ao tentar recuperar o nome do aluno.");
        console.log("RelatorioIndividual.jsx >>> ", error);
      });
  }

  // Quando a página renderiza, carrega os dados do aluno
  useEffect(() => {
    fetchDataAluno();
    fetchRelatorioIndividual();
    fetchDificuldade()
  }, []);

  // redireciona para home
  function returnHome() {
    navigate("/LoginALuno");
  }

  return (
    <div className={styles.content}>
      <Alert message={message} setMessage={setMessage} />
      <button className={styles.return} onClick={returnHome}>
        &lt;
      </button>

      <div className={styles.avatarContainer}>
        <img className={styles.avatar} src={rotaImg} onClick={null} />

        <div className={styles.user}>{nomeAluno}</div>
      </div>
      <br />

      <h1 className={styles.titulo}>RESULTADOS</h1>

      {/* //TODO: Todas as rotas aqui precisam ser alteradas para o campo correto do json */}
      <div className={styles.relatorio}>

        <p className={styles.metrica}><span>Dificuldade:</span><b></b><span>{dificuldadeTexto}</span></p>
        <p className={styles.metrica}><span>Total de Tempo gasto:</span><b></b><span>{relatorioIndividual.totalTempo}</span></p>
        <p className={styles.metrica}><span>Total de erros cometidos:</span><b></b><span>{relatorioIndividual.totalErros}</span></p>
        <p className={styles.metrica}><span>Média de segundos gastos por frase:</span><b></b><span>{relatorioIndividual.mediaFraseSegundo}</span></p>
        <p className={styles.metrica}><span>Média de erros por frase:</span><b></b><span>{relatorioIndividual.mediaErrosFrase}</span></p>
        <p className={styles.metrica}><span>Total de Caracteres Digitados:</span><b></b><span>{relatorioIndividual.totalCaracteresDigitados}</span></p>
        <p className={styles.metrica}><span>Frases perfeitas (sem erros):</span><b></b><span>{relatorioIndividual.frasesPerfeitas}</span></p>

      </div>
    </div>
  );
}
