import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Teclado from "../components/Teclado";
import styles from "../../style/Jogar.module.css";
import VerificaResposta from "../components/VerificaResposta";
import { Alert } from "../components/Alert";

export default function Jogar() {


  const tabelaConversao = {
    776: "¨",   
    769: "´",   
    168: "ç",   
    770: "^",   
    768: "`",
    771: "~",
  }
  const digitarLetra = useRef(false)
  const [capslock, setCapslock] = useState(false)
  const backspace = useRef(false)
  const [leftShift, setLeftShift] = useState(false)
  const [rightShift, setRightShift] = useState(false)


  const precisoDeAjuda = useRef(false)
  const [render, setRender] = useState("")
  //                   _                 _
  //  __   ____ _ _ __(_) __ ___   _____(_)___
  //  \ \ / / _` | '__| |/ _` \ \ / / _ \ / __|
  //   \ V / (_| | |  | | (_| |\ V /  __/ \__ \
  //    \_/ \__,_|_|  |_|\__,_| \_/ \___|_|___/
  //
  const [fraseAnterior, setFraseAnterior] = useState("");
  const [textoDigitado, setTextoDigitado] = useState("");
  const [textoErrado, setTextoErrado] = useState("");
  const [textoNaoDigitado, setTextoNaoDigitado] = useState(" ");
  const [fraseFutura, setFraseFutura] = useState("");


  const [message, setMessage] = useState("")

  const rightShiftChars = "¨&*()_^`+YUIOPHJKLÇNM<>:{}"
  const leftShiftChars = "\"!@#$%QWERTASDFGZXCVB|"

  //const [caracerTeclado, setCaracerTeclado] = useState(" "); // Caracter que dever ser digitado
  const caracerTeclado = useRef("")

  const tempoInicio = useRef();
  const numeroErros = useRef(0);

  // Refs para partes do indicador de texto
  const refTextoDigitado = useRef(textoDigitado);
  const refTextoNaoDigitado = useRef(textoNaoDigitado);
  const refFraseFutura = useRef(fraseFutura);
  const refFraseAnterior = useRef(fraseAnterior);
  const refTextoErrado = useRef(textoErrado);

  const [nomeAluno, setNomeAluno] = useState("");

  useEffect(() => {
    refTextoDigitado.current = textoDigitado;
    refTextoNaoDigitado.current = textoNaoDigitado;
    refFraseFutura.current = fraseFutura; refFraseAnterior.current = fraseAnterior;
    refTextoErrado.current = textoErrado;
  }, [textoDigitado, textoNaoDigitado, fraseFutura, fraseAnterior, textoErrado])
  //            _
  //  _ __ ___ | |_ __ _ ___ 
  // | '__/ _ \| __/ _` / __|
  // | | | (_) | || (_| \__ \
  // |_|  \___/ \__\__,_|___/
  // rotas
  const rotaJogar = "http://localhost:8080/jogo/frase";
  const rotaImg = "http://localhost:8080/images/avatars";
  const rotaNomeAluno = "http://localhost:8080/aluno/nome"
  const rotaMetricas = "http://localhost:8080/relatorio/metrica"
  const rotaResetTexto = "http://localhost:8080/resetJogo"
  const rotaResetRelatorio = "http://localhost:8080/resetRelatorio"

  const navigate = useNavigate();

  //    __
  //   / _|_   _ _ __   ___ ___   ___  ___     _ __ ___   ___ _ __   ___  _ __ ___  ___ 
  //  | |_| | | | '_ \ / __/ _ \ / _ \/ __|   | '_ ` _ \ / _ \ '_ \ / _ \| '__/ _ \/ __|
  //  |  _| |_| | | | | (_| (_) |  __/\__ \   | | | | | |  __/ | | | (_) | | |  __/\__ \
  //  |_|  \__,_|_| |_|\___\___/ \___||___/   |_| |_| |_|\___|_| |_|\___/|_|  \___||___/
  // funcoes menores

  function configShiftAcento(acento) {
    if (String(leftShiftChars).indexOf(acento) != -1) {
      setRightShift(true)
    } 
    else setRightShift(false)
    if (String(rightShiftChars).indexOf(acento)!= -1) {
      setLeftShift(true)
    } 
    else setLeftShift(false)
  }
  function getAcento(caractere) {
    if (caractere === undefined) {
      return { char: "", acento: "" };
    }
    const separados = caractere.normalize('NFD'); // Decompõe o caractere
    const char = String(separados[0]).replace(/ /g, ''); // O primeiro caractere é a base
    const acentoUnicode = separados.slice(1).replace(/ /g, ''); // Os demais são os acentos
    const acento = converteAcento(acentoUnicode)
    return { char, acento };
  }
  function converteAcento(acento){
    const codeUnicode = String(acento).charCodeAt(0)
    if (!(codeUnicode in tabelaConversao)) {
      return ""
    }
    const codeAscii = tabelaConversao[codeUnicode]
    return codeAscii
  }

  function configShift() {
    if (String(leftShiftChars).indexOf(refTextoNaoDigitado.current[0]) != -1) {
      setRightShift(true)
    } 
    else setRightShift(false)

    if (String(rightShiftChars).indexOf(refTextoNaoDigitado.current[0])!= -1) {
      setLeftShift(true)
    } 
    else setLeftShift(false)
  }
  function configShiftLetra(letra) {
    if (String(leftShiftChars).indexOf(letra) != -1) {
      setRightShift(true)
    } 
    else setRightShift(false)

    if (String(rightShiftChars).indexOf(letra)!= -1) {
      setLeftShift(true)
    } 
    else setLeftShift(false)
  }

  function returnPage() {
    navigate("/LoginAluno");
  }

  function converteNome(nome) {
    const nomeSplit = nome.trim().split(" ")
    if (nome.trim().split(" ").length > 1){
      const nomeFiltrado = nomeSplit[0] + " " + nomeSplit[1]
      return nomeFiltrado
    }
    else {
      return nomeSplit
    }
  }

  async function resetTexto() {
    return await fetch(`${rotaResetTexto}`, {
      method: "GET",
    })
      .then((response) => {
        VerificaResposta(response)
        return response.text()
      })
      .then(() => {
        console.log("Jogar.jsx >>> Texto resetado com sucesso");
      })
      .catch((error) => {
        //alert("Um erro ocorreu ao tentar recuperar o nome do aluno.");
        setMessage("Um erro ocorreu ao tentar recuperar o nome do aluno.");
        console.log("Jogar.jsx >>> ", error);
      });

  }

  async function resetRelatorio() {
    return await fetch(`${rotaResetRelatorio}`, {
      method: "GET",
    })
      .then((response) => {
        VerificaResposta(response)
        return response.text()
      })
      .then(() => {
        console.log("Jogar.jsx >>> Relatorio resetado com sucesso");
      })
      .catch((error) => {
        //alert("Um erro ocorreu ao tentar recuperar o nome do aluno.");
        setMessage("Um erro ocorreu ao tentar recuperar o nome do aluno.");
        console.log("Jogar.jsx >>> ", error);
      });

  }
  //  _       _      _       _ _
  // (_)_ __ (_) ___(_) __ _| (_)______ _  ___ __ _  ___
  // | | '_ \| |/ __| |/ _` | | |_  / _` |/ __/ _` |/ _ \
  // | | | | | | (__| | (_| | | |/ / (_| | (_| (_| | (_) |
  // |_|_| |_|_|\___|_|\__,_|_|_/___\__,_|\___\__,_|\___/
  // inicializacao

  useEffect(() => {
    // O primeiro de tudo é resetar as rotas de Texto e Relatorio
    resetTexto()
    resetRelatorio()
    // carrega dados do aluno no inicio
    carregaDadosAlunos();
    //carregaProximaFrase()
    inicializaTudo();

    tempoInicio.current = Date.now();

    // Adiciona o componente que controla o pressionamento de teclas
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  //   __      _       _           _            _           _
  //  / _| ___| |_ ___| |__     __| | ___    __| | __ _  __| | ___  ___
  // | |_ / _ \ __/ __| '_ \   / _` |/ _ \  / _` |/ _` |/ _` |/ _ \/ __|
  // |  _|  __/ || (__| | | | | (_| |  __/ | (_| | (_| | (_| | (_) \__ \
  // |_|  \___|\__\___|_| |_|  \__,_|\___|  \__,_|\__,_|\__,_|\___/|___/
  // fetch de dados
  async function carregaDadosAlunos() {
    return await fetch(`${rotaNomeAluno}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response)
          // Primeiramente é tentado recuperar os campos da resposta que indicam que deu errado. Se não conseguir, trata como um erro genérico
          const obj = response.text()
            .then((data) => {
              console.log("AQUI >>> ", data)
              if (data.hasOwnProperty('field') && data.hasOwnProperty('message')) {
                //alert(data.field + ' : ' + data.message)
                setMessage(data.field + ' : ' + data.message)
                  throw response
              }
              else {
                throw response 
              }
            })
            .catch((error) => {
              //alert("Um erro inesperado ocorreu ao contatar o backend.")
              setMessage("Um erro inesperado ocorreu ao contatar o backend.")
              console.log("VerificaResposta.jsx >>> ", error)
              throw response
            })
        }
        return response.text()
      })
      .then((nome) => {
        setNomeAluno(converteNome(nome))
      })
      .catch((error) => {
        alert("Um erro ocorreu ao tentar recuperar o nome do aluno.");
        console.log("Jogar >>> ", error);
      });
  }
  async function inicializaTudo() {
    return await fetch(`${rotaJogar}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response)
          // Primeiramente é tentado recuperar os campos da resposta que indicam que deu errado. Se não conseguir, trata como um erro genérico
          const obj = response.json()
            .then((data) => {
              if (data.hasOwnProperty('field') && data.hasOwnProperty('message')) {
                //alert(data.field + ' : ' + data.message)
                setMessage(data.field + ' : ' + data.message)
                  throw response
              }
              else {
                throw response 
              }
            })
            .catch((error) => {
              console.log("VerificaResposta.jsx >>> ", error)
              throw response
            })
        }
        return response.json()
      })
      .then((message) => {
        setTextoNaoDigitado(message.frase);
        //setCaracerTeclado(String(refTextoNaoDigitado.current[0]).toUpperCase());
        //caracerTeclado.current = (String(refTextoNaoDigitado.current[0]).toUpperCase());
        caracerTeclado.current = (String(message.frase[0]).toUpperCase());
      })
      .then(() => carregaProximaFrase())
      .then(() => {
        configShift()
        const acento = getAcento(refTextoNaoDigitado.current[0]).acento
        const letra = getAcento(refTextoNaoDigitado.current[0]).char
        if (acento != ""){
          precisoDeAjuda.current = true
          caracerTeclado.current = acento
          configShiftAcento(acento)
        }
        digitarLetra.current = false
      })
      .catch((error) => {
        //alert("um erro ocorreu durante a inicialização de jogar");
        console.log("Jogar >>> ", JSON.stringify(error));
      });
  }

  async function carregaProximaFrase() {
    return await fetch(`${rotaJogar}`, {
      method: "GET",
    })
      .then((response) => {
        VerificaResposta(response)
        return response.json()
      })
      .then((message) => {
        setFraseFutura(message.frase);
        refFraseFutura.current = message.frase;
      })
      .catch((error) => {
        //alert("Um erro ocorreu ao carregar a próxima frase.");
        setMessage("Um erro ocorreu ao carregar a próxima frase.");
        setFraseFutura("");
        refFraseFutura.current = "";
        console.log("Jogar >>> ", error);
      });
  }

  async function calculaMetricas() {
    const tempoFinal = Date.now();
    const tempo = tempoFinal - tempoInicio.current;
    const dados = {
      tempoGasto: Math.round(tempo/1000),
      qntErros: numeroErros.current,
      tamanhoFrase: refTextoDigitado.current.length,
    };
    console.log("Jogar >> Dados metricas:", dados);
    return await fetch(`${rotaMetricas}`, {
      method: 'POST',
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(dados),
    })
      .then((response) => {
        VerificaResposta(response)
        numeroErros.current = 0;
        tempoInicio.current = Date.now();
      })
      .catch((error) => {
        alert("Um erro inesperado ocorreu ao contatar o backend durante a requisição de métricas.")
        console.log("Jogar >>> ", error)
      })
  }

  //                  _
  //  _ __ ___   __ _(_)_ __
  // | '_ ` _ \ / _` | | '_ \
  // | | | | | | (_| | | | | |
  // |_| |_| |_|\__,_|_|_| |_|
  // main
  //
  // logica do sistema e gerenciamento de teclado
  //
  const handleKeyDown = (event) => {
    event.preventDefault();
    const key = event.key; // Pega o caracter que foi digitado
    const code = event.code; // Pega o caracter que foi digitado
    const shiftPressed = event.shiftKey

      const teclaChata = getAcento(refTextoNaoDigitado.current[0])
      const acento = teclaChata.acento
      const letra = teclaChata.char
      console.log("Jogar.jsx >>> ", acento, "Acento", letra, "letra")
      console.log("Jogar.jsx >>> -- Digite letra:", digitarLetra)
      console.log("Jogar.jsx >>> -- Tem Acento:", precisoDeAjuda)

    if (String(key).toUpperCase() === 'CAPSLOCK'){
      setCapslock((cap) => !cap)
      return
    }

    if (String(key).toUpperCase() === 'SHIFT'){
      return
    }


    if (precisoDeAjuda){
      if (key && refTextoNaoDigitado.current.length === 0) {
        if (String(key).toUpperCase() === 'BACKSPACE' && refTextoErrado.current.length === 0) {
          backspace.current = false 
          setLeftShift(false)
          setRightShift(false)
          configShift()
          configShiftAcento()
          digitarLetra.current = false
          return
        }
        if (String(key).toUpperCase() === 'BACKSPACE' && refTextoErrado.current.length !== 0) {
          backspace.current = false 

          setTextoNaoDigitado((textoAnterior) => refTextoErrado.current + textoAnterior);
          refTextoNaoDigitado.current = refTextoErrado.current + refTextoNaoDigitado.current;

          // Atualiza o estado para o front funcionar
          setTextoErrado("");
          configShift()
          configShiftAcento()
          caracerTeclado.current = (refTextoNaoDigitado.current.slice(0, 1));

          if (refTextoNaoDigitado.current.length > 1) {
            caracerTeclado.current = String(refTextoNaoDigitado.current.slice(0, 1)).toUpperCase()
          }  
          const acento = getAcento(refTextoNaoDigitado.current[0]).acento
          const letra = getAcento(refTextoNaoDigitado.current[0]).char
          if (acento != ""){
            precisoDeAjuda.current = true
            caracerTeclado.current = acento
            configShiftAcento(acento)
          }
          digitarLetra.current = false
          return 
        } 

        // Fim do texto
      }
      if (key && refTextoNaoDigitado.current.length > 0) {
        if (String(key).toUpperCase() === 'BACKSPACE' && refTextoErrado.current.length === 0) {
          backspace.current = false 
          setLeftShift(false)
          setRightShift(false)
          configShift()
          configShiftAcento()
          digitarLetra.current = false
          return
        }
        if (String(key).toUpperCase() === 'BACKSPACE' && refTextoErrado.current.length !== 0) {
          backspace.current = false 

          setTextoNaoDigitado((textoAnterior) => refTextoErrado.current + textoAnterior);
          refTextoNaoDigitado.current = refTextoErrado.current + refTextoNaoDigitado.current;

          // Atualiza o estado para o front funcionar
          setTextoErrado("");
          configShift()
          configShiftAcento()
          caracerTeclado.current = (refTextoNaoDigitado.current.slice(0, 1));

          if (refTextoNaoDigitado.current.length > 1) {
            caracerTeclado.current = String(refTextoNaoDigitado.current.slice(0, 1)).toUpperCase()
          }  
          const acento = getAcento(refTextoNaoDigitado.current[0]).acento
          const letra = getAcento(refTextoNaoDigitado.current[0]).char
          if (acento != ""){
            precisoDeAjuda.current = true
            caracerTeclado.current = acento
            configShiftAcento(acento)
          }
          digitarLetra.current = false
          return 
        } 
        if ((code === "Quote" || code === "BracketLeft" || code === "Digit6") && !digitarLetra.current){
          console.log("identificou o acento")
          console.log(letra) 
          //debugger
          switch(code){
            case "Quote":
              if (acento === "^" && shiftPressed){
                digitarLetra.current = true
                caracerTeclado.current = String(letra).toUpperCase() 
                configShiftLetra(letra)
                console.log(caracerTeclado.current)
                setRender(Date.now())
                break;
              }
              if (acento === "~" && !shiftPressed){
                digitarLetra.current = true
                caracerTeclado.current = String(letra).toUpperCase() 
                setRender(code)
                configShiftLetra(letra)
                console.log(caracerTeclado.current)
                break;
              }
              if (letra === "^" && shiftPressed){
                digitarLetra.current = true
                caracerTeclado.current = String(letra).toUpperCase() 
                setRender(code)
                configShiftLetra(letra)
                console.log(caracerTeclado.current)
                setRender(Date.now())
                break;
              }
              if (letra === "~" && !shiftPressed){
                digitarLetra.current = true
                caracerTeclado.current = String(letra).toUpperCase() 
                setRender(code)
                configShiftLetra(letra)
                console.log(caracerTeclado.current)
                setRender(Date.now())
                break;
              }
            case "BracketLeft":
              if (acento === "´" && !shiftPressed){
                digitarLetra.current = true
                caracerTeclado.current = String(letra).toUpperCase() 
                setRender(code)
                configShiftLetra(acento)
                setRender(Date.now())
                break;
              }
              if (acento === "`" && shiftPressed){
                digitarLetra.current = true
                caracerTeclado.current = String(letra).toUpperCase() 
                setRender(Date.now())
                configShiftLetra(acento)
                console.log(caracerTeclado.current)
                setRender(Date.now())
                break;
              }
              if (letra === "´" && !shiftPressed){
                digitarLetra.current = true
                caracerTeclado.current = String(letra).toUpperCase() 
                setRender(code)
                configShiftLetra(letra)
                setRender(Date.now())
                break;
              }
              if (letra === "`" && shiftPressed){
                digitarLetra.current = true
                caracerTeclado.current = String(letra).toUpperCase() 
                setRender(code)
                configShiftLetra(letra)
                console.log(caracerTeclado.current)
                break;
              }
            case "Digit6":
              if (acento === "¨" && shiftPressed){
                digitarLetra.current = true
                caracerTeclado.current = String(letra).toUpperCase() 
                setRender(code)
                configShiftLetra(acento)
                console.log(caracerTeclado.current)
                break;
              }
              if (letra === "¨" && shiftPressed){
                digitarLetra.current = true
                caracerTeclado.current = String(letra).toUpperCase() 
                setRender(code)
                configShiftLetra(letra)
                console.log(caracerTeclado.current)
                break;
              }
            default: 
              if (refTextoErrado.current.length === 0) {

              setTextoErrado(refTextoNaoDigitado.current[0]);
              refTextoErrado.current = refTextoNaoDigitado.current[0]

              backspace.current = true
              caracerTeclado.current = "Backspace"

              setTextoNaoDigitado((textoAnterior) => textoAnterior.slice(1));
              refTextoNaoDigitado.current = refTextoNaoDigitado.current.slice(1);

              numeroErros.current = numeroErros.current + 1;
              console.log("Jogar.jsx >>> A criança errou");
              setLeftShift(false)
              setRightShift(false)
              }
              break;
          }
          setRender(code)
          return
        }
      }
      if (digitarLetra.current){
        if (key === "Dead"){
          console.log("tratando acento sozinho")
          switch(code){
            case("Digit6"): 
              if (letra === "¨" && shiftPressed){
                setTextoDigitado((textoAnterior) => textoAnterior + refTextoNaoDigitado.current[0]); // Atualiza o texto para o usuario ver
                setTextoNaoDigitado((textoAnterior) => textoAnterior.slice(1));
                refTextoNaoDigitado.current = refTextoNaoDigitado.current.slice(1);

                // Atualiza o estado para o front funcionar
                setTextoErrado("");
                caracerTeclado.current = (refTextoNaoDigitado.current.slice(0, 1));

                if (refTextoNaoDigitado.current.length >= 1) {
                  caracerTeclado.current = String(refTextoNaoDigitado.current.slice(0, 1)).toUpperCase()
                }
                configShift()
                digitarLetra.current = false
                const acento = getAcento(refTextoNaoDigitado.current[0]).acento
                const letra = getAcento(refTextoNaoDigitado.current[0]).char
                if (acento != ""){
                  precisoDeAjuda.current = true
                  caracerTeclado.current = acento
                  configShiftAcento(acento)
                  return
                }
                precisoDeAjuda.current = false
                return
              }
              break;
            case("Quote"): 
              if (letra === "^" && shiftPressed){
                setTextoDigitado((textoAnterior) => textoAnterior + refTextoNaoDigitado.current[0]); // Atualiza o texto para o usuario ver
                setTextoNaoDigitado((textoAnterior) => textoAnterior.slice(1));
                refTextoNaoDigitado.current = refTextoNaoDigitado.current.slice(1);

                // Atualiza o estado para o front funcionar
                setTextoErrado("");
                caracerTeclado.current = (refTextoNaoDigitado.current.slice(0, 1));

                if (refTextoNaoDigitado.current.length >= 1) {
                  caracerTeclado.current = String(refTextoNaoDigitado.current.slice(0, 1)).toUpperCase()
                }
                configShift()
                digitarLetra.current = false
                const acento = getAcento(refTextoNaoDigitado.current[0]).acento
                const letra = getAcento(refTextoNaoDigitado.current[0]).char
                if (acento != ""){
                  precisoDeAjuda.current = true
                  caracerTeclado.current = acento
                  configShiftAcento(acento)
                  return
                }
                precisoDeAjuda.current = false
                return
              }
              if (letra === "~" && !shiftPressed){
                setTextoDigitado((textoAnterior) => textoAnterior + refTextoNaoDigitado.current[0]); // Atualiza o texto para o usuario ver
                setTextoNaoDigitado((textoAnterior) => textoAnterior.slice(1));
                refTextoNaoDigitado.current = refTextoNaoDigitado.current.slice(1);

                // Atualiza o estado para o front funcionar
                setTextoErrado("");
                caracerTeclado.current = (refTextoNaoDigitado.current.slice(0, 1));

                if (refTextoNaoDigitado.current.length >= 1) {
                  caracerTeclado.current = String(refTextoNaoDigitado.current.slice(0, 1)).toUpperCase()
                }
                configShift()
                digitarLetra.current = false
                const acento = getAcento(refTextoNaoDigitado.current[0]).acento
                const letra = getAcento(refTextoNaoDigitado.current[0]).char
                if (acento != ""){
                  precisoDeAjuda.current = true
                  caracerTeclado.current = acento
                  configShiftAcento(acento)
                  return
                }
                precisoDeAjuda.current = false
                return
              }
          }

        }
        // NOTE: SE A CRIANÇA ERROU
        if (key !== letra && refTextoErrado.current.length === 0){
          console.log("erro e o buffer de erro ta vazio")

          setTextoErrado(refTextoNaoDigitado.current[0]);
          refTextoErrado.current = refTextoNaoDigitado.current[0]

          backspace.current = true
          caracerTeclado.current = "Backspace"

          setTextoNaoDigitado((textoAnterior) => textoAnterior.slice(1));
          refTextoNaoDigitado.current = refTextoNaoDigitado.current.slice(1);

          numeroErros.current = numeroErros.current + 1;
          console.log("Jogar.jsx >>> A criança errou");
          setLeftShift(false)
          setRightShift(false)
          return
        }
        if (key !== letra && refTextoErrado.current.length !== 0){
          console.log("erro e o buffer de erro ta cheio")
          setLeftShift(false)
          setRightShift(false)
          return
        }
        if (key === letra && refTextoErrado.current.length !== 0) {
          // A letra ta certa, mas tem erro no buffer (tem que limpar o buffer)
          console.log("Buffer de erro cheio")
          return 
        }
        if (key === letra && refTextoErrado.current.length === 0) {
          setTextoDigitado((textoAnterior) => textoAnterior + refTextoNaoDigitado.current[0]);
          // Atualiza o texto para o usuario ver
          setTextoNaoDigitado((textoAnterior) => textoAnterior.slice(1));
          refTextoNaoDigitado.current = refTextoNaoDigitado.current.slice(1);

          // Atualiza o estado para o front funcionar
          setTextoErrado("");
          caracerTeclado.current = (refTextoNaoDigitado.current.slice(0, 1));

          if (refTextoNaoDigitado.current.length >= 1) {
            caracerTeclado.current = String(refTextoNaoDigitado.current.slice(0, 1)).toUpperCase()
          }
          configShift()
          digitarLetra.current = false
          const acento = getAcento(refTextoNaoDigitado.current[0]).acento
          const letra = getAcento(refTextoNaoDigitado.current[0]).char
          if (acento != ""){
            precisoDeAjuda.current = true
            caracerTeclado.current = acento
            configShiftAcento(acento)
            return
          }
          precisoDeAjuda.current = false
          return
        } 

      }
    }

    console.log(refTextoErrado)
    console.log(refTextoNaoDigitado)
    //console.log("   __ _                 \n  / _| |_   ___  _____  \n | |_| | | | \\ \\/ / _ \\ \n |  _| | |_| |>  < (_) |\n |_| |_|\\__,_/_/\\_\\___/ \n \n ")
    console.log("=== NORMAL")
    if (key && refTextoNaoDigitado.current.length > 0) {

      if (String(key).toUpperCase() === 'BACKSPACE' && refTextoErrado.current.length === 0) {
        console.log("Backspaceeeeeeee")
        console.log("true")
        backspace.current = false 
        configShift()
        return
      }
      if (String(key).toUpperCase() === 'BACKSPACE' && refTextoErrado.current.length !== 0) {
        console.log("Backspaceeeeeeee")
        backspace.current = false 

        // Atualiza para front e para lógica

        // Atualiza o texto para o usuario ver
        setTextoNaoDigitado((textoAnterior) => refTextoErrado.current + textoAnterior);
        refTextoNaoDigitado.current = refTextoErrado.current + refTextoNaoDigitado.current;

        // Atualiza o estado para o front funcionar
        setTextoErrado("");
        configShift()
        caracerTeclado.current = (refTextoNaoDigitado.current.slice(0, 1));

        if (refTextoNaoDigitado.current.length > 1) {
          caracerTeclado.current = String(refTextoNaoDigitado.current.slice(0, 1)).toUpperCase()
        }  
        return 
      } 
      // NOTE: SE A CRIANÇA ERROU
      if (key !== refTextoNaoDigitado.current[0] && refTextoErrado.current.length === 0){
        console.log("erro e o buffer de erro ta vazio")

        setTextoErrado(refTextoNaoDigitado.current[0]);
        refTextoErrado.current = refTextoNaoDigitado.current[0]

        backspace.current = true
        caracerTeclado.current = "Backspace"

        setTextoNaoDigitado((textoAnterior) => textoAnterior.slice(1));
        refTextoNaoDigitado.current = refTextoNaoDigitado.current.slice(1);

        numeroErros.current = numeroErros.current + 1;
        console.log("Jogar.jsx >>> A criança errou");
        setLeftShift(false)
        setRightShift(false)
      }

      if (key !== refTextoNaoDigitado.current[0] && refTextoErrado.current.length !== 0){
        console.log("erro e o buffer de erro ta cheio")
        setLeftShift(false)
        setRightShift(false)
        return
      }
      if (key === refTextoNaoDigitado.current[0] && refTextoErrado.current.length !== 0) {
        console.log("Nao deveria acontecer")
        return 
      }
      // NOTE: SE A CRIANÇA ACERTOU
      if (key === refTextoNaoDigitado.current[0] && refTextoErrado.current.length === 0) {

        // Atualiza para front e para lógica
        setTextoDigitado((textoAnterior) => textoAnterior + key);
        //refTextoDigitado.current = refTextoDigitado.current + key;

        // Atualiza o texto para o usuario ver
        setTextoNaoDigitado((textoAnterior) => textoAnterior.slice(1));
        refTextoNaoDigitado.current = refTextoNaoDigitado.current.slice(1);

        // Atualiza o estado para o front funcionar
        setTextoErrado("");

        //setCaracerTeclado(refTextoNaoDigitado.current.slice(0, 1));
        caracerTeclado.current = (refTextoNaoDigitado.current.slice(0, 1));

        if (refTextoNaoDigitado.current.length >= 1) {
          const acento = getAcento(refTextoNaoDigitado.current[0]).acento
          const letra = getAcento(refTextoNaoDigitado.current[0]).char
          if (acento != ""){
            precisoDeAjuda.current = true
            caracerTeclado.current = acento
            configShiftAcento(acento)
            return
          }
        }

        if (refTextoNaoDigitado.current.length >= 1) {
          caracerTeclado.current = String(refTextoNaoDigitado.current.slice(0, 1)).toUpperCase()
        }
        configShift()
      } 
    }

    //
    // Acabou a linha
    //
    if (refTextoNaoDigitado.current.length == 0) {

      // Chegou no fim do texto 
      if (!refFraseFutura.current) {
        calculaMetricas()
        .then(navigate("/RelatorioIndividual"))
        return;
      }

      //setCaracerTeclado(String(refFraseFutura.current.slice(0, 1)).toUpperCase());
      caracerTeclado.current = (String(refFraseFutura.current.slice(0, 1)).toUpperCase());

      console.log("ACABOU A FRASE");
      calculaMetricas();

      // Acabou a frase atual. Precisamos
      // - Mover o que foi digitado para a frase anterior
      setFraseAnterior(refTextoDigitado.current);
      //refFraseAnterior.current = refTextoDigitado.current;

      // Limpar o que foi digitado atualmente
      setTextoDigitado("");

      // atualizar a frase futura
      carregaProximaFrase();

      // Atualizar o que deve ser digitado
      setTextoNaoDigitado(refFraseFutura.current);
    }
  };

  return (
    <div className={styles.content} //key={render}
    >
      <Alert message={message} setMessage={setMessage} />
      <button className={styles.return} onClick={returnPage}>
        &lt;
      </button>

      <div className={styles.messageBubble}>
        <div className={styles.avatarContainer}>
          <img className={styles.avatar} src={rotaImg} onClick={null} />

          <div className={styles.user}>
            {nomeAluno}
          </div>
        </div>

        <div className={styles.ballon}>
          <span className={styles.correto}>{fraseAnterior}</span>
          <div>
            <span className={styles.correto}>{textoDigitado}</span>
            <span className={styles.errado}>
            { textoErrado==' ' ? ('␣') : (textoErrado) }
            </span>
            <span className={styles.bar}>|</span>
            <span>{textoNaoDigitado}</span>
          </div>
          <span>{fraseFutura}</span>
        </div>
      </div>
      <div className={styles.teclado}>
        <Teclado tecla={caracerTeclado.current} leftShift={leftShift} rightShift={rightShift} caps={capslock} backspace={backspace.current} />
      </div>
    </div>
  );
}
