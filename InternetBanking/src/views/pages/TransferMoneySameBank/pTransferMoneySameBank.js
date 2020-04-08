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
            valueMethod: {
                id: "0",
                label: "Người gửi trả phí"
            },
            chkRememberName: false,
            selectMethod: [
                {
                    id: "0",
                    label: "Người gửi trả phí"
                },
                {
                    id: "1",
                    label: "Người nhận trả phí"
                }
            ],
            disabled: false,
            hidden: true
        };


        this.refNumberPayment = React.createRef();
        this.refRememberName = React.createRef();
        this.refChkRememberName = React.createRef();
        this.refAccountNameReceive = React.createRef();
        this.refMoneyReceive = React.createRef();
        this.refContentReceive = React.createRef();
        this.refOTP = React.createRef();

        this.onChangeRememberName = this.onChangeRememberName.bind(this);
        this.onChangeMethod = this.onChangeMethod.bind(this);
        this.CheckCustomer = this.CheckCustomer.bind(this);
        this.onChangeChkRememberName = this.onChangeChkRememberName.bind(this);
        this.TransactionMoney = this.TransactionMoney.bind(this);
        this.CanceTransferMoney = this.CanceTransferMoney.bind(this);
        this.ConfirmOTP = this.ConfirmOTP.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    componentDidMount() {
        this.props.getCustomerByID({ id: this.props.user.data.customer_id });
        this.props.getCustomerStoreByCustomerId({ id: 4 });
    }

    onChangeRememberName(value) {
        this.setState({ valueRememberName: value });

        if (value && value != "") {
            this.refNumberPayment.current.value = value.value;
            this.refNumberPayment.current.disabled = "disabled";
        } else {
            this.refNumberPayment.current.disabled = "";
            this.refNumberPayment.current.value = "";

            this.props._ClearCustomerPayment(null);

        }
    }

    onChangeMethod(value) {
        this.setState({ valueMethod: value });
    }

    CheckCustomer() {
        if (this.refNumberPayment.current.value != "") {
            var Number = this.refNumberPayment.current.value;
            var valid = this.validateInput(Number);
            if (!valid.isInputValid) {
                toast.error(valid.errorMessage);
            } else {
                this.props.getCustomerByNumberPayment({ id: Number });
            }
        } else {
            toast.error("Vui lòng chọn tên gợi nhớ hoặc nhập số tài khoản.");
        }
    }

    onChangeChkRememberName(value) {
        if (value.target.checked) {
            var name = this.refRememberName.current.value && this.refRememberName.current.value != "" ? this.refRememberName.current.value : this.refAccountNameReceive.current.value;
            if (name && name != "" && this.props.customer_payment && this.props.customer_payment.customer_id) {
                this.props.SaveCustomerStore({
                    "customer_id": 4,
                    "customer_store_id": this.props.customer_payment.customer_id,
                    "name_store": name
                })
            } else {
                toast.error("Thông tin người nhận chưa xác thực. Vui lòng nhấn kiểm tra.");
            }
        }

        this.refChkRememberName.current.value = false;
        this.setState({ chkRememberName: false });
    }

    TransactionMoney() {
        if (this.props.customer_payment && this.props.customer_payment.customer_id) {
            if (this.refMoneyReceive.current.value != "" && this.refContentReceive.current.value != "") {
                var params = {
                    "customer_id": 4,
                    "customer_receive_id": this.props.customer_payment.customer_id,
                    "amount": parseInt(this.refMoneyReceive.current.value),
                    "content": this.refContentReceive.current.value
                }

                this.props.TransactionMoney(params);

                this.refNumberPayment.current.disabled = "disabled";
                this.refMoneyReceive.current.disabled = "disabled";
                this.refContentReceive.current.disabled = "disabled";
                this.refRememberName.current.disabled = "disabled";
                this.refRememberName.current.disabled = "disabled";
                this.setState({
                    disabled: true,
                    hidden: false
                });
            } else {
                toast.error("Vui lòng nhập đầy đủ thông tin.");
            }
        } else {
            toast.error("Thông tin người nhận chưa xác thực. Vui lòng nhấn kiểm tra.");
        }
    }

    CanceTransferMoney() {
        this.refNumberPayment.current.disabled = "";
        this.refMoneyReceive.current.disabled = "";
        this.refContentReceive.current.disabled = "";
        this.refRememberName.current.disabled = "";
        this.refRememberName.current.disabled = "";
        this.refOTP.current.value = "";
        this.setState({
            disabled: false,
            hidden: true
        });

        this.props._ConfirmOTPDisabled(false);
    }

    ConfirmOTP() {
        if (this.refOTP.current.value != "") {
            var params = {
                "customer_id": 4,
                "otp_code": this.refOTP.current.value,
            }

            this.props.ConfirmOTP(params);

        } else {
            toast.error("Vui lòng nhập mã OTP!");
        }
    }

    validateInput(checkingText) {
        const regexp = /^[0-9]*$/;
        const checkingResult = regexp.exec(checkingText);
        if (checkingResult !== null) {
            return {
                isInputValid: true,
                errorMessage: ''
            };
        } else {
            return {
                isInputValid: false,
                errorMessage: 'Sai định dạnh, chỉ nhập số.'
            };
        }
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
                                                placeholder="Chọn tên gợi nhớ"
                                                name="form-field-name2"
                                                value={this.state.valueRememberName}
                                                options={this.props.selectCustomerStore ? this.props.selectCustomerStore : []}
                                                onChange={this.onChangeRememberName}
                                                disabled={this.state.disabled}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="4">
                                        <FormGroup >
                                            <Label htmlFor="name">Số tài khoản</Label>
                                            <input type="text" className="form-control" placeholder="Số tài khoản" ref={this.refNumberPayment} defaultValue={this.state.valueRememberName ? this.state.valueRememberName.value : ""} />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="2">
                                        <FormGroup style={{ textAlign: "center", marginBottom: 0 }}>
                                            <Button type="button" color="primary" onClick={this.CheckCustomer} style={{ marginTop: "28px", float: "left" }} disabled={this.state.disabled}><i className="icon-search"></i>Kiểm tra</Button>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup >
                                            <Label htmlFor="name">Tên tài khoản</Label>
                                            <input type="text" className="form-control" ref={this.refAccountNameReceive} placeholder="Tên tài khoản" disabled defaultValue={this.props.customer_payment && this.props.customer_payment.name ? this.props.customer_payment.name : ""} />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup >
                                            <Label htmlFor="name">Số tiền chuyển</Label>
                                            <input type="number" className="form-control" placeholder="Số tiền chuyển" ref={this.refMoneyReceive} />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="name">Nội dung</Label>
                                            <input type="text" className="form-control" placeholder="Nội dung" ref={this.refContentReceive} />
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
                                                placeholder="Chọn hình thức thanh toán"
                                                name="form-field-name2"
                                                value={this.state.valueMethod}
                                                options={this.state.selectMethod}
                                                onChange={this.onChangeMethod}
                                                disabled={this.state.disabled}
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
                                    <Button type="button" color="primary" onClick={this.TransactionMoney} disabled={this.state.disabled}><i className="icon-plus"></i>Chuyển khoản</Button>
                                </FormGroup>
                            </CardFooter>
                        </Card>
                    </Col>

                    <Col xs="12" sm="12" hidden={this.state.hidden}>
                        <Card className="search_box">
                            <CardHeader>
                                Thông tin OTP
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="name">Mã OTP</Label>
                                            <input className="form-control" ref={this.refOTP} type="text" placeholder="Mã OTP" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <FormGroup style={{ textAlign: "center", marginBottom: 0 }}>
                                    <Button type="button" color="warning" onClick={this.CanceTransferMoney}><i className="icon-plus"></i>Hủy giao dịch</Button>
                                    <Button type="button" color="primary" onClick={this.ConfirmOTP} disabled={this.props.confirm_otp_disabled}><i className="icon-plus"></i>Xác nhận</Button>
                                    <Button type="button" color="success" onClick={this.TransactionMoney} disabled={this.props.confirm_otp_disabled}><i className="icon-plus"></i>Gửi lại OTP</Button>
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
    console.log("state TransferMoneySameBank", state)
    return { ...state.Customer, ...state.TransferMoney, ...state.SignIn }
}, { ...actCustomer, ...actTransferMoney })(TransferMoneySameBank);
export default TransferMoneySameBank;
