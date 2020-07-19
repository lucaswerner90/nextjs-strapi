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

export default function IndexPage({ header, sections, API_URL }) {
	const classes = useStyles({});
	return (
		<Page>
			<Grid container className={classes.root}>
				<Grid
					container
					justify="flex-start"
					alignItems="center"
					style={{ backgroundImage: `url(${header.background})` }}
					className={clsx(classes.section, classes.mainBackground)}
				>
					<Grid item xs={12} sm={6} md={4}>
						<Typography variant="h1" color="textPrimary" align="left">
							{header.title}
						</Typography>
						<Typography variant="body1" color="textPrimary" align="left" style={{ marginTop: 20 }}>
							{header.description}
						</Typography>
						<Button variant="outlined" size="large" color="primary" style={{ marginTop: 20 }}>{header.button.label}</Button>
					</Grid>
				</Grid>
				{sections.map((section) => (
					<Grid
						container
						spacing={8}
						alignContent="flex-start"
						justify="center"
						key={section._id}
						className={classes.section}
						style={{
							margin: 0,
							backgroundColor: section.backgroundColor
						}}
					>
						<Grid item xs={12}>
							<Typography variant="h2" color="textPrimary" align="center">
								{section.title}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="body1" color="textPrimary" align="center">
								{section.description}
							</Typography>
						</Grid>
						<Grid item container xs={12} spacing={8}>
							{section.images.map((img, idx) => (
								<Grid key={idx} item container xs={12} sm={6} md={4}>
									<div
										style={{
											boxShadow: theme.shadows[24],
											borderRadius:'0px 40px',
											width: '100%',
											height: '60vh',
											backgroundImage: `url(${API_URL.concat(img.formats.large.url)})`
										}}
									>
									</div>
								</Grid>
							))}
						</Grid>
					</Grid>
				))}
			</Grid>
		</Page>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/index-page`);
	const { header, sections, footer } = data;
	header.background = process.env.NEXT_PUBLIC_API_URL.concat(header.background.formats.large.url);
	return {
		props: {
			header,
			sections,
			footer,
			API_URL: process.env.NEXT_PUBLIC_API_URL,
		}
	};
}