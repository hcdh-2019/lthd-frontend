import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
// import Index from '../views/Pages/Index';
import * as helper from '../modules/Helper'
import iRouter from '../views/Pages'
import Authorization from './rAuthorization'
import { connect } from "react-redux";
var childRouter = helper.getConfig('urlPath')

var Administrator = (props) => {
    if (props.user.data && props.user.status === "success") {
        return (
            <Switch>
                {
                    Object.keys(childRouter).map((key, index) => {
                        var item = childRouter[key];
                        if (item.permission) {
                            return Authorization({ role: props.user.data.role[item.role], name: item.name, url: item.url, component: iRouter[item.name], redirect: "/dashboard" })
                        }
                    })
                }
                <Redirect from="/" to="/dashboard" />
            </Switch>
        );
    } else return null;
}
Administrator = connect((state) => {
    console.log("state.SignIn",state.SignIn)
    return { ...state.SignIn }
})(Administrator)
export default Administrator