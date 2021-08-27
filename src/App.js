import logo from './logo.svg';
import './App.css';
import Login from "./Login";
import {NavLink, Route, Switch} from "react-router-dom";
import Startpage from "./Startpage";
import signup from "./signup";
import Statistik from "./Statistik";

function App() {
    return (
        <Switch>
            <Route path="/statistik" component={Statistik}/>
            <Route path="/signup" component={signup}/>
            <Route path="/" component={Login}/>
            <Route component={() => <><p>Seite nicht deklariert</p></>}/>
        </Switch>
    );
}

export default App;
