import React from 'react';

import HomePage from '../../Containers/HomePage';
import SwipePage from '../../Containers/SwipePage';
import AllMessages from '../../Containers/Chat/AllMessages';
import { Route, Switch } from 'react-router-dom';

// temporary Route for testing 

import ChatContainer from '../../Containers/Chat/ChatContainer';



const AllRoutes = () => {
	return (
		<Switch>
      <Route exact path = '/' component= { HomePage } />
      <Route exact path = '/swipe' component= { SwipePage } />
      <Route exact path = '/chat' component= { ChatContainer } />
      <Route exact path = '/messages' component = { AllMessages} />

    </Switch>
		)
};

export default AllRoutes;
