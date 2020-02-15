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
// React select
import Select from 'react-select';
import '../../../../scss/vendors/react-select/react-select.scss';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import data from '../../../views_template/Tables/DataTable/_data';
import ModalRevenueDetail from '../../layouts/mSaveRevenueDetail';
import * as helper from '../../../modules/Helper';
import { actRevenueDetail, actRevenue } from "../../../actions";
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const isType = {
    0: 'Khoản thu học sinh',
    1: 'Khoản chi giáo viên hoặc khác'
};
function enumFormatter(cell, row, enumObject) {
    return enumObject[cell];
  }
  
class RevenueDetailManagement extends Component {
    constructor(props) {
        super(props);
        document.title = helper.getPathHost("RevenueDetailManagement", "title")
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
            valueRevenue: '',
            valueObject: ''
        };

        this.toggle = this.toggle.bind(this);
        this.cellButton = this.cellButton.bind(this);
        this.onClickUpdateData = this.onClickUpdateData.bind(this);
        this.onClickDeleteData = this.onClickDeleteData.bind(this);
        this.priceFormatter = this.priceFormatter.bind(this);
        this.onChangeRevenue = this.onChangeRevenue.bind(this);
        this.onChangeObject = this.onChangeObject.bind(this);
        this.binding = this.binding.bind(this);
    }
    componentDidMount() {
        this.props.getRevenueDetail();
        this.props.getRevenue();
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
            title: "Thêm chi tiết thu chi",
            dataChoose: {},
            valueRevenue: '',
            valueObject: ''
        });
    }
    onChangeRevenue(value) {
        this.setState({ valueRevenue: value });
        this.props.getObject({ id: value.value });
    }
    onChangeObject(value) {
        this.setState({ valueObject: value });
    }
    onClickUpdateData(cell, row, rowIndex) {
         console.log('dataChoose: ', row);
        this.setState({
            modal: !this.state.modal,
            dataChoose: row,
            title: "Cập nhật chi tiết thu chi"
        });

        this.props.getObject({ id: row.revenue_id });
    }
    onClickDeleteData(cell, row, rowIndex) {
        // console.log('dataChoose: ', row.id);
        confirmAlert({
            title: 'Thông báo',
            message: 'Bạn muốn xóa chi tiết thu chi?',
            buttons: [
                {
                    label: 'No',
                },
                {
                    label: 'Yes',
                    onClick: () => this.props.deleteRevenueDetail({ id: row.id })
                }
            ]
        });

    }
    priceFormatter(cell) {
        if (!cell) {
            return "";
        }
        return parseFloat(cell);
    }
    binding(cell) {
        if (!cell) {
            return "";
        }
        return `${cell.name}`;
    }

    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <ButtonGroup>
                <Button color="primary" size="sm" onClick={() =>
                    this.onClickUpdateData(cell, row, rowIndex)}>
                    <i className="icon-note no-mr"></i>
                </Button>
                <Button color="danger" size="sm" onClick={() =>
                    this.onClickDeleteData(cell, row, rowIndex)}>
                    <i className="icon-trash no-mr"></i>
                </Button>
            </ButtonGroup>
        )
    }
    render() {
        return (
            <div className="RevenueDetailManagement_page">
                <ModalRevenueDetail
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
                                            <Label htmlFor="id">Mã thu chi</Label>
                                            {/* <Input type="text" id="id" placeholder="Mã thu chi" /> */}
                                            <Select
                                                    placeholder="Chọn thu chi"
                                                    name="form-field-name2"
                                                    value={this.state.valueRevenue !== "" ? this.state.valueRevenue : ""}
                                                    options={this.props.selectRevenue ? this.props.selectRevenue : []}
                                                    onChange={this.onChangeRevenue}
                                                />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="name">Chọn đối tượng</Label>
                                            {/* <Input type="text" id="name" placeholder="Mã đối tượng" /> */}
                                            <Select
                                                    placeholder="Chọn đối tượng"
                                                    name="form-field-name2"
                                                    value={this.state.valueObject !== "" ? this.state.valueObject : ""}
                                                    options={this.props.selectObject ? this.props.selectObject : []}
                                                    onChange={this.onChangeObject}
                                                />
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
                                <i className="icon-menu"></i>Danh sách thu chi
                            </CardHeader>
                            <CardBody>
                                <BootstrapTable data={this.props.revenue_detail ? this.props.revenue_detail.data : []} version="4" bordered={false} striped hover pagination search options={this.options}>
                                    <TableHeaderColumn isKey dataField="revenue" dataFormat={this.binding} dataSort dataAlign='center'>Tên thu chi</TableHeaderColumn>
                                    <TableHeaderColumn dataField="object" dataFormat={this.binding} dataSort dataAlign='center'>Tên đối tượng</TableHeaderColumn>
                                    <TableHeaderColumn dataField="price" dataFormat={this.priceFormatter} dataSort dataAlign='center'>Giá trị</TableHeaderColumn>
                                    <TableHeaderColumn dataField='button' dataFormat={this.cellButton} width='80px' dataAlign='center'></TableHeaderColumn>
                                </BootstrapTable>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
RevenueDetailManagement = connect((state) => {
    return { ...state.RevenueDetail,...state.Revenue }
}, { ...actRevenueDetail,...actRevenue })(RevenueDetailManagement);
export default RevenueDetailManagement;
