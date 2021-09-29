import React from "react";
import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    CardBody,
} from "shards-react";
import { connect } from "react-redux";
import { Doughnut } from 'react-chartjs-2';
import axiosInstance from "../../config/axios-instance";

class ActionsReporting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actions: [],
            user: {},
            chartData: {},
            validated: 0,
            denied: 0,
            pending: 0,
        }
    }

    // Component on mount
    componentDidMount() {
        let pendingVM = 0;
        let pendingDSM = 0;
        let pendingCDP = 0;
        let validated = 0;
        let denied = 0;
        let finished = 0;
        let archieved = 0;
        let pendingPercentage = 0;
        let pendingPercentageVM = 0;
        let pendingPercentageDSM = 0;
        let pendingPercentageCDP = 0;
        let deniedPercentage = 0;
        let validatedPercentage = 0;
        let finishedPercentage = 0;
        let archievedPercentage = 0;
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
                        for (var i = 0; i < actions.length; i++) {
                            if (actions[i].status === "En attente de validation VM") {
                                pendingVM++;
                                pendingPercentageVM = (pendingVM / actions.length) * 100;
                            }
                            if (actions[i].status === "En attente de validation DSM") {
                                pendingDSM++;
                                pendingPercentageDSM = (pendingDSM / actions.length) * 100;
                            }
                            if (actions[i].status === "En attente de validation CDP") {
                                pendingCDP++;
                                pendingPercentageCDP = (pendingCDP / actions.length) * 100;
                            }
                            if (actions[i].status === "En attente de validation CDP et MED") {
                                pendingCDP++;
                                pendingPercentageCDP = (pendingCDP / actions.length) * 100;
                            }
                            if (actions[i].status === "Validé") {
                                validated++;
                                validatedPercentage = Math.round((validated / actions.length) * 100);
                            }
                            if (actions[i].status === "Finalisée") {
                                finished++;
                                finishedPercentage = Math.round((finished / actions.length) * 100);
                            }
                            if (actions[i].status === "Terminée et archivée") {
                                archieved++;
                                archievedPercentage = Math.round((archieved / actions.length) * 100);
                            }
                            if (actions[i].status === "Refusé") {
                                denied++;
                                deniedPercentage = Math.round((denied / actions.length) * 100);
                            }
                        }
                        pendingPercentage = Math.round(pendingPercentageVM + pendingPercentageDSM + pendingPercentageCDP);
                        this.setState({
                            chartData:
                            {
                                labels: ["En attente", "Validé", "Terminé", "Archivé", "Refusé"],
                                datasets: [
                                    {
                                        data: [pendingPercentage, validatedPercentage, finishedPercentage, archievedPercentage, deniedPercentage],
                                        backgroundColor: [
                                            "rgb(239,191,61)",
                                            "rgb(105,66,209)",
                                            "rgb(171,219,227)",
                                            "rgb(175,72,152)",
                                            "rgb(229,104,56)",
                                        ],
                                        borderWidth: 2,
                                        borderColor: [
                                            "rgb(239,191,61)",
                                            "rgb(105,66,209)",
                                            "rgb(171,219,227)",
                                            "rgb(175,72,152)",
                                            "rgb(229,104,56)",
                                        ]
                                    }
                                ]
                            },

                        })
                    })
                } else if (this.props.user[0].user_position === "DSM") {
                    axiosInstance.get(`http://localhost:3000/api/actions/user/VM/actions/:${this.props.user[0].user_id}`, {
                        params: {
                            user_id: this.props.user[0].user_id
                        }
                    }).then(response => {
                        let actions = response.data;
                        for (var i = 0; i < actions.length; i++) {
                            if (actions[i].status === "En attente de validation DSM") {
                                pendingDSM++;
                                pendingPercentageDSM = Math.round((pendingDSM / actions.length) * 100);
                            }
                            if (actions[i].status === "Validé") {
                                validated++;
                                validatedPercentage = Math.round((validated / actions.length) * 100);
                            }
                            if (actions[i].status === "Finalisée") {
                                finished++;
                                finishedPercentage = Math.round((finished / actions.length) * 100);
                            }
                            if (actions[i].status === "Terminée et archivée") {
                                archieved++;
                                archievedPercentage = Math.round((archieved / actions.length) * 100);
                            }
                            if (actions[i].status === "Refusé") {
                                denied++;
                                deniedPercentage = Math.round((denied / actions.length) * 100);
                            }
                        }
                        this.setState({
                            chartData:
                            {
                                labels: ["En attente", "Validé", "Terminé", "Archivé", "Refusé"],
                                datasets: [
                                    {
                                        data: [pendingPercentageDSM, validatedPercentage, finishedPercentage, archievedPercentage, deniedPercentage],
                                        backgroundColor: [
                                            "rgb(239,191,61)",
                                            "rgb(105,66,209)",
                                            "rgb(171,219,227)",
                                            "rgb(175,72,152)",
                                            "rgb(229,104,56)",
                                        ],
                                        borderWidth: 2,
                                        borderColor: [
                                            "rgb(239,191,61)",
                                            "rgb(105,66,209)",
                                            "rgb(171,219,227)",
                                            "rgb(175,72,152)",
                                            "rgb(229,104,56)",
                                        ]
                                    },
                                ]
                            }
                        })
                    })
                } else if (this.props.user[0].user_position === "CDP") {
                    axiosInstance.get(`http://localhost:3000/api/actions/user/VM/validated/actions/:${this.props.user[0].user_id}`, {
                        params: {
                            user_id: this.props.user[0].user_id
                        }
                    }).then(response => {
                        let actions = response.data;
                        for (var i = 0; i < actions.length; i++) {
                            if (actions[i].status === "En attente de validation CDP") {
                                pendingCDP++;
                                pendingPercentageCDP = Math.round((pendingCDP / actions.length) * 100);
                            }
                            if (actions[i].status === "Validé") {
                                validated++;
                                validatedPercentage = Math.round((validated / actions.length) * 100);
                            }
                            if (actions[i].status === "Finalisée") {
                                finished++;
                                finishedPercentage = Math.round((finished / actions.length) * 100);
                            }
                            if (actions[i].status === "Terminée et archivée") {
                                archieved++;
                                archievedPercentage = Math.round((archieved / actions.length) * 100);
                            }
                            if (actions[i].status === "Refusé") {
                                denied++;
                                deniedPercentage = Math.round((denied / actions.length) * 100);
                            }
                        }
                        this.setState({
                            chartData:
                            {
                                labels: ["En attente", "Validé", "Terminé", "Archivé", "Refusé"],
                                datasets: [
                                    {
                                        data: [pendingPercentageCDP, validatedPercentage, finishedPercentage, archievedPercentage, deniedPercentage],
                                        backgroundColor: [
                                            "rgb(239,191,61)",
                                            "rgb(105,66,209)",
                                            "rgb(171,219,227)",
                                            "rgb(175,72,152)",
                                            "rgb(229,104,56)",
                                        ],
                                        borderWidth: 2,
                                        borderColor: [
                                            "rgb(239,191,61)",
                                            "rgb(105,66,209)",
                                            "rgb(171,219,227)",
                                            "rgb(175,72,152)",
                                            "rgb(229,104,56)",
                                        ]
                                    }
                                ]
                            }
                        })
                    })
                } else if (this.props.user[0].user_position === "MED") {
                    axiosInstance.get(`http://localhost:3000/api/actions/user/validation/DSMvalidated/speaker`).then(response => {
                        let actions = response.data;
                        for (var i = 0; i < actions.length; i++) {
                            if (actions[i].status === "En attente de validation CDP") {
                                pendingCDP++;
                                pendingPercentageCDP = Math.round((pendingCDP / actions.length) * 100);
                            }
                            if (actions[i].status === "Validé") {
                                validated++;
                                validatedPercentage = Math.round((validated / actions.length) * 100);
                            }
                            if (actions[i].status === "Finalisée") {
                                finished++;
                                finishedPercentage = Math.round((finished / actions.length) * 100);
                            }
                            if (actions[i].status === "Terminée et archivée") {
                                archieved++;
                                archievedPercentage = Math.round((archieved / actions.length) * 100);
                            }
                            if (actions[i].status === "Refusé") {
                                denied++;
                                deniedPercentage = Math.round((denied / actions.length) * 100);
                            }
                        }
                        this.setState({
                            chartData:
                            {
                                labels: ["En attente", "Validé", "Terminé", "Archivé", "Refusé"],
                                datasets: [
                                    {
                                        data: [pendingPercentageCDP, validatedPercentage, finishedPercentage, archievedPercentage, deniedPercentage],
                                        backgroundColor: [
                                            "rgb(239,191,61)",
                                            "rgb(105,66,209)",
                                            "rgb(171,219,227)",
                                            "rgb(175,72,152)",
                                            "rgb(229,104,56)",
                                        ],
                                        borderWidth: 2,
                                        borderColor: [
                                            "rgb(239,191,61)",
                                            "rgb(105,66,209)",
                                            "rgb(171,219,227)",
                                            "rgb(175,72,152)",
                                            "rgb(229,104,56)",
                                        ]
                                    }
                                ]
                            }
                        })
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
                    <Doughnut
                        data={this.state.chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: true,
                            callbacks: {
                                label: function(tooltipItems, data) { 
                                    return tooltipItems.yLabel + ' %';
                                }
                            }
                        }}
                        
                    />
                </CardBody>
            </Card>
        );
    }
}

ActionsReporting.propTypes = {
    /**
     * The component's title.
     */
    title: PropTypes.string,
    /**
     * The chart config object.
     */
};

ActionsReporting.defaultProps = {
    title: "Rapport sur les actions",
};


const mapStateToProps = (state, ownProps) => {
    return {
        actions: state.actionsReducer.actionsUser,
        user: state.authReducer.user,
        isLoading: state.authReducer.isLoading
    }
}

export default connect(mapStateToProps, null)(ActionsReporting);
