import {Col, Container, Row} from "react-bootstrap";
import {BrowserRouter as Router, Link, Route, useParams} from "react-router-dom";
import SignUp from "./SignUp";
import Startpage from "./Startpage";
import Tag from "./Tag";
import Woche from "./Woche";
import Monat from "./Monat";
import Login from "./Login";

export default function Statistik(){

    const HeaderLink = ({ page }, props) => {
        const title = page.charAt(0).toUpperCase() + page.slice(1);
        return <Link to={`/${page}`} className='headerlink-title'>
            {title}
            <div className={props.selected ? 'headerlink-dot-active' : 'headerlink-dot'}>•</div>
        </Link>;
    };

    const Header = () => {
        const page = useParams().page || 'startseite';

        return (
            <div>
                <br/>
                <div className='header'>
                    <HeaderLink page='tag' selected={page === 'tag'} />
                    <HeaderLink page='woche' selected={page === 'woche'} />
                    <HeaderLink page='monat' selected={page === 'monat'} />
                </div>
            </div>

        );
    };

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1>Statistik</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Router>
                            <Route path='/:page' component={Header} />

                            <Route exact path="/tag" component={Tag}/>
                            <Route exact path="/woche" component={Woche}/>
                            <Route exact path="/monat" component={Monat}/>
                        </Router>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}