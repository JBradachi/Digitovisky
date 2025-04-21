import React, { useState } from "react";
import "../../style/Teclado.css";
import { useEffect } from "react";

// Recebe "tecla" como props, recebe "shift" como props, e "capslock" para capslock
export default function Teclado(props) {

  //const [hit, setHit] = useState(true)
  const [hit, setHit] = useState(true)


  // Não foi possível selecionar os valores de ~ e de CAPSLOCK

 const hitTecla = (value) => {
    setHit(value);

    setTimeout(() => {
      setHit(); 
    }, 100); // Depois de X ms reseta o valor. É importante resetar para quando clicar de novo mostrar o valor
  };

  useEffect(() => {

    // Adiciona o componente que controla o pressionamento de teclas
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  //                  _
  //  _ __ ___   __ _(_)_ __
  // | '_ ` _ \ / _` | | '_ \ 
  // | | | | | | (_| | | | | |
  // |_| |_| |_|\__,_|_|_| |_|
  //
  // logica do sistema 
  const handleKeyDown = (event) => {
    event.preventDefault()
    setHit(String(event.key).toUpperCase())
    hitTecla(String(event.key).toUpperCase())
  };

  return (
    <>
    <div className="keyboard" >
      <ul className="keyboard__row" id="linha_1">
        <li className={`linha_1 ${props.tecla  === '\'' ? 'selected' : ''} ${hit === '\'' ? 'hit' : ''} key key--mindinho`}><spam className="pequeno margin">&#34;<br></br>`</spam></li>
        <li className={`linha_1 ${(props.tecla === '1' || props.tecla === '!') ? 'selected' : ''} ${hit === '1' ? 'hit' : ''} key key--mindinho`} >!<br></br>1</li>
        <li className={`linha_1 ${(props.tecla === '2' || props.tecla === '@') ? 'selected' : ''} ${hit === '2' ? 'hit' : ''} key key--anelar`}>@<br></br>2</li>
        <li className={`linha_1 ${(props.tecla === '3' || props.tecla === '#') ? 'selected' : ''} ${hit === '3' ? 'hit' : ''} key key--medio`}>#<br></br>3</li>
        <li className={`linha_1 ${(props.tecla === '4' || props.tecla === '$') ? 'selected' : ''} ${hit === '4' ? 'hit' : ''} key key--indicador`} onClick={() => setTest(!test)}>$<br></br>4</li>
        <li className={`linha_1 ${(props.tecla === '5' || props.tecla === '%') ? 'selected' : ''} ${hit === '5' ? 'hit' : ''} key key--indicador`}>%<br></br>5</li>
        <li className={`linha_1 ${(props.tecla === '6' || props.tecla === '¨') ? 'selected' : ''} ${hit === '6' ? 'hit' : ''} key key--indicador`}>¨<br></br>6</li>
        <li className={`linha_1 ${(props.tecla === '7' || props.tecla === '&') ? 'selected' : ''} ${hit === '7' ? 'hit' : ''} key key--indicador`}>&#38;<br></br>7</li>
        <li className={`linha_1 ${(props.tecla === '8' || props.tecla === '*') ? 'selected' : ''} ${hit === '8' ? 'hit' : ''} key key--medio`}>*<br></br>8</li>
        <li className={`linha_1 ${(props.tecla === '9' || props.tecla === '(') ? 'selected' : ''} ${hit === '9' ? 'hit' : ''} key key--anelar`}>&#40;<br></br>9</li>
        <li className={`linha_1 ${(props.tecla === '0' || props.tecla === ')') ? 'selected' : ''} ${hit === '0' ? 'hit' : ''} key key--mindinho`}>&#41;<br></br>0</li>
        <li className={`linha_1 ${(props.tecla === '-' || props.tecla === '_') ? 'selected' : ''} ${hit === '-' ? 'hit' : ''} key key--mindinho`}><spam className="pequeno under">-<br></br>-</spam></li>
        <li className={`linha_1 ${(props.tecla === '=' || props.tecla === '+') ? 'selected' : ''} ${hit === '=' ? 'hit' : ''} key key--mindinho`}><spam className="pequeno">+<br></br>=</spam></li>
        <li className={`linha_1 ${props.backspace ? 'selected' : ''} ${hit === 'BACKSPACE' ? 'hit' : ''} key key--mindinho`} id="back">&larr;</li>
      </ul>
      <ul className="keyboard__row" id="linha_2">
        <li className={`linha_2 ${props.tecla === 'TAB' ? 'selected' : '' } ${hit === 'TAB' ? 'hit' : ''} key key--mindinho`} id="tab">TAB</li>
        <li className={`linha_2 ${props.tecla === 'Q' ? 'selected' : '' } ${hit === 'Q' ? 'hit' : ''} key key--anelar`}>Q</li>
        <li className={`linha_2 ${props.tecla === 'W' ? 'selected' : '' } ${hit === 'W' ? 'hit' : ''} key key--anelar`}>W</li>
        <li className={`linha_2 ${props.tecla === 'E' ? 'selected' : '' } ${hit === 'E' ? 'hit' : ''} key key--medio`}>E</li>
        <li className={`linha_2 ${props.tecla === 'R' ? 'selected' : '' } ${hit === 'R' ? 'hit' : ''} key key--indicador`}>R</li>
        <li className={`linha_2 ${props.tecla === 'T' ? 'selected' : '' } ${hit === 'T' ? 'hit' : ''} key key--indicador`}>T</li>
        <li className={`linha_2 ${props.tecla === 'Y' ? 'selected' : '' } ${hit === 'Y' ? 'hit' : ''} key key--indicador`}>Y</li>
        <li className={`linha_2 ${props.tecla === 'U' ? 'selected' : '' } ${hit === 'U' ? 'hit' : ''} key key--indicador`}>U</li>
        <li className={`linha_2 ${props.tecla === 'I' ? 'selected' : '' } ${hit === 'I' ? 'hit' : ''} key key--medio`}>I</li>
          <li className={`linha_2 ${props.tecla === 'O' ? 'selected' : '' } ${hit === 'O' ? 'hit' : ''} key key--anelar`}>O</li>
        <li className={`linha_2 ${props.tecla === 'P' ? 'selected' : '' } ${hit === 'P' ? 'hit' : ''} key key--anelar`}>P</li>
        <li className={`linha_2 ${(props.tecla === '´' || props.tecla === '`') ? 'selected' : '' } ${hit === '' ? 'hit' : ''} dupla key key--mindinho`}><spam className="pequeno margin">`<br></br>´</spam></li>
        <li className={`linha_2 ${props.tecla === '\[' ? 'selected' : '' } ${hit === '\[' ? 'hit' : ''} dupla key key--mindinho`}>&#123;<br></br>&#91;</li>
        <li className={`linha_2 ${props.tecla === 'ENTER' ? 'selected' : '' } ${hit === 'ENTER' ? 'hit' : ''} key key--mindinho`} id="enter-w">    </li>
      </ul>
      <ul className="keyboard__row" id="linha_3">
        <li className={`linha_3 ${props.caps ? 'selected' : '' } key key--mindinho`} id="caps">FIXA</li>
        <li className={`linha_3 ${props.tecla === 'A' ? 'selected' : '' } ${hit === 'A' ? 'hit' : ''} key key--anelar`}>A</li>
        <li className={`linha_3 ${props.tecla === 'S' ? 'selected' : '' } ${hit === 'S' ? 'hit' : ''} key key--anelar`}>S</li>
        <li className={`linha_3 ${props.tecla === 'D' ? 'selected' : '' } ${hit === 'D' ? 'hit' : ''} key key--medio`}>D</li>
        <li className={`linha_3 ${props.tecla === 'F' ? 'selected' : '' } ${hit === 'F' ? 'hit' : ''} key key--indicador`}>F</li>
        <li className={`linha_3 ${props.tecla === 'G' ? 'selected' : '' } ${hit === 'G' ? 'hit' : ''} key key--indicador`}>G</li>
        <li className={`linha_3 ${props.tecla === 'H' ? 'selected' : '' } ${hit === 'H' ? 'hit' : ''} key key--indicador`}>H</li>
        <li className={`linha_3 ${props.tecla === 'J' ? 'selected' : '' } ${hit === 'J' ? 'hit' : ''} key key--indicador`}>J</li>
        <li className={`linha_3 ${props.tecla === 'K' ? 'selected' : '' } ${hit === 'K' ? 'hit' : ''} key key--medio`}>K</li>
        <li className={`linha_3 ${props.tecla === 'L' ? 'selected' : '' } ${hit === 'L' ? 'hit' : ''} key key--anelar`}>L</li>
        <li className={`linha_3 ${props.tecla === 'Ç' ? 'selected' : '' } ${hit === 'Ç' ? 'hit' : ''} key key--anelar`}>Ç</li>
        <li className={`linha_3 ${(props.tecla === '^' || props.tecla === '~') ? 'selected' : '' } ${hit === '^' ? 'hit' : ''} dupla key key--mindinho`}>^<br></br>~</li>
        <li className={`linha_3 ${(props.tecla === '\]' || props.tecla === '}') ? 'selected' : '' } ${hit === '\]' ? 'hit' : ''}  dupla key key--mindinho`}>&#125;<br></br>&#93;</li>
        <li className={`linha_3 ${props.tecla === 'ENTER' ? 'selected' : '' } ${hit === 'ENTER' ? 'hit' : ''}  key key--mindinho`} id="enter">ENTER</li>
      </ul>
      <ul className="keyboard__row" id="linha_4">
        <li className={`linha_4 ${props.leftShift ? 'selected' : '' } ${hit === 'SHIFT' ? 'hit' : ''}  key key--mindinho`} id="left-shift">SHIFT</li>
        <li className={`linha_4 ${(props.tecla === '\\' || props.tecla === '|') ? 'selected' : '' } ${hit === '\\' ? 'hit' : ''}  dupla key key--mindinho`} id="left-bar">|<br></br>\</li>
        <li className={`linha_4 ${props.tecla === 'Z' ? 'selected' : '' } ${hit === 'Z' ? 'hit' : ''}  key key--anelar`}>Z</li>
        <li className={`linha_4 ${props.tecla === 'X' ? 'selected' : '' } ${hit === 'X' ? 'hit' : ''}  key key--anelar`}>X</li>
        <li className={`linha_4 ${props.tecla === 'C' ? 'selected' : '' } ${hit === 'C' ? 'hit' : ''}  key key--medio`}>C</li>
        <li className={`linha_4 ${props.tecla === 'V' ? 'selected' : '' } ${hit === 'V' ? 'hit' : ''}  key key--indicador`}>V</li>
        <li className={`linha_4 ${props.tecla === 'B' ? 'selected' : '' } ${hit === 'B' ? 'hit' : ''}  key key--indicador`}>B</li>
        <li className={`linha_4 ${props.tecla === 'N' ? 'selected' : '' } ${hit === 'N' ? 'hit' : ''}  key key--indicador`}>N</li>
        <li className={`linha_4 ${props.tecla === 'M' ? 'selected' : '' } ${hit === 'M' ? 'hit' : ''}  key key--indicador`}>M</li>
        <li className={`linha_4 ${(props.tecla === ',' || props.tecla === '<') ? 'selected' : '' } ${hit === ',' ? 'hit' : ''}  dupla key key--medio`}>&#60;<br></br>,</li>
        <li className={`linha_4 ${(props.tecla === '.' || props.tecla === '>') ? 'selected' : '' } ${hit === '.' ? 'hit' : ''}  dupla key key--anelar`}>&#62;<br></br>.</li>
        <li className={`linha_4 ${(props.tecla === ';' || props.tecla === ':') ? 'selected' : '' } ${hit === ';' ? 'hit' : ''} dupla key key--anelar`}><spam className="pequeno">:<br></br>;</spam></li>
        <li className={`linha_4 ${(props.tecla === '/' || props.tecla === '?') ? 'selected' : '' } ${hit === '/' ? 'hit' : ''} dupla key key--mindinho`}>?<br></br>/</li>
        <li className={`linha_4 ${props.rightShift ? 'selected' : '' } ${hit === 'SHIFT' ? 'hit' : ''} key key--mindinho`} id="right-shift">SHIFT</li>
      </ul>
      <ul className="keyboard__row" id="linha_5">
        <li className={`linha_5 ${props.tecla === 'CONTROL' ? 'selected' : '' } ${hit === 'CONTROL' ? 'hit' : ''} key key--mindinho`} id="ctrl">CTRL</li>
        <li className={`linha_5 ${props.tecla === 'FN' ? 'selected' : '' } ${hit === 'FN' ? 'hit' : ''} key key--mindinho`}>Fn</li>
        <li className={`linha_5 ${props.tecla === 'META' ? 'selected' : '' } ${hit === 'META' ? 'hit' : ''} key key--mindinho`}>Option</li>
        <li className={`linha_5 ${props.tecla === 'ALT' ? 'selected' : '' } ${hit === 'ALT' ? 'hit' : ''} key key--mindinho`}>Alt</li>
        <li className={`linha_5 ${props.tecla === ' ' ? 'selected-space' : '' } ${hit === ' ' ? 'hit' : ''} key key--polegar`} id="space">ESPAÇO</li>
        <li className={`linha_5 ${props.tecla === 'ALTGRAPH' ? 'selected' : '' } ${hit === 'ALTGRAPH' ? 'hit' : ''} key key--mindinho`} id="alt-w">Alt Gr</li>
        <li className={`linha_5 ${props.tecla === 'MENU' ? 'selected' : '' } ${hit === 'MENU' ? 'hit' : ''} key key--mindinho`}>Menu</li>
        <li className={`linha_5 ${(hit === 'ARROWRIGHT' | hit === 'ARROWLEFT' | hit === 'ARROWUP' | hit === 'ARROWDOWN' )  ? 'selected' : '' } ${(props.tecla === 'ARROWRIGHT' | props.tecla === 'ARROWLEFT' | props.tecla === 'ARROWUP' | props.tecla === 'ARROWDOWN' )  ? 'selected' : '' } key key--mindinho`} id="setas">Setas</li>
      </ul>
    </div>
    </>
  );
}
