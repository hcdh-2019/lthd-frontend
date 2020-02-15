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
import { actEvent } from "../../actions"
import { connect } from "react-redux";
import * as helper from '../../modules/Helper';
import { ToastContainer, toast } from 'react-toastify';

class ModalEvent extends React.Component {
    constructor(props) {
        super(props);
        //set state
        this.state = {
            modal: false,
            dataChoose: {}
        };
        this.refName = React.createRef();

        this.SaveEvent = this.SaveEvent.bind(this);

    }
    SaveEvent(formSubmitEvent) {
        formSubmitEvent.preventDefault();
        var name = this.refName.current.value;

        if (this.props.dataChoose && this.props.dataChoose.id) {
            this.props.updateEvent({ id: this.props.dataChoose.id, name: name })
        } else {
            this.props.createEvent({ name: name })
        }
        this.setState({
            modal: false,
            dataChoose: {}
        });
        this.props.toggle();
    }
    render() {
        return (
            <div>
                <ToastContainer
                    autoClose={3000}
                    position={toast.POSITION.TOP_RIGHT}
                />
                <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={'modal-lg modal-primary'}>
                    <Form className="was-validated" onSubmit={this.SaveEvent}>
                        <ModalHeader toggle={this.props.toggle}>{this.props.title}</ModalHeader>
                        <ModalBody>

                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Row>
                                            <Col xs="3">
                                                <Label htmlFor="name">Tên hoạt động</Label>
                                            </Col>
                                            <Col xs="9">
                                                <input type="text" maxLength="191" ref={this.refName} id="name" className="form-control" placeholder="Tên hoạt động" defaultValue={this.props.dataChoose ? this.props.dataChoose.name : ""} required />

                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="primary" id="btnSave"><i className="fa fa-floppy-o"></i> Lưu</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}
ModalEvent = connect((state) => {
    // console.log("state.Event",state.Event)
    return { ...state.Event }
}, { ...actEvent })(ModalEvent);
export default ModalEvent;
