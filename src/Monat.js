import {Col, Container, Row, Table} from "react-bootstrap";

export default function Monat() {
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1>Monat</h1>
                    </Col>
                </Row><br/>
                <Row>
                    <Col>
                        <Table>
                            <thead>
                            <tr>
                                <th scope={"col"}>#</th>
                                <th scope={"col"}>Beschreibung</th>
                                <th scope={"col"}>Zeit</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>Hausaufgaben</td>
                                <td>10:24</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}