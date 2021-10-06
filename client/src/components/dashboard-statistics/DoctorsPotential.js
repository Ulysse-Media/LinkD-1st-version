import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
} from "shards-react";
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from "react-redux";
import { Bar } from 'react-chartjs-2';
import axiosInstance from "../../config/axios-instance";

class DoctorsPotential extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
    }
  }
  // Component on mount
  componentDidMount() {
    let counter_jobDoctor = 0;
    let counter_generalist = 0;
    let counter_generalDoctor = 0;
    let counter_neuphrologie = 0;
    let counter_kidsDoctor = 0;
    let counter_chirugien = 0;
    let jobDoctorPercentage = 0;
    let generalistPercentage = 0;
    let generalDoctorPercentage = 0;
    let neuphrologiePercentage = 0;
    let kidsDoctorPercentage = 0;
    let chirugienPercentage = 0;
    if (this.props.user.length) {
      if (this.props.user[0].user_position === "VM") {
        axiosInstance.get(`http://localhost:3000/api/doctors/VMsupervisors/${this.props.user[0].user_id}`, {
          params: {
            user_id: this.props.user[0].user_id
          }
        }).then((response) => {
          let total = response.data
          for (let i = 0; i < total.length; i++) {
            if (total[i].doctor_field === "Médecin de travail") {
              counter_jobDoctor++;
            }
            if (total[i].doctor_field === "Generaliste") {
              counter_generalist++;
            }
            if (total[i].doctor_field === "Médecin Général") {
              counter_generalDoctor++;
            }
            if (total[i].doctor_field === "Neuphrologie") {
              counter_neuphrologie++;
            }
            if (total[i].doctor_field === "Médecin enfant") {
              counter_kidsDoctor++;
            }
            if (total[i].doctor_field === "Chirugien") {
              counter_chirugien++;
            }
          }
          jobDoctorPercentage = counter_jobDoctor / total.length;
          generalistPercentage = counter_generalist / total.length;
          generalDoctorPercentage = counter_generalDoctor / total.length;
          neuphrologiePercentage = counter_neuphrologie / total.length;
          kidsDoctorPercentage = counter_kidsDoctor / total.length;
          chirugienPercentage = counter_chirugien / total.length;
          this.setState({
            chartData:
            {
              labels: ["Médecin de travail", "Génèraliste", "Médecin Général", "Neuphrologie", "Médecin enfant", "Chirugien"],
              datasets: [
                {
                  data: [counter_jobDoctor, counter_generalist, counter_generalDoctor, counter_neuphrologie, counter_kidsDoctor, counter_chirugien, total.length],
                  backgroundColor: [
                    "rgb(229,104,56)",
                    "rgb(105,66,209)",
                    "rgb(239,191,61)",
                    "rgb(175,72,152)",
                    "rgb(89,180,189)",
                    "rgb(171,219,227)",
                  ],
                  borderWidth: 2,
                  borderColor: [
                    "rgb(229,104,56)",
                    "rgb(105,66,209)",
                    "rgb(239,191,61)",
                    "rgb(175,72,152)",
                    "rgb(89,180,189)",
                    "rgb(171,219,227)",
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
            if (total[i].doctor_field === "Médecin de travail") {
              counter_jobDoctor++;
            }
            if (total[i].doctor_field === "Generaliste") {
              counter_generalist++;
            }
            if (total[i].doctor_field === "Médecin Général") {
              counter_generalDoctor++;
            }
            if (total[i].doctor_field === "Neuphrologie") {
              counter_neuphrologie++;
            }
            if (total[i].doctor_field === "Médecin enfant") {
              counter_kidsDoctor++;
            }
            if (total[i].doctor_field === "Chirugien") {
              counter_chirugien++;
            }
          }
          jobDoctorPercentage = counter_jobDoctor / total.length;
          generalistPercentage = counter_generalist / total.length;
          generalDoctorPercentage = counter_generalDoctor / total.length;
          neuphrologiePercentage = counter_neuphrologie / total.length;
          kidsDoctorPercentage = counter_kidsDoctor / total.length;
          chirugienPercentage = counter_chirugien / total.length;
          this.setState({
            chartData:
            {
              labels: ["Médecin de travail", "Génèraliste", "Médecin Général", "Neuphrologie", "Médecin enfant", "Chirugien"],
              datasets: [
                {
                  data: [jobDoctorPercentage, generalistPercentage, generalDoctorPercentage, neuphrologiePercentage, kidsDoctorPercentage, chirugienPercentage],
                  backgroundColor: [
                    "rgb(229,104,56)",
                    "rgb(105,66,209)",
                    "rgb(239,191,61)",
                    "rgb(175,72,152)",
                    "rgb(89,180,189)",
                    "rgb(171,219,227)",
                  ],
                  borderWidth: 2,
                  borderColor: [
                    "rgb(229,104,56)",
                    "rgb(105,66,209)",
                    "rgb(239,191,61)",
                    "rgb(175,72,152)",
                    "rgb(89,180,189)",
                    "rgb(171,219,227)",
                  ]
                }
              ]
            }
          })
        })
      } else if (this.props.user[0].user_position === "CDP" || this.props.user[0].user_position === "MED") {
        axiosInstance.get(`http://localhost:3000/api/doctors`, {
        }).then((response) => {
          let total = response.data;
          for (let i = 0; i < total.length; i++) {
            if (total[i].doctor_field === "Médecin de travail") {
              counter_jobDoctor++;
            }
            if (total[i].doctor_field === "Generaliste") {
              counter_generalist++;
            }
            if (total[i].doctor_field === "Médecin Général") {
              counter_generalDoctor++;
            }
            if (total[i].doctor_field === "Neuphrologie") {
              counter_neuphrologie++;
            }
            if (total[i].doctor_field === "Médecin enfant") {
              counter_kidsDoctor++;
            }
            if (total[i].doctor_field === "Chirugien") {
              counter_chirugien++;
            }
          }
          jobDoctorPercentage = counter_jobDoctor / total.length;
          generalistPercentage = counter_generalist / total.length;
          generalDoctorPercentage = counter_generalDoctor / total.length;
          neuphrologiePercentage = counter_neuphrologie / total.length;
          kidsDoctorPercentage = counter_kidsDoctor / total.length;
          chirugienPercentage = counter_chirugien / total.length;
          this.setState({
            chartData:
            {
              labels: ["Médecin de travail", "Génèraliste", "Médecin Général", "Neuphrologie", "Médecin enfant", "Chirugien"],
              datasets: [
                {
                  data: [counter_jobDoctor, counter_generalist, counter_generalDoctor, counter_neuphrologie, counter_kidsDoctor, counter_chirugien],
                  backgroundColor: [
                    "rgb(229,104,56)",
                    "rgb(105,66,209)",
                    "rgb(239,191,61)",
                    "rgb(175,72,152)",
                    "rgb(89,180,189)",
                    "rgb(171,219,227)",
                  ],
                  borderWidth: 2,
                  borderColor: [
                    "rgb(229,104,56)",
                    "rgb(105,66,209)",
                    "rgb(239,191,61)",
                    "rgb(175,72,152)",
                    "rgb(89,180,189)",
                    "rgb(171,219,227)",
                  ]
                }
              ]
            }
          })
        })
      }
    }
  }
  handleHover(e) {
    console.log(e)
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
            <Bar
              data={this.state.chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
              }}
            />
          </CardBody>
        </Card>
      );
    }
  }
}

DoctorsPotential.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart config object.
   */
};

DoctorsPotential.defaultProps = {
  title: "Nombre médecins par spécialité", // Card Title
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.authReducer.user,
    doctors: state.doctorsReducer.doctors
  }
}

export default connect(mapStateToProps, null)(DoctorsPotential);

