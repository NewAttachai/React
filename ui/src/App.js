import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Main from './views/Main'
import AddMinmax from './views/AddMinmax'
import ForgotPassword from './views/ForgotPassword'
import ManagePart from './views/ManagePart'
import ManageUsers from './views/ManageUsers'
import MyList from './views/MyList'
import MyProfile from './views/MyProfile'
import MySet from './views/MySet'
import Search from './views/Search'

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/addminmax" component={AddMinmax} />
      <Route path="/forgotpassword" component={ForgotPassword} />
      <Route path="/mpart" component={ManagePart} />
      <Route path="/musers" component={ManageUsers} />
      <Route path="/mylist" component={MyList} />
      <Route path="/profile" component={MyProfile} />
      <Route path="/myset" component={MySet} />
      <Route path="/search" component={Search} />
    </Switch>
  </Router>
)
