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
import React, { useState } from 'react' ;
import { CSSTransition } from 'react-transition-group';

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
      <NavBar>
        <NavItem icon={<CaretIcon />}>
            <DropdownMenu>

            </DropdownMenu>
        </NavItem>
      </NavBar>
    </>
  );
}

function DropdownMenu(){
  const [activeMenu, setActiveMenu] = useState('main');
  function DropdownItem(props){
    return (
      <a href="#" className="menu-item">
        <span className = "menu-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    )
  }
  return(
    <div className="dropdown">
      <CSSTransition 
        in={activeMenu === 'Subsidiaries'} 
        unmountOnExit 
        timeout ={500}
        classNames="menu-secondary"
        >
          <div className= "menu">

          <DropdownItem>Countries</DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon/>}
            rightIcon={<ChevronIcon />}>
            Subsidiaries
            Add Subsidiary 
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className = "nav-menu">
      <a href= "#" className = "nav-item" onClick={() => setOpen(!open)}>

      </a>
      {open && props.children}
    </li>
  );
}


export default App;
