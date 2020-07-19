import React, { useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link, Grid } from '@material-ui/core';
import Router from 'next/router';
import AppContext from '../context/AppContext';
import { useSession } from 'next-auth/client';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
        flex:1,
        flexGrow: 1,
    },
  }),
);

export default function Header() {
    const [ session, loading ] = useSession();
    const classes = useStyles();
    const {state} = useContext(AppContext);
    const {navigation} = state.components;
    const {pagesButtons, logo} = navigation;
    return (
        <div className={classes.root}>
        <AppBar position="absolute" color="transparent">
            <Toolbar>
                <Link className={classes.title} underline="none" href="/">
                    <img
                        width="60px" 
                        srcSet={process.env.NEXT_PUBLIC_API_URL.concat(logo.url)}
                    />
                </Link>
                <Grid container justify="flex-end" spacing={4} alignItems="center">
                    {pagesButtons.map((btn)=>(
                        <Grid item key={btn._id}>
                            <Button color={btn.color} size="large" variant={btn.variant} onClick={() => Router.push(btn.url)}>{btn.label}</Button>
                        </Grid>
                    ))}
                    
                    {session && session.user && session.user.name && (
                        <Grid item>
                            <Typography variant="body1"><b>{session.user.name}</b></Typography>
                        </Grid>
                    )}
                </Grid>
            </Toolbar>
        </AppBar>
        </div>
    );
}