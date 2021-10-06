import React from "react";
import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Container
} from "shards-react";
import { connect } from "react-redux";
import axiosInstance from "../../config/axios-instance";

class ActionsNumber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actions: [],
            user: {},
            chartData: {},
            time: 0,
        }
    }

    // Component on mount
    componentDidMount() {
        let isCancelled = false;
        try {
            if (this.props.user.length > 0) {
                this.setState({ user: this.props.user[0] });
            }
        } catch (err) {
            console.log(err)
        }
        if (!isCancelled) {
            if (this.props.user[0]) {
                if (this.props.user[0].user_position === "VM") {
                    axiosInstance.get(`http://localhost:3000/api/actions/user/user_id?user_id=${this.props.user[0].user_id}`).then(response => {
                        let actions = response.data;
                        let counter = 0;
                        let total = 0;
                        let time = 0;
                        for (var i = 0; i < actions.length; i++) {
                            if(new Date().getTime() - new Date(actions[i].start_action).getTime() === 7884000) {
                                counter++;
                            } else {
                                console.log(false);
                            }
                            total = actions.length;
                        }
                        time = Math.round(counter / total);
                        this.setState({time})
                    })
                } else if (this.props.user[0].user_position === "DSM") {
                    axiosInstance.get(`http://localhost:3000/api/actions/user/VM/actions/:${this.props.user[0].user_id}`, {
                        params: {
                            user_id: this.props.user[0].user_id
                        }
                    }).then(response => {
                        let actions = response.data;
                        for (var i = 0; i < actions.length; i++) {
                        }
                        this.setState({})
                    })
                } else if (this.props.user[0].user_position === "CDP") {
                    axiosInstance.get(`http://localhost:3000/api/actions/user/VM/validated/actions/:${this.props.user[0].user_id}`, {
                        params: {
                            user_id: this.props.user[0].user_id
                        }
                    }).then(response => {
                        let actions = response.data;
                        for (var i = 0; i < actions.length; i++) {
                        }
                        this.setState({})
                    })
                } else if (this.props.user[0].user_position === "MED") {
                    axiosInstance.get(`http://localhost:3000/api/actions/user/validation/DSMvalidated/speaker`).then(response => {
                        let actions = response.data;
                        for (var i = 0; i < actions.length; i++) {
                            
                        }
                        this.setState({})
                    })
                }
            }
        }
        isCancelled = true;
    }
    render() {
        const { title } = this.props;
        return (
            <Card small className="h-100">
                <CardHeader className="border-bottom">
                    <h6 className="m-0">{title}</h6>
                </CardHeader>
                <CardBody className="d-flex py-0">
                    <Container fluid className="main-content-container px-4">
                        <Row>
                            <Col lg="6" md="9" sm="12" className="mb-4">Nombre d'actions par trimestre : <span className="actions-number">0</span></Col>
                            <Col lg="6" md="9" sm="12" className="mb-4">Nombre d'actions YTD : <span className="actions-number">0</span></Col>
                        </Row>
                    </Container>
                </CardBody>
            </Card>
        );
    }
}

ActionsNumber.propTypes = {
    /**
     * The component's title.
     */
    title: PropTypes.string,
    /**
     * The chart config object.
     */
};

ActionsNumber.defaultProps = {
    title: "Nombre d'actions annuellement et par trimestre",
};


const mapStateToProps = (state, ownProps) => {
    return {
        actions: state.actionsReducer.actionsUser,
        user: state.authReducer.user,
        isLoading: state.authReducer.isLoading
    }
}

export default connect(mapStateToProps, null)(ActionsNumber);
