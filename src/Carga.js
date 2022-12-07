import Spinner from 'react-bootstrap/Spinner';

function Carga(props) {
  if (props.mostrarCarga) {
    return (
      <Spinner id="loading" className="spinner" animation="border" variant="info">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
}

export default Carga;