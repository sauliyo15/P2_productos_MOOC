import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export default function Formulario(props) {

  const categoriasOptions = props.categorias.map((categoria) => (
    <option key={categoria} value={categoria}>
      {categoria}
    </option>
  ));

  return (
    <div>
      <h2 id="catalogo">Catálogo</h2>
      <Container>
        <Row>
          <Col>
            <p>Buscar</p>
            <input
              type="text"
              id="filtro"
              value={props.consulta}
              onChange={(e) => props.setConsulta(e.target.value)}
              placeholder="Producto a buscar"
            />
            <br />
            <br />
            <Button
              id="buscador"
              onClick={() => props.buscar()}
              variant="primary"
            >
              Buscar
            </Button>
          </Col>
          <Col>
            <p>Filtrar</p>
            <Form.Select id="selector" aria-label="Default select example" onChange={(e) => props.filtrar(e.target.value)}>
              {categoriasOptions}
            </Form.Select>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
