import React, { Component } from 'react';
import { Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { actSignIn } from "../../../actions"
import { connect } from "react-redux";
import * as helper from '../../../modules/Helper';
import { ToastContainer, toast } from 'react-toastify';
// import { ReCaptcha } from 'react-recaptcha-google';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

class SignIn extends Component {
  constructor(props) {
    super(props);
    document.title = helper.getPathHost("SignIn", "title")
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.signIn = this.signIn.bind(this);
    // this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    // this.verifyCallback = this.verifyCallback.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }
  // componentDidMount() {
  //   if (this.captchaDemo) {
  //       console.log("started, just a second...")
  //       this.captchaDemo.reset();
  //       this.captchaDemo.execute();
  //   }
  // }
  // onLoadRecaptcha() {
  //   if (this.captchaDemo) {
  //       this.captchaDemo.reset();
  //       this.captchaDemo.execute();
  //   }
  // }
  // verifyCallback(recaptchaToken) {
  //   // Here you will get the final recaptchaToken!!!  
  //   console.log(recaptchaToken, "<= your recaptcha token")
  // }
  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }
  signIn() {
    // console.log('Email address is ' + this.state.email + ' Password is ' + this.state.password);  
    if (this.state.email !== "" && this.state.password !== "") {
      this.props.onSignIn({
        email: this.state.email,
        password: this.state.password
      })
    } else {
      toast.warning("Vui lòng nhập đầy đủ thông tin!")
    }
  }
  render() {
    return (
      <div className="login_page">
        <ToastContainer
          autoClose={5000}
          position={toast.POSITION.TOP_RIGHT}
        />
        <img className="bg_login" src="img/bg_login.jpg" />
        <Card className="login_box">
          <CardBody>
            <div className="login_head">
              <img src="img/logo_login.png" />

              <span className="title">Đăng nhập</span>
            </div>
            <InputGroup className="mb-3" onChange={this.handleEmailChange}>
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="icon-user"></i>
                </span>
              </div>
              <Input type="text" placeholder="Tài khoản" />
            </InputGroup>
            <InputGroup className="mb-3" onChange={this.handlePasswordChange}>
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="icon-lock"></i>
                </span>
              </div>
              <Input type="password" placeholder="Mật khẩu" />
            </InputGroup>
            <Row>
              <Col xs="12">
                <Button color="primary" className="px-3" onClick={this.signIn}><i className="icon-login"></i>Đăng nhập</Button>
              </Col>
            </Row>
            <GoogleReCaptchaProvider
              reCaptchaKey="6LfFJdwUAAAAAE9H_sYuQQ0nnTmldTJQAdVSjv57"
              language="en"
            ></GoogleReCaptchaProvider>
          </CardBody>
        </Card>
      </div>
    );
  }
}

SignIn = connect((state) => {
  // console.log("state",state.SignIn)
  // return state
  return { ...state.SignIn }
}, { ...actSignIn })(SignIn);

export default SignIn;
