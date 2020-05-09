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
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import data from '../../../views_template/Tables/DataTable/_data';
import * as helper from '../../../modules/Helper';
import { actReceiveMoney, actHistory } from "../../../actions";
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast, ToastContainer } from 'react-toastify';


class ViewHistoryByStaff extends Component {
    constructor(props) {
        super(props);
        document.title = helper.getPathHost("ViewHistoryByStaff", "title")
        this.table = data.rows;
        this.options = {
            sortIndicator: true,
            hideSizePerPage: true,
            sizePerPage: 25,
            paginationSize: 3,
            hidePageListOnlyOnePage: false,
            clearSearch: false,
            alwaysShowAllBtns: true,
            withFirstAndLast: false,
            paginationShowsTotal: true,
            noDataText: 'Không có dữ liệu'
        }

        this.state = {
            modal: false,
            dataChoose: {},
            title: ""
        };

        this.refNumberPayment = React.createRef();
        this.refUserName = React.createRef();
        this.refCustomerID = React.createRef();

        this.checkCustomer = this.checkCustomer.bind(this);
        this.searchHistory = this.searchHistory.bind(this);
    }

    componentDidMount() {
        this.props.getHistoryBySTK({ number_payment: "0" });
    }

    checkCustomer() {
        var numberPayment = this.refNumberPayment.current.value;
        var userName = this.refUserName.current.value;
        if (numberPayment !== "") {
            this.props.getCustomerBySTK({ number_payment: numberPayment, isKey: "history" });
        }else{
            toast.warning("Chưa có thông tin khách hàng!");
        }
    }

    searchHistory() {
        var numberPayment = this.refNumberPayment.current.value;
        var userName = this.refUserName.current.value;
        var customerID = this.refCustomerID.current.value;
        // if (numberPayment !== "") {
            if (customerID !== "") {
                this.props.getHistoryBySTK({ number_payment: customerID });
            } else {
                toast.warning("Chưa có thông tin khách hàng!");
            }
        // }
    }

    render() {
        return (
            <div className="ViewHistoryByStaff_page">
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
                                            <input type="text" className="form-control" placeholder="Số tài khoản" ref={this.refNumberPayment} defaultValue={this.props.customer_one_his && this.props.customer_one_his.number_payment ? this.props.customer_one_his.number_payment : ""} />
                                            <input type="hidden" className="form-control" placeholder="Số tài khoản" ref={this.refCustomerID} defaultValue={this.props.customer_one_his && this.props.customer_one_his.customer_id ? this.props.customer_one_his.customer_id : ""} />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="4">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="name">Tên đăng nhập</Label>
                                            <input type="text" className="form-control" disabled placeholder="Tên đăng nhập" ref={this.refUserName} defaultValue={this.props.customer_one_his ? this.props.customer_one_his.username : ""} />
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
                                            <Input type="text" placeholder="Tên khách hàng" disabled defaultValue={this.props.customer_one_his ? this.props.customer_one_his.name : ""} />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="4">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="name">Email</Label>
                                            <Input type="text" placeholder="Email" disabled defaultValue={this.props.customer_one_his ? this.props.customer_one_his.email : ""} />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="4">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="name">Số điện thoại</Label>
                                            <Input type="text" placeholder="Số điện thoại" disabled defaultValue={this.props.customer_one_his ? this.props.customer_one_his.phone : ""} />
                                        </FormGroup>
                                    </Col>

                                </Row>
                            </CardBody>
                            <CardFooter>
                                <FormGroup style={{ textAlign: "center", marginBottom: 0 }}>
                                    <Button type="button" color="warning" onClick={this.searchHistory}><i className="icon-plus"></i>Tìm kiếm</Button>
                                </FormGroup>
                                {/* onClick={this.searchHistory} */}
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                <i className="icon-menu"></i>Danh sách lịch sử
                            </CardHeader>
                            <CardBody>
                                <BootstrapTable data={this.props.history111 ? this.props.history111 : []} version="4" bordered={false} striped hover pagination search options={this.options}>
                                    <TableHeaderColumn isKey dataField="number_account" dataSort dataAlign='center'>Số tài khoản</TableHeaderColumn>
                                    <TableHeaderColumn dataField="message" dataSort dataAlign='center'>Loại giao dịch</TableHeaderColumn>
                                    <TableHeaderColumn dataField="sender" dataSort dataAlign='center'>Người gửi</TableHeaderColumn>
                                    <TableHeaderColumn dataField="received" dataSort dataAlign='center'>Người nhận</TableHeaderColumn>
                                    <TableHeaderColumn dataField="amount" dataSort dataAlign='center'>Số tiền</TableHeaderColumn>
                                </BootstrapTable>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
ViewHistoryByStaff = connect((state) => {
    return { ...state.ReceiveMoney, ...state.History }
}, { ...actReceiveMoney, ...actHistory })(ViewHistoryByStaff);
export default ViewHistoryByStaff;
