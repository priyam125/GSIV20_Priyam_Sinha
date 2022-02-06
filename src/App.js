import "./App.css";
import Homepage from "./components/Homepage";
import { Route, Switch } from "react-router-dom";
import MovieInfo from "./components/MovieInfo";

function App() {
  return (
    <div className="overflow-x-hidden">
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path='/info' component={MovieInfo} />
      </Switch>
    </div>
  );
}

export default App;
