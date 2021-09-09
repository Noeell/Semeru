import Firebase from "firebase/compat";
import {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {Button, Col, Container, FormControl, Row} from "react-bootstrap";

const firebaseConfig = {
    apiKey: "AIzaSyC8VZZZ9afj6V51I3YBfllxMCOUzIcNAiU",
    authDomain: "semeru-c7575.firebaseapp.com",
    databaseURL: "https://semeru-c7575-default-rtdb.firebaseio.com",
    projectId: "semeru-c7575",
    storageBucket: "semeru-c7575.appspot.com",
    messagingSenderId: "959188960077",
    appId: "1:959188960077:web:22bdd9c8a701988aa0ed04",
    measurementId: "G-XMMTK2MWXL"
};
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