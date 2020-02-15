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
import ModalEvent from '../../layouts/mSaveEvent';
import * as helper from '../../../modules/Helper';
import { actEvent } from "../../../actions";
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function enumFormatter(cell, row, enumObject) {
    return enumObject[cell];
  }
  
class EventManagement extends Component {
    constructor(props) {
        super(props);
        document.title = helper.getPathHost("EventManagement", "title")
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
        this.props.getEvent();
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
            title: "Thêm hoạt động",
            dataChoose: {},
        });
    }
    onClickUpdateData(cell, row, rowIndex) {
        // console.log('dataChoose: ', row);
        this.setState({
            modal: !this.state.modal,
            dataChoose: row,
            title: "Cập nhật hoạt động"
        });
    }
    onClickDeleteData(cell, row, rowIndex) {
        // console.log('dataChoose: ', row.id);
        confirmAlert({
            title: 'Thông báo',
            message: 'Bạn muốn xóa hoạt động?',
            buttons: [
                {
                    label: 'No',
                },
                {
                    label: 'Yes',
                    onClick: () => this.props.deleteEvent({ id: row.id })
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
            <div className="EventManagement_page">
                <ModalEvent
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
                                            <Label htmlFor="name">Mã hoạt động</Label>
                                            <Input type="text" id="name" placeholder="Mã hoạt động" />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup style={{ marginBottom: 0 }}>
                                            <Label htmlFor="name">Tên hoạt động</Label>
                                            <Input type="text" id="name" placeholder="Tên hoạt động" />
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
                                <i className="icon-menu"></i>Danh sách hoạt động
                            </CardHeader>
                            <CardBody>
                                <BootstrapTable data={this.props.event ? this.props.event.data : []} version="4" bordered={false} striped hover pagination search options={this.options}>
                                    <TableHeaderColumn isKey dataField="id" dataSort dataAlign='center'>Mã hoạt động</TableHeaderColumn>
                                    <TableHeaderColumn dataField="name" dataSort dataAlign='center'>Tên hoạt động</TableHeaderColumn>
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
EventManagement = connect((state) => {
    return { ...state.Event }
}, { ...actEvent })(EventManagement);
export default EventManagement;
