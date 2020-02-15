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

import { actStudent, actClass } from "../../actions"
import { connect } from "react-redux";
import * as helper from '../../modules/Helper';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment-timezone';

class CreateStudentManagement extends Component {
    constructor(props) {
        super(props);
        this.refName = React.createRef();
        this.refMale = React.createRef();
        this.refFeMale = React.createRef();
        this.refBirthday = React.createRef();
        this.refAddress = React.createRef();
        this.refRelativeName = React.createRef();
        this.refRelativePhone = React.createRef();
        this.refRelationship = React.createRef();
        this.refClass = React.createRef();

        this.state = {
            value: ''
        }

        this.SaveStudent = this.SaveStudent.bind(this);
        this.onChangeClass = this.onChangeClass.bind(this);
    }

    onChangeClass(value) {
        this.setState({ value });
    }

    SaveStudent(event) {
        event.preventDefault();
        var Name = this.refName.current.value;
        var Address = this.refAddress.current.value;
        var Birthday = this.refBirthday.current.value;
        var Gender = this.refMale.current.checked ? this.refMale.current.value : this.refFeMale.current.checked ? this.refFeMale.current.value : 0;
        var Class = this.state.value !== "" ? this.state.value["value"] : this.props.dataChoose.class_id ? this.props.dataChoose.class_id : 0
        var NameParent = this.refRelativeName.current.value;
        var Phone = this.refRelativePhone.current.value;
        var Relation = this.refRelationship.current.value;

        var params = {
            name: Name,
            address: Address,
            birthday: Birthday,
            gender: parseInt(Gender),
            class_id: parseInt(Class),
            name_parent: NameParent,
            phone: Phone,
            relation: Relation
        }

        // console.log("params", params)
        if (this.props.dataChoose && this.props.dataChoose.id) {
            params.id = this.props.dataChoose.id;
            this.props.updateStudent(params)
        } else {
            this.props.createStudent(params);
        }
        this.setState({
            value: ''
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
                    <Form className="was-validated" onSubmit={this.SaveStudent} >
                        <ModalHeader toggle={(event) => {
                            this.props.toggleModal();
                        }}>Thêm Học Sinh</ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Row>
                                            <Col xs="3">
                                                <Label >Tên học sinh</Label>
                                            </Col>
                                            <Col xs="9">
                                                <input required maxLength="191" type='text' ref={this.refName} className="form-control" placeholder="Tên học sinh" defaultValue={this.props.dataChoose.name ? this.props.dataChoose.name : ""} />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Row>
                                            <Col md="3">
                                                <Label >Giới tính</Label>
                                            </Col>
                                            <Col md="9">
                                                <FormGroup check inline>
                                                    <input ref={this.refMale} className="form-check-input" type="radio" name="inline-radios" value="0" defaultChecked={!this.props.dataChoose.gender ? true : this.props.dataChoose.gender === 0 ? true : false} />
                                                    <Label className="form-check-label" check htmlFor="inline-radio1">Nam</Label>
                                                </FormGroup>
                                                <FormGroup check inline>
                                                    <input ref={this.refFeMale} className="form-check-input" type="radio" name="inline-radios" value="1" defaultChecked={this.props.dataChoose.gender && this.props.dataChoose.gender === 1 ? true : false} />
                                                    <Label className="form-check-label" check htmlFor="inline-radio2">Nữ</Label>
                                                </FormGroup>
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
                                                <Label>Ngày sinh</Label>
                                            </Col>
                                            <Col xs="9">
                                                <input type='date' ref={this.refBirthday} className="form-control" defaultValue={this.props.dataChoose.birthday ? moment(this.props.dataChoose.birthday).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD")} />
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
                                                <Label >Địa chỉ</Label>
                                            </Col>
                                            <Col xs="9">
                                                <textarea required maxLength="191" rows="1" ref={this.refAddress} className="form-control" placeholder="Địa chỉ" defaultValue={this.props.dataChoose.address ? this.props.dataChoose.address : ""} ></textarea>
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
                                                <Label>Tên người thân</Label>
                                            </Col>
                                            <Col xs="9">
                                                <input required maxLength="191" type='text' ref={this.refRelativeName} className="form-control" placeholder="Tên người thân" defaultValue={this.props.dataChoose.name_parent ? this.props.dataChoose.name_parent : ""} />
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
                                                <Label>SĐT người thân</Label>
                                            </Col>
                                            <Col xs="9">
                                                <input required pattern="[0-9]*" minLength="10" maxLength="11" type='text' ref={this.refRelativePhone} className="form-control" placeholder="Số điện thoại" defaultValue={this.props.dataChoose.phone ? this.props.dataChoose.phone : ""} />
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
                                                <Label>Quan hệ</Label>
                                            </Col>
                                            <Col xs="9">
                                                <input required maxLength="191" type='text' ref={this.refRelationship} className="form-control" placeholder="Quan hệ" defaultValue={this.props.dataChoose.relation ? this.props.dataChoose.relation : ""} />
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
                                                <Label>Lớp</Label>
                                            </Col>
                                            <Col xs="9">
                                                <Select
                                                    // required
                                                    placeholder="Chọn lớp học"
                                                    className="cboClass"
                                                    name="form-field-name2"
                                                    value={this.state.value !== "" ? this.state.value : this.props.dataChoose.class_id ? this.props.dataChoose.class_id : ""}
                                                    options={this.props.selectClass ? this.props.selectClass : []}
                                                    onChange={this.onChangeClass}
                                                />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" className="px-3" color="primary"><i className="fa fa-floppy-o"></i> Lưu</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}

CreateStudentManagement = connect((state) => {
    // console.log("state.Student: ", state.Student, " state.Class: ", state.Class)
    return { ...state.Student, ...state.Class }
}, { ...actStudent, ...actClass })(CreateStudentManagement);
export default CreateStudentManagement;
