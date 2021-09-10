import {Button, Col, Container, Row, Table} from "react-bootstrap";
import Firebase from "firebase/compat";
import {Redirect} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Startpage() {
    const [allTasks, setAllTasks] = useState()
    const [runningTask, setRunningTask] = useState(0)

    useEffect(() => {
            Firebase.app().database()
                .ref(`users/${Firebase.app().auth().currentUser?.uid}`)
                .get()
                .then(snapshot => {
                    Firebase.app().database()
                        .ref(`users/${Firebase.app().auth().currentUser?.uid}`)
                        .update({
                            eMail: parseInt(snapshot.val()?.eMail) ? parseInt(snapshot.val()?.eMail) : Firebase.app().auth().currentUser.email,
                            day: snapshot.val().day ? snapshot.val().day : 0
                        })
                })

            Firebase.app().database()
                .ref(`users/${Firebase.app().auth().currentUser?.uid}`)
                .get()
                .then(snapshot => {
                    let updates = false
                    if (snapshot.val().day !== 0) {
                        let actualDate = snapshot.val().day.split(".")
                        let actualDay = actualDate[0]
                        let actualMonth = actualDate[1]
                        let actualYear = actualDate[2]


                        if (actualDay !== new Date().getDate()) {
                            updates = true
                        } else if (actualMonth !== new Date().getMonth()) {
                            updates = true
                        } else if (actualYear !== new Date().getFullYear()) {
                            updates = true
                        }
                    }

                    if (updates === true) {
                        Firebase.app().database()
                            .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks`)
                            .get()
                            .then(snapshot => {
                                const objects = Object.values(snapshot.val() || {});

                                Firebase.app().database()
                                    .ref(`users/${Firebase.app().auth().currentUser?.uid}/deletedtasks`)
                                    .get()
                                    .then(snapshot => {
                                        const objects2 = Object.values(snapshot.val() || {});
                                        let list = [...objects, ...objects2]

                                        list.map((item, index)=> {
                                            Firebase.app().database()
                                                .ref(`users/${Firebase.app().auth().currentUser?.uid}/${item.name}`)
                                                .update({
                                                    tag: "0:0"
                                                })
                                        })
                                        })


                            })
                    }
                })

            Firebase.app().database()
                .ref(`users/${Firebase.app().auth().currentUser?.uid}`)
                .get()
                .then(snapshot => {
                    Firebase.app().database()
                        .ref(`users/${Firebase.app().auth().currentUser?.uid}`)
                        .update({
                            day: new Date().getDate() + "." + new Date().getMonth() + "." + new Date().getFullYear()
                        })
                })

            Firebase.app().database()
                .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks`)
                .get()
                .then(snapshot => {
                    setAllTasks(Object.keys(snapshot.val() || {}))
                })

            Firebase.app().database()
                .ref(`users/${Firebase.app().auth().currentUser?.uid}`)
                .get()
                .then(snapshot => {
                    if (runningTask === 0) {
                        setRunningTask(snapshot.val()?.runningTask || null)
                    }
                })
        }
        ,
        [runningTask]
    )

    function startClicked(task) {
        console.log(runningTask)
        if (runningTask !== null) {
            stopClicked(runningTask)
        }

        Firebase.app().database()
            .ref(`users/${Firebase.app().auth().currentUser?.uid}`)
            .update({
                runningTask: task
            })

        Firebase.app().database()
            .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks/${task}`)
            .update({
                start: Date.now()
            })

        setRunningTask(task)
    }

    function stopClicked() {
        Firebase.app().database()
            .ref(`users/${Firebase.app().auth().currentUser?.uid}`)
            .get()
            .then(snapshot => {

                Firebase.app().database()
                    .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks/${snapshot.val().runningTask}`)
                    .get()
                    .then(snapshot => {

                        Firebase.app().database()
                            .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks/${runningTask}`)
                            .get()
                            .then(snapshot => {
                                let hours = Math.floor((Date.now() - snapshot.val().start) / 1000 / 3600)
                                let minutes = Math.floor((Date.now() - snapshot.val().start) / 1000 / 60 - (Math.floor((Date.now() - snapshot.val().start) / 1000 / 3600) * 60))
                                let time = hours + ":" + minutes

                                if (snapshot.val().tag === 0) {
                                    Firebase.app().database()
                                        .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks/${runningTask}`)
                                        .update({
                                            tag: time
                                        })
                                } else {
                                    let oldTime = snapshot.val().tag.split(":")
                                    let newHours = Math.floor((parseInt(oldTime[1]) + minutes) / 60)
                                    if (parseInt(oldTime[1]) + minutes >= 60) {
                                        hours = parseInt(oldTime[0]) + hours + newHours
                                        minutes = (parseInt(oldTime[1]) + minutes) - newHours * 60
                                    } else {
                                        hours = parseInt(oldTime[0]) + hours
                                        minutes = parseInt(oldTime[1]) + minutes
                                    }

                                    Firebase.app().database()
                                        .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks/${runningTask}`)
                                        .update({
                                            tag: hours + ":" + minutes
                                        })
                                }

                                hours = Math.floor((Date.now() - snapshot.val().start) / 1000 / 3600)
                                minutes = Math.floor((Date.now() - snapshot.val().start) / 1000 / 60 - (Math.floor((Date.now() - snapshot.val().start) / 1000 / 3600) * 60))
                                time = hours + ":" + minutes

                                if (snapshot.val().woche === 0) {
                                    Firebase.app().database()
                                        .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks/${runningTask}`)
                                        .update({
                                            woche: time
                                        })
                                } else {
                                    let oldTime = snapshot.val().woche.split(":")
                                    let newHours = Math.floor((parseInt(oldTime[1]) + minutes) / 60)
                                    if (parseInt(oldTime[1]) + minutes >= 60) {
                                        hours = parseInt(oldTime[0]) + hours + newHours
                                        minutes = (parseInt(oldTime[1]) + minutes) - newHours * 60
                                    } else {
                                        hours = parseInt(oldTime[0]) + hours
                                        minutes = parseInt(oldTime[1]) + minutes
                                    }

                                    Firebase.app().database()
                                        .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks/${runningTask}`)
                                        .update({
                                            woche: hours + ":" + minutes
                                        })
                                }

                                hours = Math.floor((Date.now() - snapshot.val().start) / 1000 / 3600)
                                minutes = Math.floor((Date.now() - snapshot.val().start) / 1000 / 60 - (Math.floor((Date.now() - snapshot.val().start) / 1000 / 3600) * 60))
                                time = hours + ":" + minutes

                                if (snapshot.val().monat === 0) {
                                    Firebase.app().database()
                                        .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks/${runningTask}`)
                                        .update({
                                            monat: time
                                        })
                                } else {
                                    let oldTime = snapshot.val().monat.split(":")
                                    let newHours = Math.floor((parseInt(oldTime[1]) + minutes) / 60)
                                    if (parseInt(oldTime[1]) + minutes >= 60) {
                                        hours = parseInt(oldTime[0]) + hours + newHours
                                        minutes = (parseInt(oldTime[1]) + minutes) - newHours * 60
                                    } else {
                                        hours = parseInt(oldTime[0]) + hours
                                        minutes = parseInt(oldTime[1]) + minutes
                                    }

                                    Firebase.app().database()
                                        .ref(`users/${Firebase.app().auth().currentUser?.uid}/tasks/${runningTask}`)
                                        .update({
                                            monat: hours + ":" + minutes
                                        })
                                }
                            })
                        console.log(Math.floor((Date.now() - snapshot.val().start) / 1000 / 3600) + ":" +
                            Math.floor((Date.now() - snapshot.val().start) / 1000 / 60 - (Math.floor((Date.now() - snapshot.val().start) / 1000 / 3600) * 60)))
                    })
            })

        Firebase.app().database()
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
                                <Button disabled={runningTask === task}
                                        onClick={() => startClicked(task)}>start</Button>
                            </th>
                            <th>
                                <Button disabled={runningTask !== task}
                                        onClick={() => stopClicked()}>stop</Button>
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