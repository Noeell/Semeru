import Firebase from "firebase/compat";
import {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {Button, Col, Container, Row, Form} from "react-bootstrap";

const firebaseConfig = {
    apiKey: "AIzaSyB1AltKxep7brHa87pM7x8YOS7Oo48AYMQ",
    authDomain: "localhost",
    databaseURL: "https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/",
    storageBucket: "gs://semeru-ef465.appspot.com"
}

Firebase.initializeApp(firebaseConfig);

export default function Login() {

    const [eMail, setEMail] = useState()
    const [password, setPassword] = useState()

    const history = useHistory();

    function buttonPressed() {
        if (eMail !== null && password !== null) {
            Firebase.auth()
                .signInWithEmailAndPassword(eMail, password)
                .then(() => history.push('/startseite'))
                .catch(error => console.error("could not create user: ", error))
        }
    }

    return (
        <div><br/>
            <Container>
                <Row>
                    <h1>Login</h1>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <h4>E-Mail</h4>
                        <input onChange={e => setEMail(e.target.value)}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <h4>Passwort</h4>
                        <input type="password" name="password" onChange={e => setPassword(e.target.value)}/>
                    </Col>
                </Row><br/>
                <Row>
                    <Col>
                        <Button variant={"primary"} onClick={buttonPressed}>login</Button>
                    </Col>
                </Row>
                <Row>
                    <Link to="/signup">Sie haben noch kein Konto? Hier registrieren</Link>
                </Row>
            </Container>
        </div>
    );
}