import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../style/global.css";

import Start from "./pages/Start";
import LoginProfessor from "./pages/LoginProfessor";
import LoginAluno from "./pages/LoginAluno";
import Jogar from "./pages/Jogar";
import AreaProfessor from "./pages/AreaProfessor";
import CadastrarProfessor from "./pages/CadastrarProfessor";
import RelatorioIndividual from "./pages/RelatorioIndividual";
import SelecionaAvatar from "./pages/SelecionaAvatar";
import CodigoTurma from "./pages/CodigoTurma";
import CadastrarTexto from "./pages/CadastrarTexto";
import AreaTexto from "./pages/AreaTexto";
import VideoEdutativo from "./pages/VideoEducativo";
import StartAudio from "./components/StartAudio";

// Pra leitura e apagar texto

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          {/*<Route path="/" element={<Layout />}> */}
          <Route element={<StartAudio />}>
            <Route index element={<Start />} />
            <Route path="/LoginAluno" element={<LoginAluno />} />
            <Route path="/SelecionarAvatar" element={<SelecionaAvatar />} />
            <Route path="/Jogar" element={<Jogar />} />
            <Route path="/AreaProfessor" element={<AreaProfessor />} />
            <Route
              path="/CadastrarProfessor"
              element={<CadastrarProfessor />}
            />
            <Route path="/LoginProfessor" element={<LoginProfessor />} />
            <Route
              path="/RelatorioIndividual"
              element={<RelatorioIndividual />}
            />
            <Route path="/CadastrarTexto" element={<CadastrarTexto />} />
            <Route path="/AreaTexto" element={<AreaTexto />} />
            <Route path="/CodigoTurma" element={<CodigoTurma />} />
          </Route>
            <Route path="/VideoEducativo" element={<VideoEdutativo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
