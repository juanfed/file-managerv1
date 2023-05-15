import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";

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
    // Aquí puedes añadir la lógica para enviar la información del formulario a la base de datos
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

            <Form.Group controlId="formCampoTexto">
              <Form.Label>Campo de Texto</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el texto" />
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
