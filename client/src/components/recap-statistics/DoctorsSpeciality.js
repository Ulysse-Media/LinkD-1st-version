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
import { getInvitedDoctors } from "../../actions/doctors-actions/actions";
class InvitedDoctorsSpeciality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      doctor_name: [],
    }
  }

  componentDidUpdate(prevProps) {
    let jobDoctor = 0;
    let generalist = 0;
    let generalDoctor = 0;
    let neuphrologie = 0;
    let kidsDoctor = 0;
    let chirugien = 0;
    let jobDoctorPercentage = 0;
    let generalistPercentage = 0;
    let generalDoctorPercentage = 0;
    let neuphrologiePercentage = 0;
    let kidsDoctorPercentage = 0;
    let chirugienPercentage = 0;
    if (this.props.invited_doctors) {
      var doctor_name = [],
        arr = this.props.invited_doctors.split(",")
      for (var i = 0; i < arr.length; i++) {
        doctor_name.push({
          doctor_lname: arr[i].split(" ")[0],
          doctor_fname: arr[i].split(" ")[1]
        })
      }
      if (this.props.invited_doctors !== prevProps.invited_doctors) {
        axiosInstance.get('http://localhost:3000/api/doctors/invited', {
          params: {
            doctor_name: doctor_name,
          }
        }).then(response => {
          let total = response.data
          for (let i = 0; i < total.length; i++) {
            if (total[i].doctor_field === "Médecin de travail") {
              jobDoctor++;
              jobDoctorPercentage = Math.round((jobDoctor / total.length) * 100);
            }
            if (total[i].doctor_field === "Generaliste") {
              generalist++;
              generalistPercentage = Math.round((generalist / total.length) * 100);
            }
            if (total[i].doctor_field === "Médecin Général") {
              generalDoctor++;
              generalDoctorPercentage = Math.round((generalDoctor / total.length) * 100);
            }
            if (total[i].doctor_field === "Neuphrologie") {
              neuphrologie++;
              neuphrologiePercentage = Math.round((neuphrologie / total.length) * 100);
            }
            if (total[i].doctor_field === "Médecin enfant") {
              kidsDoctor++;
              kidsDoctorPercentage = Math.round((kidsDoctor / total.length) * 100);
            }
            if (total[i].doctor_field === "Chirugien") {
              chirugien++;
              chirugienPercentage = Math.round((chirugien / total.length) * 100);
            }
          }
          this.setState({
            chartData:
            {
              labels: ["Docteur de travail", "Généraliste", "Docteur général", "Neuphrologiste", "Docteur d'enfant", "Chirugien"],
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

InvitedDoctorsSpeciality.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart config object.
   */
};

InvitedDoctorsSpeciality.defaultProps = {
  title: "Statistiques spécialités médecins", // Card Title
};


const mapStateToProps = (state, ownProps) => {
  return {
    doctors: state.doctorsReducer.doctors,
    user: state.authReducer.user,
    isLoading: state.doctorsReducer.isLoading,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getInvitedDoctors: (doctor_fname, doctor_lname) => dispatch(getInvitedDoctors(doctor_fname, doctor_lname))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvitedDoctorsSpeciality);

