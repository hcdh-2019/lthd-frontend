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
import ModalTransactionRemind from '../../layouts/mTransactionRemind';
import * as helper from '../../../modules/Helper';
import { actTransactionRemind } from "../../../actions";
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
// React select
import Select from 'react-select';
import '../../../../scss/vendors/react-select/react-select.scss';

const isStatus = {
    0: 'Mới tạo',
    1: 'Đã thanh toán',
    2: 'Đã huỷ'
};
function enumFormatter(cell, row, enumObject) {
    return enumObject[cell];
}

class TransactionRemind extends Component {
    constructor(props) {
        super(props);
        document.title = helper.getPathHost("TransactionRemind", "title")
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
            title: "",
            valueStatus: {
                id: "0",
                label: "Mới tạo"
            },
            selectStatus: [
                {
                    id: "0",
                    label: "Mới tạo"
                },
                {
                    id: "1",
                    label: "Đã thanh toán"
                },
                {
                    id: "-1",
                    label: "Đã huỷ"
                }
            ],
            valueRemind: {
                id: "0",
                label: "DS bị nhắc nợ"
            },
            selectRemind: [
                {
                    id: "0",
                    label: "DS bị nhắc nợ"
                },
                {
                    id: "1",
                    label: "DS nhắc nợ"
                }
            ],
            disabled: false,
            hidden: true
        };

        this.toggle = this.toggle.bind(this);
        this.cellButton = this.cellButton.bind(this);
        this.onClickUpdateData = this.onClickUpdateData.bind(this);
        this.onClickCancelData = this.onClickCancelData.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeRemind = this.onChangeRemind.bind(this);
        this.searchRemind = this.searchRemind.bind(this);
    }
    componentDidMount() {
        var objParams = {
            number_payment_receive : this.props.user.data.number_payment,
            status : 0
        }
        this.props.getTransactionRemind(objParams);
    }

    onChangeStatus(value) {
        this.setState({ valueStatus: value });
    }

    onChangeRemind(value) {
        this.setState({ valueRemind: value });
    }

    searchRemind(){
        var objParams = {
            status : this.state.valueStatus.id
        }
        if(this.state.valueRemind.id == "0"){
            objParams.number_payment_receive = this.props.user.data.number_payment;
        }else{
            objParams.number_payment = this.props.user.data.number_payment;
        }
        this.props.getTransactionRemind(objParams);
    }

    toggle() {
        var row = {number_payment: this.props.user.data.number_payment};
        this.setState({
            modal: !this.state.modal,
            title: "Tạo nhắc nợ",
            dataChoose: row
        });
    }
    onClickUpdateData(cell, row, rowIndex) {
        console.log('dataChoose: ', row);
        this.setState({
            modal: !this.state.modal,
            dataChoose: row,
            title: "Cập nhật nhắc nợ"
        });
    }
    onClickCancelData(cell, row, rowIndex) {
        // console.log('dataChoose: ', row.id);
        if(row.number_payment === this.props.user.data.number_payment){
            confirmAlert({
                title: 'Thông báo',
                message: 'Bạn muốn huỷ nhắc nợ?',
                buttons: [
                    {
                        label: 'No'
                    },
                    {
                        label: 'Yes',
                        onClick: () => this.props.updateTransactionRemind({ transaction_remind_id: row.id, content:row.Content })
                        
                    }
                ]
            });
        }
    }

    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <ButtonGroup>
                {/* <Button color="primary" size="sm" onClick={() =>
                    this.onClickUpdateData(cell, row, rowIndex)}>
                    <i className="icon-note no-mr"></i>
                </Button> */}
                <Button color="danger" size="sm" onClick={() =>
                    this.onClickCancelData(cell, row, rowIndex)}>
                    <i className="icon-close no-mr"></i>
                </Button>
            </ButtonGroup>
        )
    }
    render() {
        return (
            <div className="TransactionRemind_page">
                <ModalTransactionRemind
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
                                            <Label htmlFor="name">Số tài khoản</Label>
                                            <Select
                                                placeholder="Hình thức nhắc nợ"
                                                name="form-field-name2"
                                                value={this.state.valueRemind}
                                                options={this.state.selectRemind}
                                                onChange={this.onChangeRemind}
                                                disabled={this.state.disabled}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="name">Tên khách hàng</Label>
                                            <Select
                                                placeholder="Trạng thái"
                                                name="form-field-name2"
                                                value={this.state.valueStatus}
                                                options={this.state.selectStatus}
                                                onChange={this.onChangeStatus}
                                                disabled={this.state.disabled}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <FormGroup style={{ textAlign: "center", marginBottom: 0 }}>
                                    <Button type="submit" color="primary" onClick={this.searchRemind}><i className="icon-magnifier"></i> Tìm Kiếm</Button>
                                    <Button type="button" color="warning" onClick={this.toggle}><i className="icon-plus"></i> Thêm Mới</Button>
                                </FormGroup>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                <i className="icon-menu"></i>Danh sách nhắc nợ
                            </CardHeader>
                            <CardBody>
                                <BootstrapTable data={this.props.transaction_remind ? this.props.transaction_remind : []} version="4" bordered={false} striped hover pagination search options={this.options}>
                                    <TableHeaderColumn isKey dataField="id" width='100px' dataSort dataAlign='center'>Mã nhắc nợ</TableHeaderColumn>
                                    <TableHeaderColumn dataField="number_payment" width='150px' dataSort dataAlign='center'>STK nhắc nợ</TableHeaderColumn>
                                    <TableHeaderColumn dataField="number_payment_receive" width='150px' dataSort dataAlign='center'>STK được nhắc nợ</TableHeaderColumn>
                                    <TableHeaderColumn dataField="Amount" dataSort dataAlign='center'>Số tiền</TableHeaderColumn>
                                    <TableHeaderColumn dataField="Content" width='200px' dataAlign='center'>Nội dung</TableHeaderColumn>
                                    <TableHeaderColumn dataField="Status" dataFormat={enumFormatter} formatExtraData={isStatus} dataSort dataAlign='center'>Trạng thái</TableHeaderColumn>
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
TransactionRemind = connect((state) => {
    return { ...state.TransactionRemind, ...state.SignIn }
}, { ...actTransactionRemind })(TransactionRemind);
export default TransactionRemind;
