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

class TransferMoneySameBank extends Component {
    constructor(props) {
        super(props);
        document.title = helper.getPathHost("TransferMoneySameBank", "title")
        this.state = {
            valueRememberName: "",
            valueMethod: "",
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

        this.onChangeRememberName = this.onChangeRememberName.bind(this);
        this.onChangeMethod = this.onChangeMethod.bind(this);
        this.CheckCustomer = this.CheckCustomer.bind(this);
    }

    componentDidMount() {
        this.props.getCustomerByID({ id: 1 });
        this.props.getCustomerStoreByCustomerId({ id: 1 });
    }

    onChangeRememberName(value) {
        this.setState({ valueRememberName: value });
    }

    onChangeMethod(value) {
        this.setState({ valueMethod: value });
    }

    CheckCustomer() {
        var Number = this.refNumberPayment.current.value;
        this.props.getCustomerByNumberPayment({ id: 2874475617 });
        console.log("refNumberPayment", Number)
    }

    render() {
        return (
            <div className="TransferMoneySameBank_page">
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
                                            <input type="text" className="form-control" placeholder="Số tài khoản" ref={this.refNumberPayment} />
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
                                            <Input type="text" placeholder="Tên tài khoản" disabled defaultValue={this.props.customer_payment ? this.props.customer_payment.name : ""}/>
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
                                            <Input type="text" placeholder="Tên gợi nhớ" />
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
                                            <Input className="form-check-input" type="checkbox" id="inline-checkbox1" name="inline-checkbox1" value="option1" />
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
