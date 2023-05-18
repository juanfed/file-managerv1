import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import axios from 'axios';

import FormularioSolicitudDocumento from "../../FormularioSolicitudDocumento";


const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false); // Definimos el estado para el modal del formulario de solicitar documento
  const [showModalIncribir, setShowModalIncribir] = useState(false)
  const dispatch = useDispatch();

  const handleCloseModal = () => setShowModal(false); // Función para cerrar el modal
  const handleShowModal = () => setShowModal(true); // Función para mostrar el modal

  const handleCloseModalIncribir = () => setShowModalIncribir(false)
  const handleShowModalIncribir = () => setShowModalIncribir(true)

  const handleSubmit = (e) => {
    e.preventDefault();
    // Obtén la URL base del servidor desde una variable de entorno
    const serverUrl = process.env.REACT_APP_SERVER_URL;
  
    // Configura Axios para permitir solicitudes en HTTP
    const axiosInstance = axios.create({
      baseURL: serverUrl,
      // Habilita solicitudes en HTTP
      // Nota: Esto puede generar advertencias de seguridad en el navegador
      // ya que estás realizando solicitudes no seguras en un entorno seguro.
      // Asegúrate de comprender los riesgos asociados antes de habilitar esto.
      // Siempre es preferible utilizar conexiones seguras (HTTPS) en producción.
      withCredentials: false,
      // Forzar el uso de HTTP en lugar de HTTPS
      // Nota: Esto solo afecta la solicitud actual, no la URL base.
      // Si la URL base es HTTPS, seguirá siendo HTTPS.
      // Asegúrate de que la URL base sea HTTP para que esto tenga efecto.
      // Si no, tendrás que modificar la URL base también.
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });
  
    // Realiza la solicitud utilizando Axios configurado con las opciones de HTTP
    axiosInstance.post('/apis/registerCitizen', {
      id: e.target.formNumeroCedula.value,
      name: e.target.formCampoNombre.value,
      address: e.target.formCampoDireccion.value,
      email: e.target.formCampoEmail.value,
      operadorId: e.target.formOperadoresId.value,
      operadorName: e.target.formOperadores.value,
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    handleCloseModalIncribir();
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm  p-3">
      <Link className="navbar-brand ms-5" to="/dashboard">
        Carpeta Ciudadana
      </Link>

      <ul className="navbar-nav ms-auto me-5">
        {isAuthenticated ? (
          <>
            <li className="nav-item mx-2">
              <p className="my-0 mt-2 mx-2">
                <span className="fw-bold">{user.displayName}</span>
              </p>
            </li>
            <li className="nav-item mx-2">
              <button className="nav-link btn btn-primary" onClick={handleShowModalIncribir}>
                Inscribir operador
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-secondary" onClick={handleShowModal}>Solicitar Documento</button>
            </li>
            <li className="nav-item mx-2">
              <Link className="btn btn-primary" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-success"
                onClick={() => dispatch(SignOutUser())}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item mx-2">
              <Link className="btn btn-primary btn-sm" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-success btn-sm" to="/register">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
      <Modal show={showModal} onHide={handleCloseModal}> {/* Aquí definimos el modal */}
        <Modal.Header closeButton>
          <Modal.Title>Solicitud de Documento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormularioSolicitudDocumento />
        </Modal.Body>
      </Modal>
      {/*
             "id": 1234567899,
  "name": "Carlos Andres Caro",
  "address": "Cra 54 # 45 -67",
  "email": "caro@mymail.com",
  "operatorId": 1,
  "operatorName": "Operador Ciudadano"
          */}

      <Modal show={showModalIncribir} onHide={handleCloseModalIncribir}>
        <Modal.Header closeButton>
          <Modal.Title>Inscribir Operador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNumeroCedula">
              <Form.Label>Numero de Cedula</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el numero de cedula" />
            </Form.Group>

            <Form.Group controlId="formCampoNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Ingrese su nombre" />
            </Form.Group>

            <Form.Group controlId="formCampoDireccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control type="text" placeholder="Ingrese su dirección" />
            </Form.Group>

            <Form.Group controlId="formCampoEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Ingrese su email" />
            </Form.Group>

            <Form.Group controlId="formOperadoresId">
              <Form.Label>Operador ID</Form.Label>
              <Form.Control as="select" defaultValue="Seleccione un operador ID...">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>


            <Form.Group controlId="formOperadores">
              <Form.Label>Lista de Operadores</Form.Label>
              <Form.Control as="select" defaultValue="Seleccione un operador...">
                <option>Operador 1</option>
                <option>Operador 2</option>
                <option>Operador 3</option>
                <option>Operador 4</option>
                <option>Operador 5</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </nav>
  );
};

export default Navbar;
