import "./App.css";
import NavBar from "./components/main_frame/NavBar";
import { BrowserRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import { Expenses } from "./components/Pages/Expenses";
import { Finances } from "./components/Pages/Finances";
import { Legal } from "./components/Pages/Legal";
import { Payroll } from "./components/Pages/Payroll";
import { People } from "./components/Pages/People";
import { Countries } from "./components/Pages/Countries";
import { Benefits } from "./components/Pages/Benefits";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route exact path="/"  component={Home} />
            <Route path="/countries" component={Countries} />
            <Route path="/expenses" component={Expenses} />
            <Route path="/finances" component={Finances} />
            <Route path="/legal" component={Legal} />
            <Route path="/payroll" component={Payroll} />
            <Route path="/people" component={People} />
            <Route path="/benefits" component={Benefits} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;