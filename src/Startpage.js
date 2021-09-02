import {Button, Col, Container, Row, Table} from "react-bootstrap";
import Firebase from "firebase/compat";
import {Redirect} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Startpage() {
    const [allTasks, setAllTasks] = useState()
    const [runningTask, setRunningTask] = useState(0)

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

        Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
            .ref(`users/${Firebase.app().auth().currentUser?.uid}`)
            .get()
            .then(snapshot => {
                if (runningTask === 0){
                    setRunningTask(snapshot.val()?.runningTask || null)
                }
            })
    })

    function startClicked(task) {
        console.log(runningTask)
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

                        Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
                            .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks/${runningTask}`)
                            .get()
                            .then(snapshot => {
                                let hours = Math.floor((Date.now() - snapshot.val().start)/1000/3600)
                                let minutes = Math.floor((Date.now() - snapshot.val().start)/1000/60 - (Math.floor((Date.now() - snapshot.val().start)/1000/3600)*60))
                                let time = hours + ":" + minutes

                                if (snapshot.val().Tag === 0){
                                    Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
                                        .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks/${runningTask}`)
                                        .update({
                                            Tag: time
                                        })
                                } else {
                                    let oldTime = snapshot.val().Tag.split(":")
                                    let newHours = Math.floor((parseInt(oldTime[1]) + minutes) / 60)
                                    if (parseInt(oldTime[1]) + minutes >= 60){
                                        hours = parseInt(oldTime[0]) + hours + newHours
                                        minutes = (parseInt(oldTime[1]) + minutes) - newHours * 60
                                    } else{
                                        hours = parseInt(oldTime[0]) + hours
                                        minutes = parseInt(oldTime[1]) + minutes
                                    }

                                    Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
                                        .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks/${runningTask}`)
                                        .update({
                                            Tag: hours + ":" + minutes
                                        })
                                }
                                if (snapshot.val().Woche === 0){
                                    Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
                                        .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks/${runningTask}`)
                                        .update({
                                            Woche: time
                                        })
                                } else {
                                    let oldTime = snapshot.val().Tag.split(":")
                                    let newHours = Math.floor((parseInt(oldTime[1]) + minutes) / 60)
                                    if (parseInt(oldTime[1]) + minutes >= 60){
                                        hours = parseInt(oldTime[0]) + hours + newHours
                                        minutes = (parseInt(oldTime[1]) + minutes) - newHours * 60
                                    } else{
                                        hours = parseInt(oldTime[0]) + hours
                                        minutes = parseInt(oldTime[1]) + minutes
                                    }

                                    Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
                                        .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks/${runningTask}`)
                                        .update({
                                            Woche: hours + ":" + minutes
                                        })
                                }
                                if (snapshot.val().Monat === 0){
                                    Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
                                        .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks/${runningTask}`)
                                        .update({
                                            Monat: time
                                        })
                                } else {
                                    let oldTime = snapshot.val().Tag.split(":")
                                    let newHours = Math.floor((parseInt(oldTime[1]) + minutes) / 60)
                                    if (parseInt(oldTime[1]) + minutes >= 60){
                                        hours = parseInt(oldTime[0]) + hours + newHours
                                        minutes = (parseInt(oldTime[1]) + minutes) - newHours * 60
                                    } else{
                                        hours = parseInt(oldTime[0]) + hours
                                        minutes = parseInt(oldTime[1]) + minutes
                                    }

                                    Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
                                        .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks/${runningTask}`)
                                        .update({
                                            Monat: hours + ":" + minutes
                                        })
                                }
                            })
                        console.log(Math.floor((Date.now() - snapshot.val().start)/1000/3600) + ":" +
                            Math.floor((Date.now() - snapshot.val().start)/1000/60 - (Math.floor((Date.now() - snapshot.val().start)/1000/3600)*60)))
                    })
            })

        Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
            .ref(`users/${Firebase.app().auth().currentUser?.uid}`)
            .update({
                runningTask: null
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
                <br/>
                <Row>
                    <Col>
                        <h3>current Tasks</h3>
                    </Col>
                </Row>
                <Table striped>
                    <tbody>
                    {allTasks?.map((task, index) =>
                        <tr key={index}>
                            <th width={"60%"}>{task}</th>
                            <th>
                                <Button disabled={runningTask === task} onClick={() => startClicked(task)}>start</Button>
                            </th>
                            <th>
                                <Button disabled={runningTask !== task} onClick={() => stopClicked()}>stop</Button>
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