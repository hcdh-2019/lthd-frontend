import React, { Component } from 'react';
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
// React select
import Select from 'react-select';
import '../../../scss/vendors/react-select/react-select.scss';
import { actClass, actTeacher, actStudent } from "../../actions"
import { connect } from "react-redux";
import * as helper from '../../modules/Helper';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment-timezone';

class CreateClassManagement extends Component {
    constructor(props) {
        super(props);
        this.refName = React.createRef();
        this.refCourse = React.createRef();;

        this.state = {
            valueTeacher: '',
            valueStudent: ''
        }

        this.SaveClass = this.SaveClass.bind(this);
        this.onChangeTeacher = this.onChangeTeacher.bind(this);
        this.onChangeStudent = this.onChangeStudent.bind(this);
    }

    componentDidMount() {
        this.props.getStudent();
        this.props.getTeacher();
    }

    onChangeTeacher(value) {
        this.setState({ valueTeacher: value });
    }

    onChangeStudent(value) {
        this.setState({ valueStudent: value });
    }

    SaveClass(event) {
        event.preventDefault();
        var Name = this.refName.current.value;
        var Teacher = this.state.valueTeacher !== "" ? this.state.valueTeacher["value"] : this.props.dataChoose.teacher_id ? this.props.dataChoose.teacher_id : 0
        var Student = this.state.valueStudent !== "" ? this.state.valueStudent["value"] : this.props.dataChoose.class_leader ? this.props.dataChoose.class_leader : 0
        var Course = this.refCourse.current.value;

        var params = {
            name: Name,
            teacher_id: parseInt(Teacher),
            class_leader: parseInt(Student),
            course: Course
        }

        // console.log("params", params)
        if (this.props.dataChoose && this.props.dataChoose.id) {
            params.id = this.props.dataChoose.id;
            this.props.updateClass(params)
        } else {
            this.props.createClass(params);
        }
        this.setState({
            valueTeacher: '',
            valueStudent: ''
        });
        this.props.toggleModal();
    }
    render() {
        // console.log('dataChoose: ', this.props.dataChoose);
        return (
            <div>
                <ToastContainer
                    autoClose={3000}
                    position={toast.POSITION.TOP_RIGHT}
                />
                <Modal backdrop={'static'} isOpen={this.props.modal} toggle={this.props.toggle} className={'modal-lg modal-primary'}>
                    <Form className="was-validated" onSubmit={this.SaveClass} >
                        <ModalHeader toggle={(event) => {
                            this.props.toggleModal();
                        }}>Thêm lớp học</ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Row>
                                            <Col xs="3">
                                                <Label >Tên lớp học</Label>
                                            </Col>
                                            <Col xs="9">
                                                <input required maxLength="191" type='text' ref={this.refName} className="form-control" placeholder="Tên lớp học" defaultValue={this.props.dataChoose.name ? this.props.dataChoose.name : ""} />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Row>
                                            <Col xs="3">
                                                <Label>Khóa học</Label>
                                            </Col>
                                            <Col xs="9">
                                                <input required maxLength="191" type='text' ref={this.refCourse} className="form-control" placeholder="Khóa học" defaultValue={this.props.dataChoose.course ? this.props.dataChoose.course : ""} />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Row>
                                            <Col xs="3">
                                                <Label>GVCN</Label>
                                            </Col>
                                            <Col xs="9">
                                                <Select
                                                    required
                                                    placeholder="Chọn giáo viên"
                                                    name="form-field-name2"
                                                    value={this.state.valueTeacher !== "" ? this.state.valueTeacher : this.props.dataChoose.teacher_id ? this.props.dataChoose.teacher_id : ""}
                                                    options={this.props.selectTeacher ? this.props.selectTeacher : []}
                                                    onChange={this.onChangeTeacher}
                                                />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Row>
                                            <Col xs="3">
                                                <Label>Lớp trưởng</Label>
                                            </Col>
                                            <Col xs="9">
                                                <Select
                                                    placeholder="Chọn học sinh"
                                                    name="form-field-name2"
                                                    value={this.state.valueStudent !== "" ? this.state.valueStudent : this.props.dataChoose.class_leader ? this.props.dataChoose.class_leader : ""}
                                                    options={this.props.selectStudent ? this.props.selectStudent : []}
                                                    onChange={this.onChangeStudent}
                                                />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button className="px-3" color="primary" type="submit"><i className="fa fa-floppy-o"></i> Lưu</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}

CreateClassManagement = connect((state) => {
    // console.log("state.Class: ", state.Class, " state.Student: ", state.Student, " state.Teacher: ", state.Teacher)
    return { ...state.Class, ...state.Student, ...state.Teacher }
}, { ...actClass, ...actStudent, ...actTeacher })(CreateClassManagement);
export default CreateClassManagement;
