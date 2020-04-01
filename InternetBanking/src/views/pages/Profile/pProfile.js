import React, { Component } from 'react';
//import Modal from 'react-modal'
import {
    Row,
    Col,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Collapse,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton
} from 'reactstrap';

import * as helper from '../../../modules/Helper';
import { actCustomer } from "../../../actions";
import { connect } from "react-redux";
import 'react-confirm-alert/src/react-confirm-alert.css';
// React select
import Select from 'react-select';
import '../../../../scss/vendors/react-select/react-select.scss';
import { toast, ToastContainer } from 'react-toastify';

class Profile extends Component {
    constructor(props) {
        super(props);
        document.title = helper.getPathHost("Profile", "title")

        this.refPassOld = React.createRef();
        this.refPassNew = React.createRef();
        this.refRePassNew = React.createRef();

        this.UpdatePass = this.UpdatePass.bind(this);
    }

    UpdatePass(event) {
        event.preventDefault();
        if (this.refPassNew.current.value == this.refRePassNew.current.value) {
            var params = {
                "customer_id": 4,
                "password": this.refPassOld.current.value,
                "new_password": this.refPassNew.current.value
            }
            this.props.UpdatePass(params);

            this.refPassOld.current.value = "";
            this.refPassNew.current.value = "";
            this.refRePassNew.current.value = "";
        } else {
            toast.error("Mật khẩu mới không trung khớp.");
        }
    }

    render() {
        return (
            <div className="Profile_page">
                <ToastContainer
                    autoClose={3000}
                    position={toast.POSITION.TOP_RIGHT}
                />
                <Row>
                    <Col xs="12" sm="12">
                        <Form onSubmit={this.UpdatePass}>
                            <Card className="search_box">
                                <CardHeader>
                                    Đổi mật khẩu
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col xs="4">
                                            <FormGroup style={{ marginBottom: 0 }}>
                                                <Label htmlFor="name">Mật khẩu cũ</Label>
                                                <input className="form-control" ref={this.refPassOld} type="text" placeholder="Mật khẩu cũ" required />
                                            </FormGroup>
                                        </Col>
                                        <Col xs="4">
                                            <FormGroup style={{ marginBottom: 0 }}>
                                                <Label htmlFor="name">Mật khẩu mới</Label>
                                                <input className="form-control" ref={this.refPassNew} type="text" placeholder="Mật khẩu mới" required />
                                            </FormGroup>
                                        </Col>
                                        <Col xs="4">
                                            <FormGroup style={{ marginBottom: 0 }}>
                                                <Label htmlFor="name">Nhập lại mật khẩu mới</Label>
                                                <input className="form-control" ref={this.refRePassNew} type="text" placeholder="Nhập lại mật khẩu mới" required />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter>
                                    <FormGroup style={{ textAlign: "center", marginBottom: 0 }}>
                                        <Button type="submit" color="primary"><i className="icon-plus"></i>Đổi mật khẩu</Button>
                                    </FormGroup>
                                </CardFooter>
                            </Card>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}
Profile = connect((state) => {
    console.log("state Profile", state)
    return { ...state.Customer }
}, { ...actCustomer })(Profile);
export default Profile;
