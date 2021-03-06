import {Button, Col, Container, FormControl, Row, Table} from "react-bootstrap";
import Firebase from "firebase/compat";
import {useEffect, useState} from "react";

export default function NewTask() {
    const [newTaskName, setNewTaskName] = useState("")
    const [m, setM] = useState()
    const [allTasks, setAllTasks] = useState()
    const [selected, setSelected] = useState("")
    const [buttonDisable, setButtonDisable] = useState(true)

    useEffect(() => {
        Firebase.app().database()
            .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks`)
            .get()
            .then(snapshot => {
                setAllTasks(Object.keys(snapshot.val() || {}))
            })
    }, [])

    function addNewTask() {
        setM(null)
        if (newTaskName.trim() !== "" && newTaskName !== null) {
            Firebase.app().database()
                .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks/${newTaskName}`)
                .update({
                    start: 0,
                    tag: 0,
                    woche: 0,
                    monat: 0,
                    name: newTaskName
                })
            Firebase.app().database()
                .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks`)
                .get()
                .then(snapshot => {
                    setAllTasks(Object.keys(snapshot.val() || {}))
                })
            setM("created new Task")
            setNewTaskName("")
        } else {
            setM("please take a valid name")
            setNewTaskName("")
        }
    }

    function deleteTask() {
        Firebase.app().database()
            .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks/${selected}`)
            .get()
            .then(snapshot => {
                Firebase.app().database()
                    .ref(`users/${Firebase.app().auth().currentUser?.uid}/deletedtasks/${selected}`)
                    .update({
                        start: snapshot.val().start,
                        tag: snapshot.val().tag,
                        woche: snapshot.val().woche,
                        monat: snapshot.val().monat,
                        name: snapshot.val().name,
                        }
            )
            })

        Firebase.app().database()
            .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks/${selected}`)
            .remove()

        Firebase.app().database()
            .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks`)
            .get()
            .then(snapshot => {
                setAllTasks(Object.keys(snapshot.val() || {}))
            })

        setSelected("")
        setButtonDisable(true)
    }

    function tableClicked(task) {
        setSelected(task)
        setButtonDisable(false)
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1>Manage Tasks</h1>
                    </Col>
                </Row>
                <br/>
                <Row className={"justify-content-md-center"}>
                    <Col md={"4"}>
                        <div className="form-floating">
                            <FormControl type="text"
                                         placeholder="ddd"
                                         onChange={e => setNewTaskName(e.target.value)}/>
                            <label htmlFor="floatingInput">New Task</label>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {m}<br/>
                        <Button onClick={addNewTask}>new Task</Button><br/>
                    </Col>
                </Row>
                <br/>
                <hr/>
                <br/>
                <h3>current Tasks</h3>
                <br/>
                <Table striped bordered hover>
                    <tbody>
                    {allTasks?.map((task, index) =>
                        <tr key={index} onClick={() => tableClicked(task)}>
                            <th>{task}</th>
                        </tr>
                    )}
                    </tbody>
                </Table>
                <br/>
                <Row>
                    <Col>
                        <h5>selected Task: {selected}</h5>
                        <Button disabled={buttonDisable} onClick={deleteTask}>delete Task</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}