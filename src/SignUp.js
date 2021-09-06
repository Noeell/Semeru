import {useState} from "react";
import Firebase from "firebase/compat";
import {Link, useHistory} from "react-router-dom";
import {Button, Col, Container, FormControl, Row} from "react-bootstrap";

export default function SignUp() {
    const [eMail, setEMail] = useState()
    const [password, setPassword] = useState()
    const [password2, setPassword2] = useState()
    const [errormessage, setErrormessage] = useState("")

    const history = useHistory()

    function checkPassword() {
        if (password === password2) {
            Firebase.auth()
                .createUserWithEmailAndPassword(eMail, password)
                .then(() => Firebase.auth().signInWithEmailAndPassword(eMail, password).then(() => history.push('/startpage')))
                .catch(error => {
                    console.error("could not create user: ", error)
                    setErrormessage("Email or password does not meet our safety requirements")
                })
        } else {
            console.log('Passwort stimmt nicht über ein')
            setErrormessage("Passowrds do not match")
        }
    }

    return (
        <div>
            <Container><br/>
                <Row>
                    <Col>
                        <h1>Sign Up</h1>
                    </Col>
                </Row><br/>
                <Row className={"justify-content-md-center"}>
                    <Col md={"4"}>
                        <div className="form-floating">
                            <FormControl type="email" className="form-control" id="floatingInput"
                                         placeholder="name@example.com"
                                         onChange={e => setEMail(e.target.value)}/>
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                    </Col>
                </Row><br/>
                <Row className={"justify-content-md-center"}>
                    <Col md={"4"}>
                        <div className="form-floating">
                            <FormControl type="password" className="form-control" id="floatingPassword"
                                         placeholder="Password"
                                         onChange={e => setPassword(e.target.value)}/>
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                    </Col>
                </Row><br/>
                <Row className={"justify-content-md-center"}>
                    <Col md={"4"}>
                        <div className="form-floating">
                            <FormControl type="password" className="form-control" id="floatingPassword"
                                         placeholder="Password"
                                         onChange={e => setPassword2(e.target.value)}/>
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Button variant={"primary"} onClick={checkPassword}>Sign Up</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Link to="/">Already have an account? Login here</Link>
                    </Col>
                </Row><br/>
                <Row>
                    <Col>
                        <p className={"text-danger"}>{errormessage}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
