import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';
import AppContext from '../context/AppContext';
import App from 'next/app';
import axios from 'axios';

function MyApp(props) {
	const { Component, pageProps, components } = props;

	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<React.Fragment>
			<Head>
				<title>Lucas Werner Template</title>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppContext.Provider value={{ state: { components }, actions: {} }}>
					<Component {...pageProps} />
				</AppContext.Provider>
			</ThemeProvider>
		</React.Fragment>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};

async function getNavigation() {
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const { data } = await axios.get(`${API_URL}/page-menu`);
	const { buttons, logo, pagesButtons } = data;
	return {
		pagesButtons,
		buttons,
		logo
	};
}

MyApp.getInitialProps = async (context) => {
	const navigation = await getNavigation();
	const appProps = await App.getInitialProps(context);
	const components = {
		navigation
	};
	return {
		...appProps,
    	components
	};
}

export default MyApp;


