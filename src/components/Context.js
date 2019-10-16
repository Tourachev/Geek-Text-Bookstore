import React from "react";

const Context = React.createContext();

// export const Consumer = Context.Consumer;

// class Provider extends React.Component {
//     state = {
//         username: "Bubba"
//         // isLoggedIn: false
//         // setStatus: () => {}
//     };

//     setStatus = isLoggedIn => {
//         this.setState({ isLoggedIn });
//     };

//     render() {
//         return (
//             <Context.Provider value={this.state}>
//                 {this.props.children}
//             </Context.Provider>
//         );
//     }
// }
export default Context;
