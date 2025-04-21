import React from "react"
import { Alert } from "./Alert"


export default function VerificaResposta(response){
        if (!response.ok) {
          console.log(response)
          // Primeiramente é tentado recuperar os campos da resposta que indicam que deu errado. Se não conseguir, trata como um erro genérico
          const obj = response.json()
            .then((data) => {
              console.log("AQUI >>> ", data)
              if (data.hasOwnProperty('field') && data.hasOwnProperty('message')) {
                alert(data.field + ' : ' + data.message)
                throw response
              }
              else {
                throw response 
              }
            })
            .catch((error) => {
              alert("Um erro inesperado ocorreu ao contatar o backend.")
              console.log("VerificaResposta.jsx >>> ", error)
              throw response
            })
        }
}
