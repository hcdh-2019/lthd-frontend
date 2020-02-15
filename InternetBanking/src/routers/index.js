import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../components/Header/';
import Sidebar from '../components/Sidebar/';
import Breadcrumb from '../components/Breadcrumb/';
import Aside from '../components/Aside/';
import Footer from '../components/Footer/';

import Dashboard from '../views_template/Dashboard/';

import Colors from '../views_template/Theme/Colors/';
import Typography from '../views_template/Theme/Typography/';

import Charts from '../views_template/Charts/';
import Widgets from '../views_template/Widgets/';

// Base
import Cards from '../views_template/Base/Cards/';
import Switches from '../views_template/Base/Switches/';
import Tabs from '../views_template/Base/Tabs/';
import Breadcrumbs from '../views_template/Base/Breadcrumbs/';
import Carousels from '../views_template/Base/Carousels/';
import Collapses from '../views_template/Base/Collapses/';
import Dropdowns from '../views_template/Base/Dropdowns/';
import Jumbotrons from '../views_template/Base/Jumbotrons/';
import ListGroups from '../views_template/Base/ListGroups/';
import Navbars from '../views_template/Base/Navbars/';
import Navs from '../views_template/Base/Navs/';
import Paginations from '../views_template/Base/Paginations/';
import Popovers from '../views_template/Base/Popovers/';
import ProgressBar from '../views_template/Base/ProgressBar/';
import Tooltips from '../views_template/Base/Tooltips/';

// Buttons
import Buttons from '../views_template/Buttons/Buttons/';
import ButtonDropdowns from '../views_template/Buttons/ButtonDropdowns/';
import ButtonGroups from '../views_template/Buttons/ButtonGroups/';
import LoadingButtons from '../views_template/Buttons/LoadingButtons/';
import SocialButtons from '../views_template/Buttons/SocialButtons/';

// Editors
import TextEditors from '../views_template/Editors/TextEditors';
import CodeEditors from '../views_template/Editors/CodeEditors';

// Forms
import BasicForms from '../views_template/Forms/BasicForms/';
import AdvancedForms from '../views_template/Forms/AdvancedForms';

import GoogleMaps from '../views_template/GoogleMaps/';

// Icons
import Flags from '../views_template/Icons/Flags/';
import FontAwesome from '../views_template/Icons/FontAwesome/';
import SimpleLineIcons from '../views_template/Icons/SimpleLineIcons/';

// Notifications
import Alerts from '../views_template/Notifications/Alerts/';
import Badges from '../views_template/Notifications/Badges/';
import Modals from '../views_template/Notifications/Modals/';
import Toastr from '../views_template/Notifications/Toastr/';

// Plugins
import Calendar from '../views_template/Plugins/Calendar/';
import Spinners from '../views_template/Plugins/Spinners/';

// Tables
import DataTable from '../views_template/Tables/DataTable/';
import Tables from '../views_template/Tables/Tables/';

// UI Kits
import Invoice from '../views_template/UI-Kits/Invoicing/';
import Inbox from '../views_template/UI-Kits/Email/Inbox/';
import Message from '../views_template/UI-Kits/Email/Message/';
import Compose from '../views_template/UI-Kits/Email/Compose/';

import { connect } from "react-redux";
import { actSignIn } from "../actions"
import RenderRouter from './rRenderRouter'

class RouterPage extends Component {
  constructor(props, context) {
    super(props, context);
     props.getProfile();
  }
  render() {
    if (this.props.user) {
      // console.log("user login: ", this.props.user);
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/theme/colors" name="Colors" component={Colors}/>
                <Route path="/theme/typography" name="Typography" component={Typography}/>
                <Route path="/base/cards" name="Cards" component={Cards}/>
                <Route path="/base/switches" name="Swithces" component={Switches}/>
                <Route path="/base/tabs" name="Tabs" component={Tabs}/>
                <Route path="/base/breadcrumbs" name="Breadcrumbs" component={Breadcrumbs}/>
                <Route path="/base/carousels" name="Carousels" component={Carousels}/>
                <Route path="/base/collapses" name="Collapses" component={Collapses}/>
                <Route path="/base/dropdowns" name="Dropdowns" component={Dropdowns}/>
                <Route path="/base/jumbotrons" name="Jumbotrons" component={Jumbotrons}/>
                <Route path="/base/list-groups" name="ListGroups" component={ListGroups}/>
                <Route path="/base/navbars" name="Navbars" component={Navbars}/>
                <Route path="/base/navs" name="Navs" component={Navs}/>
                <Route path="/base/paginations" name="Paginations" component={Paginations}/>
                <Route path="/base/popovers" name="Popovers" component={Popovers}/>
                <Route path="/base/progress-bar" name="Progress Bar" component={ProgressBar}/>
                <Route path="/base/tooltips" name="Tooltips" component={Tooltips}/>
                <Route path="/buttons/buttons" name="Buttons" component={Buttons}/>
                <Route path="/buttons/button-dropdowns" name="ButtonDropdowns" component={ButtonDropdowns}/>
                <Route path="/buttons/button-groups" name="ButtonGroups" component={ButtonGroups}/>
                <Route path="/buttons/loading-buttons" name="Loading Buttons" component={LoadingButtons}/>
                <Route path="/buttons/social-buttons" name="Social Buttons" component={SocialButtons}/>
                <Route path="/charts" name="Charts" component={Charts}/>
                <Route path="/editors/text-editors" name="Text Editors" component={TextEditors}/>
                <Route path="/editors/code-editors" name="Code Editors" component={CodeEditors}/>
                <Route path="/forms/basic-forms" name="Basic Forms" component={BasicForms}/>
                <Route path="/forms/advanced-forms" name="Advanced Forms" component={AdvancedForms}/>
                <Route path="/google-maps" name="Google Maps" component={GoogleMaps}/>
                <Route path="/icons/flags" name="Flags" component={Flags}/>
                <Route path="/icons/font-awesome" name="Font Awesome" component={FontAwesome}/>
                <Route path="/icons/simple-line-icons" name="Simple Line Icons" component={SimpleLineIcons}/>
                <Route path="/notifications/alerts" name="Alerts" component={Alerts}/>
                <Route path="/notifications/badges" name="Badges" component={Badges}/>
                <Route path="/notifications/modals" name="Modals" component={Modals}/>
                <Route path="/notifications/toastr" name="Toastr" component={Toastr}/>
                <Route path="/plugins/calendar" name="Calendar" component={Calendar}/>
                <Route path="/plugins/spinners" name="Loading Buttons" component={Spinners}/>
                <Route path="/tables/datatable" name="Data Table" component={DataTable}/>
                <Route path="/tables/tables" name="Tables" component={Tables}/>
                <Route path="/widgets" name="Widgets" component={Widgets}/>
                <Route path="/ui-kits/invoicing/invoice" name="Invoice" component={Invoice}/>
                <Route path="/ui-kits/email/inbox" name="Invoice" component={Inbox}/>
                <Route path="/ui-kits/email/message" name="Message" component={Message}/>
                <Route path="/ui-kits/email/compose" name="Compose" component={Compose}/>

                <Route path="/" name="Administrator" component={RenderRouter} />
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </Container>
          </main>
        </div>
      </div>
    );
    }else return null
  }
}
RouterPage = connect((state) => {
  return {...state.SignIn}
}, { ...actSignIn })(RouterPage)
export default RouterPage
