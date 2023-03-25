import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { AppRouter } from './TodoApp/AppRouter';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	gql,
} from '@apollo/client';

const client = new ApolloClient({
	uri: 'http://localhost:4000/',
	cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<BrowserRouter>
				<AppRouter />
			</BrowserRouter>
		</ApolloProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
