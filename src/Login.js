import Firebase from "firebase/compat";
import {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {Button, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {FirebaseError} from "firebase/firebase-app";


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
    const [messageField, setMessageField] = useState("")

    const history = useHistory();

    function buttonPressed() {
        if (eMail !== null && password !== null) {
            Firebase.auth()
                .signInWithEmailAndPassword(eMail, password)
                .then(() => {
                    history.push('/startpage')
                    setMessageField("")
                })
                .catch(error => {
                    console.error("could not create user: ", error)
                    setMessageField("Wrong E-mail or password")
                })
        }
    }

    return (
        <div><br/>
            <Container>
                <Row>
                    <h1>Login</h1>
                </Row>
                <br/>
                <Row className={"justify-content-md-center"}>
                    <Col md={"4"}>
                        <div className="form-floating">
                            <FormControl type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                                   onChange={e => setEMail(e.target.value)}/>
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                    </Col>
                </Row>
                <br/>
                <Row className={"justify-content-md-center"}>
                    <Col md={"4"}>
                        <div className="form-floating">
                            <FormControl type="password" className="form-control" id="floatingPassword" placeholder="Password"
                                   onChange={e => setPassword(e.target.value)}/>
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                    </Col>
                </Row><br/>
                <Row>
                    <Col>
                        <Button variant={"primary"} onClick={buttonPressed}>login</Button>
                    </Col>
                    <Row>
                        <Link to="/signup">No Account yet? Register here</Link>
                    </Row>
                </Row><br/>
                <Row>
                    <Col>
                        <p className={"text-danger"}>{messageField}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}