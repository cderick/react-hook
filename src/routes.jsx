/* <Route path="/basket" component={BasketContainer} />
<Route path="/payment" component={PaymentContainer} />
<Route path="/user" component={DashboardContainer} />
<Route path="/sandbox" component={Sandbox} />
<Route path="/login" component={EdgeLoginContainer} />
<Route path="/join-organisation" component={JoinOrganistationContainer} /> */

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { APP_PARTIAL_URL } from './constants/config';
import MapContainer from './containers/HomePageContainer/HomePageContainer';

const Routes = () => (
	<BrowserRouter basename={APP_PARTIAL_URL}>
		<Switch>
			<Route exact path="/" component={MapContainer} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
