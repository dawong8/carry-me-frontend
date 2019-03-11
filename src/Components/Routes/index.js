import React from 'react';

import HomePage from '../../Containers/HomePage';
import SwipePage from '../../Containers/SwipePage';
import { Route, Switch } from 'react-router-dom';




const AllRoutes = () => {
	return (
		<Switch>
      <Route exact path = '/' component= { HomePage } />
      <Route exact path = '/swipe' component= { SwipePage } />

    </Switch>
		)
};

export default AllRoutes;
