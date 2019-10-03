//
//
//    DELETED
//    FORM MERGED INTO ONE STEP
//
//
// import React, { Component } from 'react';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
// import TextField from 'material-ui/TextField';
// import RaisedButton from 'material-ui/RaisedButton';
// import '../css/Login.css';
// import Footer from '../components/Footer';

// export class PersonalInfo extends Component {
//     continue = e => {
//         e.preventDefault();
//         this.props.nextStep();
//     };

//     back = e => {
//         e.preventDefault();
//         this.props.prevStep();
//     };
//     render() {
//         const { values, handleChange } = this.props;
//         return (
//             <MuiThemeProvider>
//                 <React.Fragment>
//                     <AppBar title='Enter Personal Details' />
//                     <div className='container'>
//                         <TextField
//                             style={styles.justify}
//                             hintText='Enter your Address'
//                             floatingLabelText='Address'
//                             onChange={handleChange('Address')}
//                             defaultValue={values.Address}
//                         />
//                         <br />
//                         <TextField
//                             style={styles.justify}
//                             hintText='Enter your City'
//                             floatingLabelText='Last City'
//                             onChange={handleChange('City')}
//                             defaultValue={values.City}
//                         />
//                         <br />
//                         <TextField
//                             style={styles.justify}
//                             hintText='Enter your State'
//                             floatingLabelText='State'
//                             onChange={handleChange('State')}
//                             defaultValue={values.State}
//                         />

//                         <br />

//                         <button
//                             type='button'
//                             class='btn btn-secondary btn-lg'
//                             label='continue'
//                             primary={true}
//                             style={styles.button}
//                             onClick={this.continue}
//                         >
//                             CONTINUE
//                         </button>
//                         <br />
//                         <button
//                             type='button'
//                             class='btn btn-secondary btn-lg'
//                             label='continue'
//                             primary={true}
//                             style={styles.button}
//                             onClick={this.back}
//                         >
//                             BACK
//                         </button>
//                     </div>

//                     <Footer />
//                 </React.Fragment>
//             </MuiThemeProvider>
//         );
//     }
// }

// const styles = {
//     button: {
//         margin: 10
//     }
// };

// export default PersonalInfo;
