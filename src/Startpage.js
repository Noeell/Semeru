import {Button, Col, Container, Row, Table} from "react-bootstrap";
import Firebase from "firebase/compat";
import {Redirect} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Startpage() {
    const [allTasks, setAllTasks] = useState()
    const [runningTask, setRunningTask] = useState(null)
    const [time, setTime] = useState()

    let minutes
    let hours


    Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
        .ref(`users/${Firebase.app().auth().currentUser?.uid}`)
        .get()
        .then(snapshot => {
            Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
                .ref(`users/${Firebase.app().auth().currentUser?.uid}`)
                .update({
                    eMail: parseInt(snapshot.val()?.eMail) ? parseInt(snapshot.val()?.eMail) : Firebase.app().auth().currentUser.email
                })
        })

    useEffect(() => {
        Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
            .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks`)
            .get()
            .then(snapshot => {
                setAllTasks(Object.keys(snapshot.val() || {}))
            })
    })

    function startClicked(task) {
        if (runningTask !== null) {
            stopClicked(runningTask)
        }

        Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
            .ref(`users/${Firebase.app().auth().currentUser?.uid}`)
            .update({
                runningTask: task
            })

        Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
            .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks/${task}`)
            .update({
                start: Date.now()
            })

        setRunningTask(task)
    }

    function stopClicked() {
        Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
            .ref(`users/${Firebase.app().auth().currentUser?.uid}`)
            .get()
            .then(snapshot => {
                Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
                    .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks/${snapshot.val().runningTask}`)
                    .get()
                    .then(snapshot => {
                        setTime(Date.now() - snapshot.val().start)
                        console.log(Math.floor((Date.now() - snapshot.val().start)/1000/3600) + ":" +
                            Math.floor((Date.now() - snapshot.val().start)/1000/60 - (Math.floor((Date.now() - snapshot.val().start)/1000/3600)*60) ))
                    })
            })

        setRunningTask(null)
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1>Time Boxing</h1>
                    </Col>
                </Row>
                <Table striped>
                    <tbody>
                    {allTasks?.map((task, index) =>
                        <tr key={index}>
                            <th width={"60%"}>{task}</th>
                            <th>
                                <Button onClick={() => startClicked(task)}>start</Button>
                            </th>
                            <th>
                                <Button onClick={() => stopClicked()}>stop</Button>
                            </th>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Container>

            {
                !Firebase.app().auth().currentUser && <Redirect to={"/"}/>
            }
        </div>
    );
}