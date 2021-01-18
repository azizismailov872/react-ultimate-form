import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {Header} from './components/Header';
import {Step1} from './components/Step1';
import {Step2} from './components/Step2';
import {Step3} from './components/Step3';
import {Result} from './components/Result';

function App() {
  return (
    <>
		<Header />
		<Router>
			<Switch>
				<Route exact path="/" render={() => <Step1 />}/>
				<Route path="/step2" render={() => <Step2 />}/>
				<Route path="/step3" render={() => <Step3 />}/>
				<Route path="/result" render={() => <Result />}/>
			</Switch>
		</Router>
	</>
  );
}

export default App;
