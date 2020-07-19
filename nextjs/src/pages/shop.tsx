import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../theme';
import clsx from 'clsx';
import axios from 'axios';
import { GetStaticProps } from 'next';
import Page from '../components/Page';

const useStyles = makeStyles({
	root: {
		flex: 1,
		minHeight: '100vh',
	},
	section: {
		padding: theme.spacing(8),
		backgroundAttachment: 'fixed',
		backgroundPosition: 'top',
		backgroundSize: 'cover',
		minHeight: '100vh',
		position: 'relative'
	},
	'mainBackground': {
		clipPath: 'polygon(0 0, 100% 0, 100% 73%, 0% 100%)',
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
		backgroundAttachment: 'fixed',
		backgroundRepeat: 'no-repeat'
	},
	'thirdSection': {
		backgroundColor: '#1d1d1d',
	}

});

export default function ShopPage({ header }) {
	const { title, background } = header;
	const classes = useStyles({});
	return (
		<Page>
			<Grid container className={classes.root}>
				<Grid
					container
					justify="flex-start"
					alignItems="center"
					style={{ backgroundImage: `url(${background})` }}
					className={clsx(classes.section, classes.mainBackground)}
				>
					<Grid item xs={12} sm={6} md={4}>
						<Typography variant="h1" color="textPrimary" align="left">
							{title}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Page>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/shop-page`);
	const { header } = data;
	header.background = process.env.NEXT_PUBLIC_API_URL.concat(header.background.formats.large.url);
	return {
		props: {
			header,
		}
	};
}