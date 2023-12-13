import React from 'react';
import './Form.css'

const Form = () => {
  return (
    <div className="form-container">
      <form className="rounded-form">
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" placeholder="Ingresa tu nombre" />

        <label htmlFor="contrasena">Contraseña:</label>
        <input type="password" id="contrasena" name="contrasena" placeholder="Ingresa tu contraseña" />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Form;