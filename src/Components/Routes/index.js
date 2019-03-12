import React from 'react';

import HomePage from '../../Containers/HomePage';
import SwipePage from '../../Containers/SwipePage';
import { Route, Switch } from 'react-router-dom';

// temporary Route for testing 

import ChatContainer from '../../Containers/Chat/ChatContainer';



const AllRoutes = () => {
	return (
		<Switch>
      <Route exact path = '/' component= { HomePage } />
      <Route exact path = '/swipe' component= { SwipePage } />
      <Route exact path = '/chat' component= { ChatContainer } />

    </Switch>
		)
};

export default AllRoutes;
