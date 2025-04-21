import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import PlayAudio from "./Audio";


 const Jogar = () => {

  const [textoDigitado, setTextoDigitado] = useState("")
  const [textoErrado, setTextoErrado] = useState("")
  const [textoNaoDigitado, setTextoNaoDigitado]= useState("Asfalto batata feijoado")

  const textoAtualDigitado = useRef(textoDigitado)
  const textoAtualNaoDigitado = useRef(textoNaoDigitado)

  const router = new 


  useEffect(() => {
    textoAtualDigitado.current = textoDigitado;
  }, [textoDigitado]);

  useEffect(() => {
    textoAtualNaoDigitado.current = textoNaoDigitado;
  }, [textoNaoDigitado]);

 useEffect(() => {
     const handleKeyDown = (event) => {
    const tecla = event.key; // Pega o caracter que foi digitado
    if (tecla && textoNaoDigitado.length > 0 && event.key.length == 1) {
        if (tecla == textoAtualNaoDigitado.current[0]){
          setTextoDigitado((textoAnterior) => textoAnterior + tecla);
          setTextoNaoDigitado((textoAnterior) => textoAnterior.slice(1));
          setTextoErrado("")
        }
        else {
          setTextoErrado(textoAtualNaoDigitado.current[0])
        }
    }
   };

   window.addEventListener('keydown', handleKeyDown);

   return () => {
     window.removeEventListener('keydown', handleKeyDown);
   };
 }, []);

  return (
    <div>
      Comece a digitar !!
      <p>{textoDigitado}</p>
      <p>{textoErrado}</p>
      <p>{textoNaoDigitado}</p>

      <p>{textoDigitado}{textoErrado}{textoNaoDigitado}</p>

      <PlayAudio />
      <button >
        <a href="/pages/index.html"> Clique aqui</a>
      </button>

    </div>

  )
}

export default Jogar;
