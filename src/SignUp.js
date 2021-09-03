import {useState} from "react";
import Firebase from "firebase/compat";
import {Link, useHistory} from "react-router-dom";
import {Button, Col, Container, Row} from "react-bootstrap";

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
                <Row>
                    <Col>
                        <h4>E-Mail</h4>
                        <input onChange={e => setEMail(e.target.value)}/>
                    </Col>
                </Row><br/>
                <Row>
                    <Col>
                        <h4>Password</h4>
                        <input type="password" name="password" onChange={e => setPassword(e.target.value)}/>
                    </Col>
                </Row><br/>
                <Row>
                    <Col>
                        <h4>confirm Password</h4>
                        <input type="password" name="password" onChange={e => setPassword2(e.target.value)}/>
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
                        <p Class={"text-danger"}>{errormessage}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
