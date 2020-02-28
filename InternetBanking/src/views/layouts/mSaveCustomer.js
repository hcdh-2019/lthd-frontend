import React, { Component } from 'react';
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
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { actCustomer } from "../../actions"
import { connect } from "react-redux";
import * as helper from '../../modules/Helper';
import { ToastContainer, toast } from 'react-toastify';

class ModalCustomer extends React.Component {
    constructor(props) {
        super(props);
        //set state
        this.state = {
            modal: false,
            dataChoose: {},
            gender: "0"
        };
        this.refName = React.createRef();
        this.refAddress = React.createRef();
        this.refPhone = React.createRef();
        // this.refGenderNam = React.createRef();
        // this.refGenderNu = React.createRef();

        this.SaveCustomer = this.SaveCustomer.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);

    }
    SaveCustomer(formSubmitEvent) {
        formSubmitEvent.preventDefault();
        var name = this.refName.current.value;
        var address = this.refAddress.current.value;
        var phone = this.refPhone.current.value;
        var gender = this.state.gender;

        if (this.props.dataChoose && this.props.dataChoose.id) {
            this.props.updateCustomer({ id: this.props.dataChoose.id, name: name, address: address, phone: phone, gender: gender })
        } else {
            this.props.createCustomer({ name: name, address: address, phone: phone, gender: gender })
        }
        this.setState({
            modal: false,
            dataChoose: {},
            gender: '0'
        });
        this.props.toggle();
    }

    handleGenderChange(changeEvent) {
        this.setState({
            gender: changeEvent.target.value
        });
    }
    render() {
        return (
            <div>
                <ToastContainer
                    autoClose={3000}
                    position={toast.POSITION.TOP_RIGHT}
                />
                <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={'modal-lg modal-primary'}>
                    <Form className="was-validated" onSubmit={this.SaveCustomer}>
                        <ModalHeader toggle={this.props.toggle}>{this.props.title}</ModalHeader>
                        <ModalBody>

                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Row>
                                            <Col xs="3">
                                                <Label htmlFor="name">Tên khách hàng</Label>
                                            </Col>
                                            <Col xs="9">
                                                <input type="text" maxLength="191" ref={this.refName} id="name" className="form-control" placeholder="Tên khách hàng" defaultValue={this.props.dataChoose ? this.props.dataChoose.name : ""} required />

                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Row>
                                            <Col xs="3">
                                                <Label htmlFor="address">Địa chỉ</Label>
                                            </Col>
                                            <Col xs="9">
                                                <input type="text" maxLength="191" ref={this.refAddress} id="address" className="form-control" placeholder="Địa chỉ" defaultValue={this.props.dataChoose ? this.props.dataChoose.address : ""} required />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Row>
                                            <Col xs="3">
                                                <Label htmlFor="phone">Số điện thoại</Label>
                                            </Col>
                                            <Col xs="9">
                                                <input type="text" pattern="[0-9]*" minLength="10" maxLength="11" ref={this.refPhone} id="phone" className="form-control" placeholder="SĐT" defaultValue={this.props.dataChoose ? this.props.dataChoose.phone : ""} required />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Row>
                                            <Col md="3">
                                                <Label htmlFor="gender">Giới tính</Label>
                                            </Col>
                                            <Col md="9">
                                                <FormGroup check inline>
                                                    <input className="form-check-input" type="radio"
                                                        id="genderNam" name="gender" value="0"
                                                        // defaultChecked={this.props.dataChoose? this.props.dataChoose.gender === "0" : this.state.gender === "0"}
                                                        checked={this.state.gender === "0"}
                                                        onChange={this.handleGenderChange} />
                                                    <Label className="form-check-label" check htmlFor="genderNam">Nam</Label>
                                                </FormGroup>
                                                <FormGroup check inline>
                                                    <input className="form-check-input" type="radio"
                                                        id="genderNu" name="gender" value="1"
                                                        // defaultChecked={this.props.dataChoose?this.props.dataChoose.gender === "1" : this.state.gender === "1"}
                                                        checked={this.state.gender === "1"}
                                                        onChange={this.handleGenderChange} />
                                                    <Label className="form-check-label" check htmlFor="genderNu">Nữ</Label>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>

                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="primary" id="btnSave"><i className="fa fa-floppy-o"></i> Lưu</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}
ModalCustomer = connect((state) => {
    // console.log("state.Teacher",state.Teacher)
    return { ...state.Customer }
}, { ...actCustomer })(ModalCustomer);
export default ModalCustomer;
