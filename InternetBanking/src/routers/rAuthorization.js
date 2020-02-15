import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import * as Auth from '../modules/Auth';
// import { connect } from "react-redux";

var Authorization = (props) => {
    if (Auth.rolesMatched(props.role)) {
        return (<Route key={props.name} name={props.name} path={props.url} component={props.component} />);
    } else {
        return (<Redirect key={props.name} name={props.name} from={props.url} to={props.redirect ? props.redirect : '/'} />)
    }
};
export default Authorization