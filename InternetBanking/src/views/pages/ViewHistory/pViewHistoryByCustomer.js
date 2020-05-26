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
import { actHistory } from "../../../actions";
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment-timezone';


class ViewHistoryByCustomer extends Component {
    constructor(props) {
        super(props);
        document.title = helper.getPathHost("ViewHistoryByCustomer", "title")
        // this.table = data.rows;
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
    }

    dateFormatter(cell) {
        if (!cell) {
            return "";
        }
        return `${moment(cell).format("DD/MM/YYYY")}`;
    }

    componentDidMount() {
        var toDate = moment().format("YYYY-MM-DD");
        var fromDate = moment().subtract(30, "days").format("YYYY-MM-DD");
        this.props.getHistoryBySTK({ number_payment: this.props.user.data.customer_id, from: fromDate, to: toDate });
    }

    render() {
        return (
            <div className="ViewHistoryByCustomer_page">
                <ToastContainer
                    autoClose={3000}
                    position={toast.POSITION.TOP_RIGHT}
                />
                <Row>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                <i className="icon-menu"></i>Danh sách lịch sử
                            </CardHeader>
                            <CardBody>
                                <BootstrapTable data={this.props.history111 ? this.props.history111 : []} version="4" bordered={false} striped hover pagination search options={this.options}>
                                    <TableHeaderColumn isKey dataField="number_account" dataSort dataAlign='center'>Số tài khoản</TableHeaderColumn>
                                    <TableHeaderColumn dataField="message" dataSort dataAlign='center'>Loại giao dịch</TableHeaderColumn>
                                    <TableHeaderColumn dataField="created_date" dataSort dataAlign='center' dataFormat={this.dateFormatter}>Ngày giao dịch</TableHeaderColumn>
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
ViewHistoryByCustomer = connect((state) => {
    console.log("state ViewHistoryByCustomer", state);
    return { ...state.History, ...state.SignIn }
}, { ...actHistory })(ViewHistoryByCustomer);
export default ViewHistoryByCustomer;

