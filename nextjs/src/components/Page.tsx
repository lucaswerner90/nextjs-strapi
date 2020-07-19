import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';

const useStyles = makeStyles({
  root: {
    flex:1,
    minHeight:'100vh',
  },
  
});

export default function Page({children}) {
  const classes = useStyles({});
  return (
    <div className="root">
        <Header/>
        {children}
    </div>
  );
}