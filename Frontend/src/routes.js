import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/signup';
import Home from './pages/Home'


const getRoutes = (role, token) => {
	let routes;
	if (token && role === 'admin') {
		routes = (
      <Switch>
        <Route exact path="/">
          <SignUp />
        </Route>
        <Redirect to="/"></Redirect>
      </Switch>
    );
	} else if (token && role === 'Worker') {
		routes = (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Redirect to="/"></Redirect>
      </Switch>
    );
	} else if (token && role === 'Manager') {
		routes = (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Redirect to="/"></Redirect>
      </Switch>
    );
	} else {
		routes = (
			<Switch>
				<Route exact path='/'>
					<Login />
				</Route>
				<Route exact path='/signup'>
					<SignUp />
				</Route>
				<Route exact path='/login'>
					<Login />
				</Route>

				<Redirect to='/login'></Redirect>
			</Switch>
		);
	}
	return routes;
};

export default getRoutes;
