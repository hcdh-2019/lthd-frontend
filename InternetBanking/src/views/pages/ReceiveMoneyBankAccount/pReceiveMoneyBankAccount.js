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
import { actReceiveMoney } from "../../../actions";
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast, ToastContainer } from 'react-toastify';


class ReceiveMoneyBankAccount extends Component {
    constructor(props) {
        super(props);
        document.title = helper.getPathHost("ReceiveMoneyBankAccount", "title")
        
        this.state = {
            modal: false,
            dataChoose: {},
            title: ""
        };

        this.refNumberPayment = React.createRef();
        this.refUserName = React.createRef();
        this.refAmount = React.createRef();

        this.checkCustomer = this.checkCustomer.bind(this);
        this.onClickReceiveMoney = this.onClickReceiveMoney.bind(this);
    }
    checkCustomer() {
        var numberPayment = this.refNumberPayment.current.value;
        var userName = this.refUserName.current.value;
        this.props.getCustomerBySTK({ number_payment: numberPayment });
    }
    onClickReceiveMoney(formSubmitEvent) {
        formSubmitEvent.preventDefault();
        var numberPayment = this.refNumberPayment.current.value;
        var userName = this.refUserName.current.value;
        var amount = this.refAmount.current.value;
        this.props.receiveMoney({ number_payment_or_user_name: numberPayment ? numberPayment : userName, amount: parseFloat(amount) });
    }
    
    render() {
        return (
            <div className="ReceiveMoneyBankAccount_page">
                <ToastContainer
                    autoClose={3000}
                    position={toast.POSITION.TOP_RIGHT}
                />
                <Row>
                    <Col xs="12" sm="12">
                        <Card className="search_box">
                            <CardBody>
                                <Row>
                                    <Col xs="4">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="name">Số tài khoản</Label>
                                            <input type="text" className="form-control" placeholder="Số tài khoản" ref={this.refNumberPayment} defaultValue={this.props.customer_one ? this.props.customer_one.number_payment : ""} />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="4">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="name">Tên đăng nhập</Label>
                                            <input type="text" className="form-control" disabled placeholder="Tên đăng nhập" ref={this.refUserName} defaultValue={this.props.customer_one ? this.props.customer_one.username : ""}/>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="4">
                                        <FormGroup style={{ textAlign: "center", marginBottom: 0 }}>
                                            <Button type="button" color="primary" onClick={this.checkCustomer} style={{ marginTop: "28px", float: "left" }}><i className="icon-search"></i>Kiểm tra</Button>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="4">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="name">Tên khách hàng</Label>
                                            <Input type="text" placeholder="Tên khách hàng" disabled defaultValue={this.props.customer_one ? this.props.customer_one.name : ""} />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="4">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="name">Email</Label>
                                            <Input type="text" placeholder="Email" disabled defaultValue={this.props.customer_one ? this.props.customer_one.email : ""}/>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="4">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="name">Số điện thoại</Label>
                                            <Input type="text" placeholder="Số điện thoại" disabled defaultValue={this.props.customer_one ? this.props.customer_one.phone : ""}/>
                                        </FormGroup>
                                    </Col>
                                    
                                </Row>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="name">Số dư </Label>
                                            <Input type="text" placeholder="Số dư" disabled defaultValue={this.props.customer_one ? this.props.customer_one.amount : ""}/>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="name">Số tiền cần nạp </Label>
                                            <input type="text" className="form-control" placeholder="Số tiền cần nạp" ref={this.refAmount}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <FormGroup style={{ textAlign: "center", marginBottom: 0 }}>
                                    <Button type="button" color="warning" onClick={this.onClickReceiveMoney}><i className="icon-plus"></i> Nạp tiền</Button>
                                </FormGroup>
                            </CardFooter>
                        </Card>
                        {/* <Card>
                            <CardHeader>
                                <i className="icon-menu"></i>Danh sách khách hàng
                            </CardHeader>
                            <CardBody>
                                <BootstrapTable data={this.props.customer ? this.props.customer : []} version="4" bordered={false} striped hover pagination search options={this.options}>
                                    <TableHeaderColumn isKey dataField="id" dataSort dataAlign='center'>Mã khách hàng</TableHeaderColumn>
                                    <TableHeaderColumn dataField="name" dataSort dataAlign='center'>Họ tên</TableHeaderColumn>
                                    <TableHeaderColumn dataField="address" width='500px' dataAlign='center'>Địa chỉ</TableHeaderColumn>
                                    <TableHeaderColumn dataField="phone" dataSort dataAlign='center'>Số điện thoại</TableHeaderColumn>
                                    <TableHeaderColumn dataField="email" dataSort dataAlign='center'>Email</TableHeaderColumn>
                                    <TableHeaderColumn dataField="gender" dataFormat={enumFormatter} formatExtraData={isGender} dataSort dataAlign='center'>Giới tính</TableHeaderColumn>
                                    <TableHeaderColumn dataField='button' dataFormat={this.cellButton} width='80px' dataAlign='center'>Control</TableHeaderColumn>
                                </BootstrapTable>
                            </CardBody>
                        </Card> */}
                    </Col>
                </Row>
            </div>
        );
    }
}
ReceiveMoneyBankAccount = connect((state) => {
    return { ...state.ReceiveMoney }
}, { ...actReceiveMoney })(ReceiveMoneyBankAccount);
export default ReceiveMoneyBankAccount;
