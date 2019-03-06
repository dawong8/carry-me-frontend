import React from 'react';

import HomePage from '../../Containers/HomePage';


import { Route, Switch } from 'react-router-dom';




const AllRoutes = () => {
	return (
		<Switch>
      <Route exact path = '/' component= { HomePage } />

    </Switch>
		)
};

export default AllRoutes;
