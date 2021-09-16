import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
} from "shards-react";
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from "react-redux";
import { Doughnut } from 'react-chartjs-2';
import axiosInstance from "../../config/axios-instance";

class DoctorsFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: [],
      chartData: {},
    }
  }
// Component on mount
  componentDidMount() {
    let A = 0;
    let B = 0;
    let C = 0;
    let APercentage = 0;
    let BPercentage = 0;
    let CPercentage = 0;
    if (this.props.user.length) {
      if (this.props.user[0].user_position === "VM") {
        axiosInstance.get(`http://localhost:3000/api/doctors/VMsupervisors/${this.props.user[0].user_id}`, {
          params: {
            user_id: this.props.user[0].user_id
          }
        }).then((response) => {
          let total = response.data
          for (let i = 0; i < total.length; i++) {
            if (total[i].doctor_potential === "A") {
              A++;
              APercentage = Math.round((A / total.length) * 100);
            }
            if (total[i].doctor_potential === "B") {
              B++;
              BPercentage = Math.round((B / total.length) * 100);
            }
            if (total[i].doctor_potential === "C") {
              C++;
              CPercentage = Math.round((C / total.length) * 100);
            }
          }
          this.setState({
            chartData:
            {
              labels: ["A", "B", "C"],
              datasets: [
                {
                  data: [APercentage, BPercentage, CPercentage],
                  backgroundColor: [
                    "rgb(105,66,209)",
                    "rgb(239,191,61)",
                    "rgb(229,104,56)",
                  ],
                  borderWidth: 2,
                  borderColor: [
                    "rgb(105,66,209)",
                    "rgb(239,191,61)",
                    "rgb(229,104,56)",
                  ]
                }
              ]
            }
          })
        })
      } else if (this.props.user[0].user_position === "DSM") {
        axiosInstance.get(`http://localhost:3000/api/doctors/VMsupervisors/${this.props.user[0].VM_supervisor}`, {
          params: {
            user_id: this.props.user[0].VM_supervisor
          }
        }).then((response) => {
          let total = response.data
          for (let i = 0; i < total.length; i++) {
            if (total[i].doctor_potential === "A") {
              A++;
              APercentage = Math.round((A / total.length) * 100);
            }
            if (total[i].doctor_potential === "B") {
              B++;
              BPercentage = Math.round((B / total.length) * 100);
            }
            if (total[i].doctor_potential === "C") {
              C++;
              CPercentage = Math.round((C / total.length) * 100);
            }
          }
          this.setState({
            chartData:
            {
              labels: ["A", "B", "C"],
              datasets: [
                {
                  data: [APercentage, BPercentage, CPercentage],
                  backgroundColor: [
                    "rgb(105,66,209)",
                    "rgb(239,191,61)",
                    "rgb(229,104,56)",
                  ],
                  borderWidth: 2,
                  borderColor: [
                    "rgb(105,66,209)",
                    "rgb(239,191,61)",
                    "rgb(229,104,56)",
                  ]
                }
              ]
            }
          })
        })
      } else if (this.props.user[0].user_position === "CDP" || this.props.user[0].user_position === "MED") {
        axiosInstance.get(`http://localhost:3000/api/doctors`, {
        }).then((response) => {
          let total = response.data
          for (let i = 0; i < total.length; i++) {
            if (total[i].doctor_potential === "A") {
              A++;
              APercentage = Math.round((A / total.length) * 100);
            }
            if (total[i].doctor_potential === "B") {
              B++;
              BPercentage = Math.round((B / total.length) * 100);
            }
            if (total[i].doctor_potential === "C") {
              C++;
              CPercentage = Math.round((C / total.length) * 100);
            }
          }
          this.setState({
            chartData:
            {
              labels: ["A", "B", "C"],
              datasets: [
                {
                  data: [APercentage, BPercentage, CPercentage],
                  backgroundColor: [
                    "rgb(105,66,209)",
                    "rgb(239,191,61)",
                    "rgb(229,104,56)",
                  ],
                  borderWidth: 2,
                  borderColor: [
                    "rgb(105,66,209)",
                    "rgb(239,191,61)",
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

  render() {
    const { title, isLoading } = this.props;
    if (isLoading) {
      return (
        <CircularProgress color="primary" className="spinner" /> // Loading Spinner
      )
    } else {
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
              }}
            />
          </CardBody>
        </Card>
      );
    }
  }
}

DoctorsFeedback.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart config object.
   */
};

DoctorsFeedback.defaultProps = {
  title: "Statistiques feedback médecins", // Card Title
};


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.authReducer.user,
    doctors: state.doctorsReducer.doctors
  }
}


export default connect(mapStateToProps, null)(DoctorsFeedback);

