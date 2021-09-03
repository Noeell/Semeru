import {Col, Container, Row} from "react-bootstrap";
import {BrowserRouter as Router, Link, Route, useParams} from "react-router-dom";
import SignUp from "./SignUp";
import Startpage from "./Startpage";
import Tag from "./Tag";
import Woche from "./Woche";
import Monat from "./Monat";
import Login from "./Login";

export default function Statistik(){

    const HeaderLink = ({page, display, selected}) => {
        const title = page.charAt(0).toUpperCase() + page.slice(1);
        return <Link to={`/${page}`} className='headerlink-title'>
            {display || title}
            <div className={selected ? 'headerlink-dot-active' : 'headerlink-dot'}>•</div>
        </Link>;
    };

    const Header = () => {
        const page = window.location.pathname.replace('/', '') || 'statistics';
        return (
            <div>
                <br/>
                <div className='header'>
                    <HeaderLink page='day' selected={page === 'day'} />
                    <HeaderLink page='week' selected={page === 'week'} />
                    <HeaderLink page='month' selected={page === 'month'} />
                </div>
            </div>

        );
    };

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1>Statistics</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Router>
                            <Route path='/:page' component={Header} />

                            <Route exact path="/day" component={Tag}/>
                            <Route exact path="/week" component={Woche}/>
                            <Route exact path="/month" component={Monat}/>
                        </Router>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}