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
import { actTransactionRemind } from "../../actions"
import { connect } from "react-redux";
import * as helper from '../../modules/Helper';
import { ToastContainer, toast } from 'react-toastify';

class ModalTransactionRemind extends React.Component {
    constructor(props) {
        super(props);
        //set state
        this.state = {
            modal: false,
            dataChoose: {},
        };
        this.refNumberPayment = React.createRef();
        this.refNumberPaymentRemind = React.createRef();
        this.refAmount = React.createRef();
        this.refContent = React.createRef();

        this.SaveTransactionRemind = this.SaveTransactionRemind.bind(this);

    }
    SaveTransactionRemind(formSubmitEvent) {
        formSubmitEvent.preventDefault();
        var numberpayment = this.refNumberPayment.current.value;
        var numberpaymentremind = this.refNumberPaymentRemind.current.value;
        var amount = this.refAmount.current.value;
        var content = this.refContent.current.value;

        if (this.props.dataChoose && this.props.dataChoose.id) {
            this.props.updateTransactionRemind({ id: this.props.dataChoose.id, number_payment: numberpayment, number_payment_remind: numberpaymentremind, amount: amount, content: content })
        } else {
            this.props.createTransactionRemind({ number_payment: numberpayment, number_payment_remind: numberpaymentremind, amount: amount, content: content})
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
                    <Form className="was-validated" onSubmit={this.SaveTransactionRemind}>
                        <ModalHeader toggle={this.props.toggle}>{this.props.title}</ModalHeader>
                        <ModalBody>

                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Row>
                                            <Col xs="3">
                                                <Label htmlFor="number_payment">STK nhắc nợ</Label>
                                            </Col>
                                            <Col xs="9">
                                                <input type="text" maxLength="191" ref={this.refNumberPayment} id="number_payment" className="form-control" placeholder="STK nhắc nợ" defaultValue={this.props.dataChoose ? this.props.dataChoose.number_payment : ""} required readOnly/>

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
                                                <Label htmlFor="number_payment_receive">STK được nhắc nợ</Label>
                                            </Col>
                                            <Col xs="9">
                                                <input type="text" maxLength="191" ref={this.refNumberPaymentRemind} id="number_payment_receive" className="form-control" placeholder="STK nhắc nợ" defaultValue={this.props.dataChoose ? this.props.dataChoose.number_payment_receive : ""} required />

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
                                                <Label htmlFor="amount">Số tiền</Label>
                                            </Col>
                                            <Col xs="9">
                                                <input type="text" maxLength="191" ref={this.refAmount} id="amount" className="form-control" placeholder="Số tiền" defaultValue={this.props.dataChoose ? this.props.dataChoose.Amount : ""} required />
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
                                                <Label htmlFor="content">Nội dung</Label>
                                            </Col>
                                            <Col xs="9">
                                                <input type="text" maxLength="191" ref={this.refContent} id="content" className="form-control" placeholder="Nội dung" defaultValue={this.props.dataChoose ? this.props.dataChoose.Content : ""} required />
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
ModalTransactionRemind = connect((state) => {
    // console.log("state.Customer",state.Customer)
    return { ...state.TransactionRemind }
}, { ...actTransactionRemind })(ModalTransactionRemind);
export default ModalTransactionRemind;
