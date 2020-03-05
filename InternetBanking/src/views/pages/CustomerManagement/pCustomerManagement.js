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
import ModalCustomer from '../../layouts/mSaveCustomer';
import * as helper from '../../../modules/Helper';
import { actCustomer } from "../../../actions";
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const isGender = {
    0: 'Nam',
    1: 'Nữ'
};
function enumFormatter(cell, row, enumObject) {
    return enumObject[cell];
}

class CustomerManagement extends Component {
    constructor(props) {
        super(props);
        document.title = helper.getPathHost("CustomerManagement", "title")
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

        this.toggle = this.toggle.bind(this);
        this.cellButton = this.cellButton.bind(this);
        this.onClickUpdateData = this.onClickUpdateData.bind(this);
        this.onClickDeleteData = this.onClickDeleteData.bind(this);
    }
    componentDidMount() {
        this.props.getCustomer();
    }

    toggle() {
        var row = {gender : 0};
        this.setState({
            modal: !this.state.modal,
            title: "Thêm khách hàng",
            dataChoose: row,
        });
    }
    onClickUpdateData(cell, row, rowIndex) {
        // console.log('dataChoose: ', row);
        this.setState({
            modal: !this.state.modal,
            dataChoose: row,
            title: "Cập nhật khách hàng"
        });
    }
    onClickDeleteData(cell, row, rowIndex) {
        // console.log('dataChoose: ', row.id);
        confirmAlert({
            title: 'Thông báo',
            message: 'Bạn muốn xóa khách hàng?',
            buttons: [
                {
                    label: 'No'
                },
                {
                    label: 'Yes',
                    onClick: () => this.props.deleteCustomer({ id: row.id })
                }
            ]
        });

    }

    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <ButtonGroup>
                <Button color="primary" size="sm" onClick={() =>
                    this.onClickUpdateData(cell, row, rowIndex)}>
                    <i className="icon-note no-mr"></i>
                </Button>
                {/* <Button color="danger" size="sm" onClick={() =>
                    this.onClickDeleteData(cell, row, rowIndex)}>
                    <i className="icon-trash no-mr"></i>
                </Button> */}
            </ButtonGroup>
        )
    }
    render() {
        return (
            <div className="CustomerManagement_page">
                <ModalCustomer
                    toggle={this.toggle}
                    modal={this.state.modal}
                    dataChoose={this.state.dataChoose}
                    title={this.state.title}
                />
                <Row>
                    <Col xs="12" sm="12">
                        <Card className="search_box">
                            <CardBody>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="name">Số điện thoại</Label>
                                            <Input type="text" placeholder="Số điện thoại" />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="name">Tên khách hàng</Label>
                                            <Input type="text" placeholder="Tên khách hàng" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <FormGroup style={{ textAlign: "center", marginBottom: 0 }}>
                                    <Button type="submit" color="primary"><i className="icon-magnifier"></i> Tìm Kiếm</Button>
                                    <Button type="button" color="warning" onClick={this.toggle}><i className="icon-plus"></i> Thêm Mới</Button>
                                </FormGroup>
                            </CardFooter>
                        </Card>
                        <Card>
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
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
CustomerManagement = connect((state) => {
    return { ...state.Customer }
}, { ...actCustomer })(CustomerManagement);
export default CustomerManagement;
