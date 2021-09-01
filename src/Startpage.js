import {Card, Col, Container, Row} from "react-bootstrap";
import Firebase from "firebase/compat";
import {Redirect} from "react-router-dom";

export default function Startpage() {
    Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
        .ref(`users/${Firebase.app().auth().currentUser?.uid}`)
        .get()
        .then(snapshot => {
            Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
                .ref(`users/${Firebase.app().auth().currentUser?.uid}`)
                .update( {
                    eMail: parseInt(snapshot.val()?.eMail)? parseInt(snapshot.val()?.eMail): Firebase.app().auth().currentUser.email
                })
        })

    return (
        <div>
         <Container>
             <Row>
                 <Col>
                     <h1>Time Boxing</h1>
                 </Col>
             </Row>
             <Row>
                 <Card>
                     <Card.Title>hello</Card.Title>
                 </Card>
             </Row>
         </Container>

            {
                !Firebase.app().auth().currentUser && <Redirect to={"/"}/>
            }
        </div>
    );
}