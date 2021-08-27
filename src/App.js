import logo from './logo.svg';
import './App.css';
import Login from "./Login";
import {NavLink, Route, Switch} from "react-router-dom";
import Startpage from "./Startpage";

function App() {
    return (
        <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/" component={Startpage}/>
            <Route component={() => <><p>Seite nicht deklariert</p></>}/>
        </Switch>
    );
}

export default App;
