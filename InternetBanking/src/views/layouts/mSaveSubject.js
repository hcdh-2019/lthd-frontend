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
import { actSubject } from "../../actions"
import { connect } from "react-redux";
import * as helper from '../../modules/Helper';
import { ToastContainer, toast } from 'react-toastify';

class CreateSubjectManagement extends React.Component {
    constructor(props) {
        super(props);
        this.refName = React.createRef();
        this.SaveSubject = this.SaveSubject.bind(this);
    }

    SaveSubject(event) {
        event.preventDefault();
        var Name = this.refName.current.value;
        if (this.props.dataChoose && this.props.dataChoose.id) {
            this.props.updateSubject({ id: this.props.dataChoose.id, name: Name })
        } else {
            this.props.createSubject({ name: Name })
        }

        this.props.toggleModal();
    }
    render() {
        return (
            <div>
                <ToastContainer
                    autoClose={3000}
                    position={toast.POSITION.TOP_RIGHT}
                />
                <Modal backdrop={'static'} isOpen={this.props.modal} toggle={this.props.toggle} className={'modal-lg modal-primary'}>
                    <Form className="was-validated" onSubmit={this.SaveSubject} >
                        <ModalHeader toggle={(event) => {
                            this.props.toggleModal();
                        }}>Thêm Môn Học</ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Row>
                                            <Col xs="3">
                                                <Label htmlFor="name">Tên Môn Học</Label>
                                            </Col>
                                            <Col xs="9">
                                                <input required maxLength="191" type='text' ref={this.refName} id="name" className="form-control" placeholder="Tên môn học" defaultValue={this.props.dataChoose ? this.props.dataChoose.name : ""} />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>

                        </ModalBody>
                        <ModalFooter>
                            <Button className="px-3" color="primary" type="submit"><i className="fa fa-floppy-o" ></i> Lưu</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}

CreateSubjectManagement = connect((state) => {
    // console.log("state.Subject",state.Subject)
    return { ...state.Subject }
}, { ...actSubject })(CreateSubjectManagement);
export default CreateSubjectManagement;
