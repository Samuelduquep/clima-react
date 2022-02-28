import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";
import { useState, useEffect} from "react";


function App() {
  const [find, setFind] = useState({
    ciudad: '',
    pais: ''
  });

  const [consultar, setConsultar] = useState(false)
  const [resultado, setResultado] = useState({})
  const [error, setError] = useState(false)

  const {ciudad, pais} = find;
  const apiKey = 'c5d63dc78cef0ee06c9114990b26ce87'


  useEffect(() => {
    const consultarAPI = async() => {
     if(consultar){
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
      setResultado(resultado)
      setConsultar(false)

      if(resultado.cod === '404'){
        setError(true);
      } else{
        setError(false)
      }

     } 
    }
    consultarAPI();
    //eslint-disable-next-line
  }, [consultar])
  
  let componente;
  if(error){
    componente = <Error mensaje="No se encuentran Resultados"/>
  } else{
    componente = <Clima resultado = {resultado}/>
  }

  return (
    <>
    <Header
    titulo='Clima App'
    />
    <div className="contenedor-form light-blue darken-4">
      <div className="container">
        <div className="row">
          <div className="col m6 s12">
            <Formulario
            find = {find}
            setFind = {setFind}
            setConsultar = {setConsultar}
            />
          </div>
          <div  className="col m6 s12">
            {componente}
          </div>
         
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
