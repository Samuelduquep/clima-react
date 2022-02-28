import React from 'react'
import Error from './Error';
import PropTypes from 'prop-types'
import { useState } from 'react'



const Formulario = ({find, setFind, setConsultar}) => {
   
    const [error, setError] = useState(false);
    const {ciudad, pais} = find;

    const handleChange = e => {
        setFind({
            ...find, 
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(ciudad.trim()===''|| pais.trim()===''){
            setError(true);
            return;
        }

        setError(false);

        setConsultar(true)
    }


  return (
      <form
        onSubmit={handleSubmit}
      >

    {error ? <Error mensaje = 'Todos los campos son obligatorios'/> : null}

    <div className='input-field col s12'>
        <label htmlFor='ciudad'>Ciudad: </label>
        <input
            type='text'
            name='ciudad'
            id='ciudad'
            value={ciudad}
            onChange={handleChange}
        />
    </div>
    <div className='input-field col s12'>
       
        <select 
            name='pais'
            id='pais'
            value={pais}
            onChange={handleChange}
        >
            <option disabled value="">Seleccione un País</option>
            <option value="ES">España</option>
            <option value="FR">Francia</option>
            <option value="IT">Italia</option>
            <option value="PT">Portugal</option>
            <option value="DE">Alemania</option>
            <option value="AD">Andorra</option>
            <option value="NL">Nederland</option>
            <option value="US">Estados Unidos</option>
        </select>
        <label htmlFor='pais'>País: </label>
    </div>
    <div className="input-field col s12">
        <button 
            className="btn-large btn-block waves-effect waves-light col s12" 
            type="submit" 
        >Buscar Clima</button>
    </div>
    </form>
  )
}

Formulario.propTypes = {
    find: PropTypes.object.isRequired,
    setFind: PropTypes.func.isRequired,
    setConsultar: PropTypes.func.isRequired
}

export default Formulario
