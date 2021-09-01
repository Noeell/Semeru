import './Header.css';
import './App.css'
import Login from "./Login";
import {Link, NavLink, Redirect, Route, BrowserRouter as Router, Switch, useParams} from "react-router-dom";
import Startpage from "./Startpage";
import Statistik from "./Statistik";
import SignUp from "./SignUp";
import Firebase from "firebase/compat";
import NewTask from "./NewTask";

function App() {

    Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
        .ref(`users/${Firebase.app().auth().currentUser?.uid}`)
        .get()
        .then(snapshot => {
            Firebase.app().database('https://semeru-ef465-default-rtdb.europe-west1.firebasedatabase.app/')
                .ref(`users/${Firebase.app().auth().currentUser?.uid}`)
                .update( {
                    test:10
                })
        })

    const HeaderLink = ({page}, props) => {
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
                    <HeaderLink page='startseite' selected={page === 'startseite'}/>
                    <HeaderLink page='statistik' selected={page === 'statistik'}/>
                    <HeaderLink page='New Task' selected={page === 'new task'}/>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Router>
                <Route path='/:page' component={Header}/>

                <Route exact path="/statistik" component={Statistik}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/startseite" component={Startpage}/>
                <Route exact path="/new task" component={NewTask}/>
                <Route exact path="/" component={Login}/>
            </Router>

            {
                !Firebase.app().auth().currentUser && <Redirect to={"/"}/>
            }
        </div>

    );
}

export default App;
