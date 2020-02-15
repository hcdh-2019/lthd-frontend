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
import { actRevenueDetail, actRevenue } from "../../actions"
import { connect } from "react-redux";
import * as helper from '../../modules/Helper';
import { ToastContainer, toast } from 'react-toastify';

const TypeRevenue = [
    { value: '0', label: 'Khoản thu học sinh' },
    { value: '1', label: 'Khoản chi giáo viên hoặc khác' }
]
class ModalRevenueDetail extends React.Component {
    constructor(props) {
        super(props);
        //set state
        this.state = {
            modal: false,
            dataChoose: {},
            valueRevenue: '',
            valueObject: ''
        };
        this.refName = React.createRef();
        this.refPrice = React.createRef();
        this.SaveRevenueDetail = this.SaveRevenueDetail.bind(this);
        this.onChangeRevenue = this.onChangeRevenue.bind(this);
        this.onChangeObject = this.onChangeObject.bind(this);

    }
    componentDidMount() {
        this.props.getRevenue();
    }
    onChangeRevenue(value) {
        this.setState({ valueRevenue: value });
        this.props.getObject({ id: value.value });
    }
    onChangeObject(value) {
        this.setState({ valueObject: value });
    }
    SaveRevenueDetail(formSubmitRevenueDetail) {
        formSubmitRevenueDetail.preventDefault();
        // var name = this.refName.current.value;
        var price = this.refPrice.current.value;
        var revenue = this.state.valueRevenue !== "" ? this.state.valueRevenue["value"] : this.props.dataChoose.revenue_id ? this.props.dataChoose.revenue_id : 0
        var object = this.state.valueObject !== "" ? this.state.valueObject["value"] : this.props.dataChoose.object_id ? this.props.dataChoose.object_id : 0

        if (this.props.dataChoose && this.props.dataChoose.id) {
            this.props.updateRevenueDetail({ id: this.props.dataChoose.id, revenue_id: revenue, object_id: object, price: parseFloat(price) })
        } else {
            this.props.createRevenueDetail({ revenue_id: revenue, object_id: object, price: parseFloat(price) })
        }
        this.setState({
            modal: false,
            dataChoose: {},
            valueRevenue: '',
            valueObject: ''
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
                    <Form className="was-validated" onSubmit={this.SaveRevenueDetail}>
                        <ModalHeader toggle={this.props.toggle}>{this.props.title}</ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Row>
                                            <Col xs="3">
                                                <Label htmlFor="type">Thu chi</Label>
                                            </Col>
                                            <Col xs="9">
                                                <Select
                                                    required
                                                    placeholder="Chọn thu chi"
                                                    name="form-field-name2"
                                                    value={this.state.valueRevenue !== "" ? this.state.valueRevenue : this.props.dataChoose.revenue_id ? this.props.dataChoose.revenue_id : ""}
                                                    options={this.props.selectRevenue ? this.props.selectRevenue : []}
                                                    onChange={this.onChangeRevenue}
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
                                                <Label htmlFor="type">Đối tượng</Label>
                                            </Col>
                                            <Col xs="9">
                                                <Select
                                                    required
                                                    placeholder="Chọn đối tượng"
                                                    name="form-field-name2"
                                                    value={this.state.valueObject !== "" ? this.state.valueObject : this.props.dataChoose.object_id ? this.props.dataChoose.object_id : ""}
                                                    options={this.props.selectObject ? this.props.selectObject : []}
                                                    onChange={this.onChangeObject}
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
                                                <Label htmlFor="name">Giá trị</Label>
                                            </Col>
                                            <Col xs="9">
                                                <input type="number" ref={this.refPrice} id="price" className="form-control" placeholder="Giá trị" defaultValue={this.props.dataChoose ? this.props.dataChoose.price : ""} required />

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
ModalRevenueDetail = connect((state) => {
    // console.log("state.RevenueDetail",state.RevenueDetail)
    return { ...state.RevenueDetail, ...state.Revenue }
}, { ...actRevenueDetail, ...actRevenue })(ModalRevenueDetail);
export default ModalRevenueDetail;
