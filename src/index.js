import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";

import NavBar from "./components/NavBar";
import JumboHeader from "./components/JumboHeader";
import SideBar from "./components/SideBar";

const App = () => {
    return (
        <div className='body'>
            <NavBar />
            <JumboHeader />
            {/* <SideBar /> */}
        </div>
    );
};

export default Index;

ReactDOM.render(<App />, document.getElementById("root"));
