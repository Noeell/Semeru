import './App.css';
import Login from "./Login";
import {NavLink, Route, Switch} from "react-router-dom";
import Startpage from "./Startpage";
import Statistik from "./Statistik";
import SignUp from "./SignUp";

function App() {
    return (
        <Switch>
            <Route path="/statistik" component={Statistik}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/startseite" component={Startpage}/>
            <Route path="/" component={Login}/>
            <Route component={() => <><p>Seite nicht deklariert</p></>}/>
        </Switch>
    );
}

export default App;
