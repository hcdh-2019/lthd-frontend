import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as  Auth from '../../modules/Auth';
import { connect } from "react-redux";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown,
  Progress,
} from 'reactstrap';

const propTypes = {
  accnt: PropTypes.bool
};
const defaultProps = {
  accnt: false
};

class HeaderDropdown extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
    this.logout = this.logout.bind(this)
  }

  logout(e) {
    Auth.removeUserLogin(true);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  dropAccnt() {
    return (
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav id="nav-link">
        <span className="avatar">
        <i className={"icon fa fa-user-circle"} > </i>
        </span>
         <span className="hidden-xs" style={{ textTransform:  'capitalize', margin: "0 10px" }} > {this.props.user.data ? this.props.user.data.name : ""} </span>
          <i className="fa fa-angle-down"></i>
        </DropdownToggle>
        <DropdownMenu right>
          {/* <DropdownItem><i className="fa fa-shield"></i>Cá nhân</DropdownItem> */}
          <DropdownItem onClick={this.logout}><i className="fa fa-lock"></i> Đăng xuất</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  render() {
    const {accnt, ...attributes} = this.props;
    return (
      accnt ? this.dropAccnt() : null
    );
  }
}

HeaderDropdown.propTypes = propTypes;
HeaderDropdown.defaultProps = defaultProps;

HeaderDropdown = connect((state) => {
  return {...state.SignIn}
})(HeaderDropdown)
export default HeaderDropdown;
