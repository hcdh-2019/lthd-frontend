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
import * as helper from '../../../modules/Helper';
import { actSubject, actScore, actClass } from "../../../actions"
import { connect } from "react-redux";
import moment from 'moment-timezone';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import '../../../../scss/vendors/react-select/react-select.scss';

class ScoreManagement extends Component {
    constructor(props) {
        super(props);
        document.title = helper.getPathHost("ScoreManagement", "title")
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

        this.cellEditProp = {
            mode: 'click',
            blurToSave: true
        }

        this.state = {
            valueSubject: '',
            valueClass: '',
            valueCheck: ''
        }

        this.refTableScore = React.createRef();
        this.refBtnSave = React.createRef();

        this.SaveScore = this.SaveScore.bind(this);
        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onChangeClass = this.onChangeClass.bind(this);
        this.Validator = this.Validator.bind(this);
        this.Check = this.Check.bind(this);
        this.dateFormatter = this.dateFormatter.bind(this);
    }

    componentDidMount() {
        this.props.getClass();
        this.props.getSubject();
    }

    onChangeSubject(value) {
        this.setState({ valueSubject: value });
    }

    onChangeClass(value) {
        this.setState({ valueClass: value });
    }

    Validator(value) {
        if (parseFloat(value) < 0 || parseFloat(value) > 10) {
            return "Điểm từ 0 đến 10";
        }
        return true;
    }

    Check(value) {
        this.setState({ valueCheck: value });
    }

    SaveScore(event) {
        event.preventDefault();
        var data = this.refTableScore.current.props.data;
        // console.log("data", data)
        var Subject = this.state.valueSubject !== "" ? this.state.valueSubject["value"] : 0;
        var Class = this.state.valueClass !== "" ? this.state.valueClass["value"] : 0;
        var params = {
            query: "?subject_id=" + parseInt(Subject) + "&class_id=" + parseInt(Class)
        }

        if (this.state.valueCheck === "save") {
            var ProcessedData = data.reduce(function (accumulator, currentValue) {
                return [
                    ...accumulator,
                    {
                        'class_id': parseInt(Class),
                        'student_id': parseInt(currentValue.student_id),
                        'subject_id': parseInt(Subject),
                        'short_examination': parseFloat(currentValue.short_examination),
                        '15_examination': parseFloat(currentValue["15_examination"]),
                        '60_examination': parseFloat(currentValue["60_examination"]),
                        'half_examination': parseFloat(currentValue.half_examination),
                        'examination': parseFloat(currentValue.examination),
                    }
                ];
            }, [])
            // console.log("ProcessedData", ProcessedData)
            if (ProcessedData.length) {
                this.props.createScore(ProcessedData, params);
            } else {
                toast.warning("Không có dữ liệu điểm - Vui lòng kiểm tra lại!")
            }

        } else if (this.state.valueCheck === "search") {
            this.props.getScore(params);
        }
    }

    dateFormatter(cell) {
        if (!cell) {
            return "";
        }
        return `${parseFloat(cell)}`;
    }
    render() {
        return (
            <div className="ScoreManagement_page">
                <ToastContainer
                    autoClose={3000}
                    position={toast.POSITION.TOP_RIGHT}
                />
                <Row>
                    <Col xs="12" sm="12">
                        <Card className="search_box">
                            <Form onSubmit={this.SaveScore} >
                                <CardBody>
                                    <Row>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Row>
                                                    <Col xs="3">
                                                        <Label>Lớp</Label>
                                                    </Col>
                                                    <Col xs="9">
                                                        <Select
                                                            required
                                                            placeholder="Chọn lớp"
                                                            name="form-field-name2"
                                                            value={this.state.valueClass !== "" ? this.state.valueClass : ""}
                                                            options={this.props.selectClass ? this.props.selectClass : []}
                                                            onChange={this.onChangeClass}
                                                        />
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Row>
                                                    <Col xs="3">
                                                        <Label>Môn học</Label>
                                                    </Col>
                                                    <Col xs="9">
                                                        <Select
                                                            required
                                                            placeholder="Chọn môn học"
                                                            name="form-field-name2"
                                                            value={this.state.valueSubject !== "" ? this.state.valueSubject : ""}
                                                            options={this.props.selectSubject ? this.props.selectSubject : []}
                                                            onChange={this.onChangeSubject}
                                                        />
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter>
                                    <FormGroup style={{ textAlign: "center", marginBottom: 0 }}>
                                        <button type="submit" onClick={(event) => { this.Check('search') }} className="btn btn-primary"><i className="icon-magnifier"></i> Tìm Kiếm</button>
                                        <button type="submit" onClick={(event) => { this.Check('save') }} className="btn btn-warning" style={{ width: "100px" }}><i className="fa fa-floppy-o" ></i>Lưu</button>
                                    </FormGroup>
                                </CardFooter>
                            </Form>
                        </Card>
                        <Card>
                            <CardHeader>
                                <i className="icon-menu"></i>Danh sách điểm
                            </CardHeader>
                            <CardBody>
                                <BootstrapTable ref={this.refTableScore} data={this.props.score ? this.props.score : []} version="4" bordered={false} cellEdit={this.cellEditProp} striped hover pagination search options={this.options}>
                                    <TableHeaderColumn isKey editable={false} hidden={true} dataField="student_id" ></TableHeaderColumn>
                                    <TableHeaderColumn editable={false} dataField="student_name" dataSort >Tên học sinh</TableHeaderColumn>
                                    <TableHeaderColumn dataField="short_examination" dataAlign="center" dataFormat={this.dateFormatter} editable={{ type: 'number', validator: this.Validator }} dataSort>Điểm miệng</TableHeaderColumn>
                                    <TableHeaderColumn dataField="15_examination" dataAlign="center" dataFormat={this.dateFormatter} editable={{ type: 'number', validator: this.Validator }} dataSort>Điểm 15p</TableHeaderColumn>
                                    <TableHeaderColumn dataField="60_examination" dataAlign="center" dataFormat={this.dateFormatter} editable={{ type: 'number', validator: this.Validator }} dataSort>Điểm 1 tiết</TableHeaderColumn>
                                    <TableHeaderColumn dataField="half_examination" dataAlign="center" dataFormat={this.dateFormatter} editable={{ type: 'number', validator: this.Validator }} dataSort>Điểm giữa kỳ</TableHeaderColumn>
                                    <TableHeaderColumn dataField="examination" dataFormat={this.dateFormatter} editable={{ type: 'number', validator: this.Validator }} dataAlign="center" dataSort>Điểm cuối kỳ</TableHeaderColumn>
                                </BootstrapTable>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

ScoreManagement = connect((state) => {
    // console.log("state", state)
    return { ...state.Subject, ...state.Score, ...state.Class }
}, { ...actSubject, ...actScore, ...actClass })(ScoreManagement);
export default ScoreManagement;