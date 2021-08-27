import {Col, Container, Row} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import Firebase from "firebase/compat";

export default function Startpage() {
    return (
        <div>
         <Container><br/>
             <Row>
                 <Col>
                     <h1>Time Boxing</h1>
                 </Col>
                 <Col>

                 </Col>
                 <Col>
                     <Link to="/statistik">Statistik</Link>
                 </Col>
             </Row>
         </Container>
            {
                !Firebase.app().auth().currentUser && <Redirect to={"/"}/>
            }
        </div>
    );
}