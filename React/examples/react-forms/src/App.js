import logo from "./logo.svg";
import "./App.css";
import FormComponentUncontrolled from "./FormComponentUncontrolled.react";
import FormComponentControlled from "./FormComponentControlled.react";

function App() {
  return (
    <div className="App">
      <a href="https://www.digitalocean.com/community/tutorials/how-to-build-forms-in-react">
        https://www.digitalocean.com/community/tutorials/how-to-build-forms-in-react
      </a>
      <FormComponentUncontrolled />
      <FormComponentControlled />
    </div>
  );
}

export default App;
