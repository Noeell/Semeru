import {Col, Container, Row, Table} from "react-bootstrap";
import Firebase from "firebase/compat";
import {useEffect, useState} from "react";

export default function Tag() {
    const [allTasks, setAllTasks] = useState()

    useEffect(() => {
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

                        list = list.filter(item => (item.tag !== 0 && item.tag !== "0:0" && item.tag !== undefined))

                        list.sort((a, b) => {
                            let timeA = a.tag.split(":")
                            let timeB = b.tag.split(":")
                            let hoursA = timeA[0]
                            let hoursB = timeB[0]
                            let minutesA = timeA[1]
                            let minutesB = timeB[1]

                            if (hoursA > hoursB) {
                                return -1
                            } else if (hoursB > hoursA) {
                                return 1
                            } else {
                                if (minutesA > minutesB) {
                                    return -1
                                } else if (minutesB > minutesA) {
                                    return 1
                                } else {
                                    return 0
                                }
                            }
                        })

                        setAllTasks(list);
                    })
            })

    }, [])

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1>Day</h1>
                    </Col>
                </Row>
                <br/>
                <Table striped>
                    <thead>
                    <tr>
                        <th scope={"col"}>#</th>
                        <th scope={"col"}>Beschreibung</th>
                        <th scope={"col"}>Zeit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {allTasks?.map((task, index) =>
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <th width={"60%"}>{task.name}</th>
                            <th>{task.tag?.split(":")[1] < 10 ? task.tag?.split(":")[0] + ":0" + task.tag?.split(":")[1] : task.tag}</th>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}