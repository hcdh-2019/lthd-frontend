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
import SaveStudent from '../../layouts/mSaveStudent';
import * as helper from '../../../modules/Helper';
import { actStudent, actClass } from "../../../actions"
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert';
import moment from 'moment-timezone';
import Select from 'react-select';
import '../../../../scss/vendors/react-select/react-select.scss';

const Gender = {
    0: 'Nam',
    1: 'Nữ'
};

class StudentManagement extends Component {
    constructor(props) {
        super(props);
        document.title = helper.getPathHost("StudentManagement", "title")
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
            value: ''
        };
        this.toggle = this.toggle.bind(this);
        this.cellButton = this.cellButton.bind(this)
        this.onClickUpdateData = this.onClickUpdateData.bind(this)
        this.onClickDeleteData = this.onClickDeleteData.bind(this)
        this.dateFormatter = this.dateFormatter.bind(this)
        this.enumFormatter = this.enumFormatter.bind(this)
        this.bindingClass = this.bindingClass.bind(this)
        this.onChangeClass = this.onChangeClass.bind(this);
    }

    componentDidMount() {
        this.props.getStudent();
        this.props.getClass();
    }

    onChangeClass(value) {
        this.setState({ value });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
            dataChoose: {}
        });
    }
    onClickUpdateData(cell, row, rowIndex) {
        // console.log('dataChoose: ', row);
        this.setState({
            modal: !this.state.modal,
            dataChoose: row
        });
    }

    onClickDeleteData(cell, row, rowIndex) {
        // console.log('dataChoose: ', row.id);
        confirmAlert({
            title: 'Thông báo',
            message: 'Bạn muốn xóa học sinh?',
            buttons: [
                {
                    label: 'No'
                }, {
                    label: 'Yes',
                    onClick: () => this.props.deleteStudent({ id: row.id })
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

    dateFormatter(cell) {
        if (!cell) {
            return "";
        }
        return `${moment(cell).format("DD/MM/YYYY")}`;
    }

    bindingClass(cell) {
        if (!cell) {
            return "";
        }
        return `${cell.name}`;
    }

    enumFormatter(cell, row, enumObject) {
        return enumObject[cell];
    }

    render() {
        return (
            <div className="StudentManagement_page">
                <SaveStudent
                    modal={this.state.modal}
                    dataChoose={this.state.dataChoose}
                    toggleModal={this.toggle}
                />
                <Row>
                    <Col xs="12" sm="12">
                        <Card className="search_box">
                            <CardBody>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="name">Lớp</Label>
                                            <Select
                                                    placeholder="Chọn lớp học"
                                                    className="cboClass"
                                                    name="form-field-name2"
                                                    value={this.state.value !== "" ? this.state.value : ""}
                                                    options={this.props.selectClass ? this.props.selectClass : []}
                                                    onChange={this.onChangeClass}
                                                />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="name">Tên học sinh</Label>
                                            <Input type="text" id="name" placeholder="Tên học sinh" />
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
                                <i className="icon-menu"></i>Danh sách học sinh
                            </CardHeader>
                            <CardBody>
                                <BootstrapTable data={this.props.student ? this.props.student.data : []} version="4" bordered={false} striped hover pagination search options={this.options}>
                                    <TableHeaderColumn isKey dataField="id" dataSort>Mã HS</TableHeaderColumn>
                                    <TableHeaderColumn dataField="name" dataSort>Tên HS</TableHeaderColumn>
                                    <TableHeaderColumn dataField='gender' dataSort dataFormat={this.enumFormatter} formatExtraData={Gender}>Giới tính</TableHeaderColumn>
                                    <TableHeaderColumn dataField="address" >Địa chỉ</TableHeaderColumn>
                                    <TableHeaderColumn dataField="classes" dataFormat={this.bindingClass} dataSort>Lớp</TableHeaderColumn>
                                    <TableHeaderColumn dataField="birthday" dataFormat={this.dateFormatter}>Ngày sinh</TableHeaderColumn>
                                    <TableHeaderColumn dataField="created_at" dataFormat={this.dateFormatter}>Ngày tạo</TableHeaderColumn>
                                    <TableHeaderColumn dataField="updated_at" dataFormat={this.dateFormatter}>Ngày cập nhật</TableHeaderColumn>
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

StudentManagement = connect((state) => {
    // console.log("state.Student: ",state.Student ," state.Class: ",state.Class)
    return { ...state.Student, ...state.Class }
}, { ...actStudent, ...actClass })(StudentManagement);
export default StudentManagement;
