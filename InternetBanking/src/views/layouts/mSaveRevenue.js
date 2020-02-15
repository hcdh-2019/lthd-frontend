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
import { actRevenue } from "../../actions"
import { connect } from "react-redux";
import * as helper from '../../modules/Helper';
import { ToastContainer, toast } from 'react-toastify';

const TypeRevenue = [
    { value: '0', label: 'Khoản thu học sinh' },
    { value: '1', label: 'Khoản chi giáo viên hoặc khác' }
]
class ModalRevenue extends React.Component {
    constructor(props) {
        super(props);
        //set state
        this.state = {
            modal: false,
            dataChoose: {},
            valueTypeRevenue: ''
        };
        this.refName = React.createRef();
        // this.refType = React.createRef();
        this.SaveRevenue = this.SaveRevenue.bind(this);
        this.onChangeTypeRevenue = this.onChangeTypeRevenue.bind(this);

    }
    onChangeTypeRevenue(value) {
        this.setState({ valueTypeRevenue: value });
    }
    SaveRevenue(formSubmitRevenue) {
        formSubmitRevenue.preventDefault();
        var name = this.refName.current.value;
        // var type = this.refType.current.value;
        var type = this.state.valueTypeRevenue !== "" ? this.state.valueTypeRevenue["value"] : this.props.dataChoose.type ? this.props.dataChoose.type : 0

        if (this.props.dataChoose && this.props.dataChoose.id) {
            this.props.updateRevenue({ id: this.props.dataChoose.id, name: name, type: type })
        } else {
            this.props.createRevenue({ name: name, type: type })
        }
        this.setState({
            modal: false,
            dataChoose: {},
            valueTypeRevenue: ''
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
                    <Form className="was-validated" onSubmit={this.SaveRevenue}>
                        <ModalHeader toggle={this.props.toggle}>{this.props.title}</ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Row>
                                            <Col xs="3">
                                                <Label htmlFor="name">Tên thu chi</Label>
                                            </Col>
                                            <Col xs="9">
                                                <input type="text" maxLength="191" ref={this.refName} id="name" className="form-control" placeholder="Tên hoạt động" defaultValue={this.props.dataChoose ? this.props.dataChoose.name : ""} required />

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
                                                <Label htmlFor="type">Loại thu chi</Label>
                                            </Col>
                                            <Col xs="9">
                                                <Select
                                                    required
                                                    placeholder="Chọn loại thu chi"
                                                    name="form-field-name2"
                                                    value={this.state.valueTypeRevenue !== "" ? this.state.valueTypeRevenue : this.props.dataChoose.type ? this.props.dataChoose.type : ""}
                                                    options={TypeRevenue}
                                                    onChange={this.onChangeTypeRevenue}
                                                />
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
ModalRevenue = connect((state) => {
    // console.log("state.Revenue",state.Revenue)
    return { ...state.Revenue }
}, { ...actRevenue })(ModalRevenue);
export default ModalRevenue;
