import {Button, Col, Container, Row, Table} from "react-bootstrap";
import Firebase from "firebase/compat";
import {useEffect, useState} from "react";

export default function NewTask() {
    const [newTaskName, setNewTaskName] = useState("")
    const [m, setM] = useState()
    const [allTasks, setAllTasks] = useState()
    const [selected, setSelected] = useState("")
    const [buttonDisable, setButtonDisable] = useState(true)

    useEffect(() => {
        Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
            .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks`)
            .get()
            .then(snapshot => {
                setAllTasks(Object.keys(snapshot.val() || {}))
            })
    })

    function addNewTask() {
        setM(null)
        if (newTaskName !== "" && newTaskName !== null) {
            Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
                .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks/${newTaskName}`)
                .update({
                    start: 0,
                    Tag: 0,
                    Woche: 0,
                    Monat: 0
                })
            Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
                .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks`)
                .get()
                .then(snapshot => {
                    setAllTasks(Object.keys(snapshot.val() || {}))
                })
            setM("created new Task")
            setNewTaskName("")
        } else {
            setM("please take a valid name")
        }
    }

    function deleteTask() {
        Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
            .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks/${selected}`)
            .remove()

        Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
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
                <Row>
                    <Col>
                        <h3>new Task:</h3>
                        <input value={newTaskName} onChange={e => setNewTaskName(e.target.value)}/><br/>
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
                        <tr  key={index} onClick={() => tableClicked(task)}>
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