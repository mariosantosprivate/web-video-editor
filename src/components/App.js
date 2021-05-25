import React from 'react'
import SignUp from './SignUp';
import { Container } from 'react-bootstrap'
import AuthProvider from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import LogIn from './LogIn'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
import MyVideos from './MyVideos'
import 'semantic-ui-css/semantic.min.css'
function App() {
    return (

        <Container fluid
            className='d-flex align-items-center justify-content-center'
            style={{ minHeight: "100vh", minWidth: "100vw", overflowX: '-moz-hidden-unscrollable', backgroundColor: '#191c1f' }}
        >
            <div style={{ minHeight: "100vh", minWidth: "100vw" }}>
                <Router>
                    <AuthProvider>
                        <Switch>
                            <PrivateRoute exact path='/' component={Dashboard} />
                            <PrivateRoute path='/update-profile' component={UpdateProfile} />
                            <PrivateRoute path='/my-videos' component={MyVideos} />
                            <Route path='/signup' component={SignUp} />
                            <Route path='/login' component={LogIn} />
                            <Route path='/forgot-password' component={ForgotPassword} />
                        </Switch>
                    </AuthProvider>
                </Router>
            </div>
        </Container>

    )
}

export default App;
