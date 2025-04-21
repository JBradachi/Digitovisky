import React from "react"
import styles from "../../style/AreaTexto.module.css";

export default function ComponentTeste(props) {
  return (
    <>
        <div onClick={null}>
          <p className={styles.titulo}>
            <span>Título</span>
            <b></b>
            <span>{JSON.stringify(props.texto)}dificuldade</span>
          </p>
          <p id="texto-1">Texto.....</p>
        </div>
    </>
  )
}
