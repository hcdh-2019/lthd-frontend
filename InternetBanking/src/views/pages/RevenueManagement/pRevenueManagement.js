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
import ModalRevenue from '../../layouts/mSaveRevenue';
import * as helper from '../../../modules/Helper';
import { actRevenue } from "../../../actions";
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Select from 'react-select';
import '../../../../scss/vendors/react-select/react-select.scss';

const isType = {
    0: 'Khoản thu học sinh',
    1: 'Khoản chi giáo viên hoặc khác'
};

const TypeRevenue = [
    { value: '0', label: 'Khoản thu học sinh' },
    { value: '1', label: 'Khoản chi giáo viên hoặc khác' }
]

function enumFormatter(cell, row, enumObject) {
    return enumObject[cell];
  }
  
class RevenueManagement extends Component {
    constructor(props) {
        super(props);
        document.title = helper.getPathHost("RevenueManagement", "title")
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
        this.props.getRevenue();
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
            title: "Thêm thu chi",
            dataChoose: {},
        });
    }
    onClickUpdateData(cell, row, rowIndex) {
        // console.log('dataChoose: ', row);
        this.setState({
            modal: !this.state.modal,
            dataChoose: row,
            title: "Cập nhật thu chi"
        });
    }
    onClickDeleteData(cell, row, rowIndex) {
        // console.log('dataChoose: ', row.id);
        confirmAlert({
            title: 'Thông báo',
            message: 'Bạn muốn xóa thu chi?',
            buttons: [
                {
                    label: 'No',
                },
                {
                    label: 'Yes',
                    onClick: () => this.props.deleteRevenue({ id: row.id })
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
                <Button color="danger" size="sm" onClick={() =>
                    this.onClickDeleteData(cell, row, rowIndex)}>
                    <i className="icon-trash no-mr"></i>
                </Button>
            </ButtonGroup>
        )
    }
    render() {
        return (
            <div className="RevenueManagement_page">
                <ModalRevenue
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
                                    <Col xs="4">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="id">Mã thu chi</Label>
                                            <Input type="text" id="id" placeholder="Mã thu chi" />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="4">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="name">Tên thu chi</Label>
                                            <Input type="text" id="name" placeholder="Tên thu chi" />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="4">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="type">Loại thu chi</Label>
                                            <Select
                                                    required
                                                    placeholder="Chọn loại thu chi"
                                                    name="form-field-name2"
                                                    value={this.state.valueTypeRevenue !== "" ? this.state.valueTypeRevenue : this.props.dataChoose.type ? this.props.dataChoose.type : ""}
                                                    options={TypeRevenue}
                                                    onChange={this.onChangeTypeRevenue}
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
                                <BootstrapTable data={this.props.revenue ? this.props.revenue.data : []} version="4" bordered={false} striped hover pagination search options={this.options}>
                                    <TableHeaderColumn isKey dataField="id" dataSort dataAlign='center'>Mã thu chi</TableHeaderColumn>
                                    <TableHeaderColumn dataField="name" dataSort>Tên thu chi</TableHeaderColumn>
                                    <TableHeaderColumn dataField="type" dataFormat={enumFormatter} formatExtraData={isType} dataSort>Loại thu chi</TableHeaderColumn>
                                    <TableHeaderColumn dataField='button' dataFormat={this.cellButton} width='80px'></TableHeaderColumn>
                                </BootstrapTable>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
RevenueManagement = connect((state) => {
    return { ...state.Revenue }
}, { ...actRevenue })(RevenueManagement);
export default RevenueManagement;
