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
import SaveClass from '../../layouts/mSaveClass';
import * as helper from '../../../modules/Helper';
import { actClass,actTeacher } from "../../../actions"
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert';
import moment from 'moment-timezone';

class ClassManagement extends Component {
    constructor(props) {
        super(props);
        document.title = helper.getPathHost("ClassManagement", "title")
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
            dataChoose: {}
        };
        this.toggle = this.toggle.bind(this);
        this.cellButton = this.cellButton.bind(this)
        this.onClickUpdateData = this.onClickUpdateData.bind(this)
        this.onClickDeleteData = this.onClickDeleteData.bind(this)
        this.dateFormatter = this.dateFormatter.bind(this)
        this.bindingClass = this.bindingClass.bind(this)
    }

    componentDidMount() {
        this.props.getClass();
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
            dataChoose: {}
        });
        // this.props.getTeacherNotIn();
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
            message: 'Bạn muốn xóa lớp học?',
            buttons: [
                {
                    label: 'No',
                },
                {
                    label: 'Yes',
                    onClick: () => this.props.deleteClass({ id: row.id })
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

    render() {
        return (
            <div className="ClassManagement_page">
                <SaveClass
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
                                            <Label htmlFor="name">Mã lớp học</Label>
                                            <Input type="text" id="name" placeholder="Mã lớp học" />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="name">Tên lớp học</Label>
                                            <Input type="text" id="name" placeholder="Tên lớp học" />
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
                                <i className="icon-menu"></i>Danh sách lớp học
                            </CardHeader>
                            <CardBody>
                                <BootstrapTable data={this.props.class ? this.props.class.data : []} version="4" bordered={false} striped hover pagination search options={this.options}>
                                    <TableHeaderColumn isKey dataField="id" dataSort>Mã lớp</TableHeaderColumn>
                                    <TableHeaderColumn dataField="name" dataSort>Tên lớp</TableHeaderColumn>
                                    <TableHeaderColumn dataField='course' dataSort >Khóa</TableHeaderColumn>
                                    <TableHeaderColumn dataField="teacher" dataFormat={this.bindingClass} dataSort>GVCN</TableHeaderColumn>
                                    <TableHeaderColumn dataField="student" dataFormat={this.bindingClass} dataSort>Lớp trưởng</TableHeaderColumn>
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

ClassManagement = connect((state) => {
    // console.log("state.Class: ",state.Class)
    return { ...state.Class , ...state.Teacher }
}, { ...actClass, ...actTeacher })(ClassManagement);
export default ClassManagement;
