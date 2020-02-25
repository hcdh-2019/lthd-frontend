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
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import data from '../../../views_template/Tables/DataTable/_data';
import ModalTeacher from '../../layouts/mSaveTeacher';
import * as helper from '../../../modules/Helper';
import { actTeacher } from "../../../actions";
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert';
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
            selectMethod :[
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
        this.onChangeRememberName = this.onChangeRememberName.bind(this);
        this.onChangeMethod = this.onChangeMethod.bind(this);
    }

    componentDidMount() {
        this.props.getTeacher();
    }

    onChangeRememberName(value) {
        this.setState({ valueRememberName: value });
    }

    onChangeMethod(value) {
        this.setState({ valueMethod: value });
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
                                            <Input type="text"  placeholder="Số tài khoản" disabled />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="name">Tên tài khoản</Label>
                                            <Input type="text"  placeholder="Tên tài khoản" disabled />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="name">Số dư</Label>
                                            <Input type="text"  placeholder="Số dư" disabled />
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
                                                options={this.props.selectTeacher ? this.props.selectTeacher : []}
                                                onChange={this.onChangeRememberName}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup >
                                            <Label htmlFor="name">Số tài khoản</Label>
                                            <Input type="text" placeholder="Số tài khoản" />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup >
                                            <Label htmlFor="name">Tên tài khoản</Label>
                                            <Input type="text" placeholder="Tên tài khoản" disabled />
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
    // console.log("state.Teacher",state.Teacher)
    return { ...state.Teacher }
}, { ...actTeacher })(TransferMoneySameBank);
export default TransferMoneySameBank;
