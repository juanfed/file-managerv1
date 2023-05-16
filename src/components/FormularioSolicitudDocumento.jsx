import React, { Component } from 'react';

class FormularioSolicitudDocumento extends Component {
  render() {
    return (
      <div className="container mt-3">
        <h1>Solicitar Documento</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="asunto" className="form-label">Asunto</label>
            <input type="text" className="form-control" id="asunto" />
          </div>
          <div className="mb-3">
            <label htmlFor="entidadesPublicas" className="form-label">Entidades Públicas</label>
            <select className="form-select" id="entidadesPublicas">
              <option selected>Seleccione una opción</option>
              <option value="1">Entidad Pública 1</option>
              <option value="2">Entidad Pública 2</option>
              <option value="3">Entidad Pública 3</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="mensaje" className="form-label">Mensaje</label>
            <textarea className="form-control" id="mensaje" rows="3"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      </div>
    );
  }
}

export default FormularioSolicitudDocumento;
