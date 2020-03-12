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
import { actCustomer, actTransferMoney } from "../../../actions";
import { connect } from "react-redux";
import 'react-confirm-alert/src/react-confirm-alert.css';
// React select
import Select from 'react-select';
import '../../../../scss/vendors/react-select/react-select.scss';
import { toast, ToastContainer } from 'react-toastify';

class TransferMoneySameBank extends Component {
    constructor(props) {
        super(props);
        document.title = helper.getPathHost("TransferMoneySameBank", "title")
        this.state = {
            valueRememberName: "",
            valueMethod: "",
            chkRememberName: false,
            selectMethod: [
                {
                    id: 0,
                    label: "Người nhận trả phí"
                },
                {
                    id: 1,
                    label: "Người gửi trả phí"
                }
            ]
        };

        this.refNumberPayment = React.createRef();
        this.refRememberName = React.createRef();
        this.refChkRememberName = React.createRef();
        this.refAccountNameReceive = React.createRef();

        this.onChangeRememberName = this.onChangeRememberName.bind(this);
        this.onChangeMethod = this.onChangeMethod.bind(this);
        this.CheckCustomer = this.CheckCustomer.bind(this);
        this.onChangeChkRememberName = this.onChangeChkRememberName.bind(this);
    }

    componentDidMount() {
        this.props.getCustomerByID({ id: 1 });
        this.props.getCustomerStoreByCustomerId({ id: 1 });
    }

    onChangeRememberName(value) {
        this.setState({ valueRememberName: value });
        console.log("valueRememberName", this.state.valueRememberName)
    }

    onChangeMethod(value) {
        this.setState({ valueMethod: value });
    }

    CheckCustomer() {
        var Number = this.refNumberPayment.current.value;
        this.props.getCustomerByNumberPayment({ id: Number });
        console.log("refNumberPayment", Number)
    }

    onChangeChkRememberName(value) {
        console.log("onChangeChkRememberName", value.target.checked)
        if (value.target.checked) {
            var name = this.refRememberName.current.value && this.refRememberName.current.value != "" ? this.refRememberName.current.value : this.refAccountNameReceive.current.value
            console.log("name", name)
            if (name && name != "") {
                this.props.SaveCustomerStore({
                    "customer_id": 1,
                    "customer_store_id": 2,
                    "name_store": name
                })
            } else {
                toast.error("Chưa chọn tài khoản gửi!");
            }
        }

        this.setState({ chkRememberName: false });
    }

    render() {
        return (
            <div className="TransferMoneySameBank_page">
                <ToastContainer
                    autoClose={3000}
                    position={toast.POSITION.TOP_RIGHT}
                />
                <Row>
                    <Col xs="12" sm="12">
                        <Card className="search_box">
                            <CardHeader>
                                Thông tin chủ tài khoản
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="name">Số tài khoản</Label>
                                            <Input type="text" placeholder="Số tài khoản" disabled defaultValue={this.props.customer_one ? this.props.customer_one.number_payment : ""} />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="name">Tên tài khoản</Label>
                                            <Input type="text" placeholder="Tên tài khoản" disabled defaultValue={this.props.customer_one ? this.props.customer_one.name : ""} />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="name">Số dư</Label>
                                            <Input type="text" placeholder="Số dư" disabled defaultValue={this.props.customer_one ? this.props.customer_one.amount : ""} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" sm="12">
                        <Card className="search_box">
                            <CardHeader>
                                Thông tin chuyển khoản
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup >
                                            <Label htmlFor="name">Tên gợi nhớ</Label>
                                            <Select
                                                required
                                                placeholder="Chọn tên gợi nhớ"
                                                name="form-field-name2"
                                                value={this.state.valueRememberName}
                                                options={this.props.selectCustomerStore ? this.props.selectCustomerStore : []}
                                                onChange={this.onChangeRememberName}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="4">
                                        <FormGroup >
                                            <Label htmlFor="name">Số tài khoản</Label>
                                            <input type="text" className="form-control" placeholder="Số tài khoản" ref={this.refNumberPayment} defaultValue={this.state.valueRememberName != "" ? this.state.valueRememberName.value : ""} />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="2">
                                        <FormGroup style={{ textAlign: "center", marginBottom: 0 }}>
                                            <Button type="button" color="primary" onClick={this.CheckCustomer} style={{ marginTop: "28px", float: "left" }}><i className="icon-search"></i>Kiểm tra</Button>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup >
                                            <Label htmlFor="name">Tên tài khoản</Label>
                                            <input type="text" className="form-control" ref={this.refAccountNameReceive} placeholder="Tên tài khoản" disabled defaultValue={this.props.customer_payment ? this.props.customer_payment.name : ""} />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup >
                                            <Label htmlFor="name">Số tiền chuyển</Label>
                                            <Input type="text" placeholder="Số tiền chuyển" />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="name">Nội dung</Label>
                                            <Input type="text" placeholder="Nội dung" />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup >
                                            <Label htmlFor="name">Tên gợi nhớ</Label>
                                            <input className="form-control" ref={this.refRememberName} type="text" placeholder="Tên gợi nhớ" />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup >
                                            <Label htmlFor="name">Hình thức thanh toán</Label>
                                            <Select
                                                required
                                                placeholder="Chọn hình thức thanh toán"
                                                name="form-field-name2"
                                                value={this.state.valueMethod}
                                                options={this.state.selectMethod}
                                                onChange={this.onChangeMethod}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup check inline >
                                            <input ref={this.refChkRememberName} className="form-check-input" type="checkbox" onChange={this.onChangeChkRememberName} defaultValue={this.state.chkRememberName} />
                                            <Label className="form-check-label" check htmlFor="inline-checkbox1">Lưu tên gợi nhớ</Label>
                                        </FormGroup>
                                    </Col>

                                </Row>
                            </CardBody>
                            <CardFooter>
                                <FormGroup style={{ textAlign: "center", marginBottom: 0 }}>
                                    <Button type="submit" color="primary"><i className="icon-plus"></i>Chuyển khoản</Button>
                                </FormGroup>
                            </CardFooter>
                        </Card>
                    </Col>

                    <Col xs="12" sm="12">
                        <Card className="search_box">
                            <CardHeader>
                                Thông tin OTP
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="name">Mã OTP</Label>
                                            <Input type="text" placeholder="Mã OTP" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <FormGroup style={{ textAlign: "center", marginBottom: 0 }}>
                                    <Button type="submit" color="primary"><i className="icon-plus"></i>Xác nhận</Button>
                                </FormGroup>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
TransferMoneySameBank = connect((state) => {
    console.log("state.Customer", state.Customer, "state.TransferMoney", state.TransferMoney)
    return { ...state.Customer, ...state.TransferMoney }
}, { ...actCustomer, ...actTransferMoney })(TransferMoneySameBank);
export default TransferMoneySameBank;
