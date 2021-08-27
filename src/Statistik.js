import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Statistik() {
    return (
        <div>
            <Container>
                <br/>
                <Row>
                    <Col>
                        <h1>Statistik</h1>
                    </Col>
                    <Col>

                    </Col>
                    <Col>
                        <Link to="/startseite">Time Boxing</Link>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}