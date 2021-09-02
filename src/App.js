import './Header.css';
import './App.css'
import Login from "./Login";
import {BrowserRouter as Router, Link, Redirect, Route} from "react-router-dom";
import Startpage from "./Startpage";
import Statistik from "./Statistik";
import SignUp from "./SignUp";
import Firebase from "firebase/compat";
import NewTask from "./NewTask";

function App() {

    const HeaderLink = ({page, display, selected}) => {
        const title = page.charAt(0).toUpperCase() + page.slice(1);
        return <Link to={`/${page}`} className='headerlink-title'>
            {display || title}
            <div className={selected ? 'headerlink-dot-active' : 'headerlink-dot'}>•</div>
        </Link>;
    };

    const Header = () => {
        const page = window.location.pathname.replace('/', '') || 'startseite';
        console.log(page)
        return (
            <div>
                <br/>
                <div className='header'>
                    <HeaderLink page='startpage' selected={page === 'startpage'}/>
                    <HeaderLink page='statistics' selected={page === 'statistics'}/>
                    <HeaderLink page='manage-tasks' display={'Manage Tasks'} selected={page === 'manage-tasks'}/>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Router>
                <Route path='/startpage' component={Header}/>
                <Route path='/statistics' component={Header}/>
                <Route path='/manage-tasks' component={Header}/>

                <Route exact path="/statistics" component={Statistik}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/startpage" component={Startpage}/>
                <Route exact path="/manage-tasks" component={NewTask}/>
                <Route exact path="/" component={Login}/>
            </Router>

            {
                !Firebase.app().auth().currentUser && <Redirect to={"/"}/>
            }
        </div>

    );
}

export default App;
