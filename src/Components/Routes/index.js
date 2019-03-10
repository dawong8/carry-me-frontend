import React from 'react';

import HomePage from '../../Containers/HomePage';
import EditProfile from '../../Containers/EditProfile';
import WhatGame from '../../Containers/WhatGame';

import { Route, Switch } from 'react-router-dom';




const AllRoutes = () => {
	return (
		<Switch>
      <Route exact path = '/' component= { HomePage } />
      <Route exact path = '/edit' component = { EditProfile} />
      <Route exact path = '/what' component = { WhatGame } />
    </Switch>
		)
};

export default AllRoutes;
