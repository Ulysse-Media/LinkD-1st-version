import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
} from "shards-react";
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from "react-redux";
import axiosInstance from "../../config/axios-instance";

class DoctorsNumbers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  // Component on mount
  componentDidMount() {
    let jobDoctor = 0;
    let generalist = 0;
    let generalDoctor = 0;
    let neuphrologie = 0;
    let kidsDoctor = 0;
    let chirugien = 0;
    if (this.props.user.length) {
      if (this.props.user[0].user_position === "VM") {
        axiosInstance.get(`http://localhost:3000/api/doctors/VMsupervisors/${this.props.user[0].user_id}`, {
          params: {
            user_id: this.props.user[0].user_id
          }
        }).then((response) => {
          let total = response.data;
          for (let i = 0; i < total.length; i++) {
            if (total[i].doctor_field === "Médecin de travail") {
              jobDoctor++;
            }
            if (total[i].doctor_field === "Generaliste") {
              generalist++;
            }
            if (total[i].doctor_field === "Médecin Général") {
              generalDoctor++;
            }
            if (total[i].doctor_field === "Neuphrologie") {
              neuphrologie++;
            }
            if (total[i].doctor_field === "Médecin enfant") {
              kidsDoctor++;
            }
            if (total[i].doctor_field === "Chirugien") {
              chirugien++;
            }
          }
          this.setState({ jobDoctor, generalist, generalDoctor, neuphrologie, kidsDoctor, chirugien })
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
              jobDoctor++;
            }
            if (total[i].doctor_field === "Generaliste") {
              generalist++;
            }
            if (total[i].doctor_field === "Médecin Général") {
              generalDoctor++;
            }
            if (total[i].doctor_field === "Neuphrologie") {
              neuphrologie++;
            }
            if (total[i].doctor_field === "Médecin enfant") {
              kidsDoctor++;
            }
            if (total[i].doctor_field === "Chirugien") {
              chirugien++;
            }
          }
          this.setState({ jobDoctor, generalist, generalDoctor, neuphrologie, kidsDoctor, chirugien })
        })
      } else if (this.props.user[0].user_position === "CDP" || this.props.user[0].user_position === "MED") {
        axiosInstance.get(`http://localhost:3000/api/doctors`, {
        }).then((response) => {
          let total = response.data
          for (let i = 0; i < total.length; i++) {
            if (total[i].doctor_field === "Médecin de travail") {
              jobDoctor++;
            }
            if (total[i].doctor_field === "Generaliste") {
              generalist++;
            }
            if (total[i].doctor_field === "Médecin Général") {
              generalDoctor++;
            }
            if (total[i].doctor_field === "Neuphrologie") {
              neuphrologie++;
            }
            if (total[i].doctor_field === "Médecin enfant") {
              kidsDoctor++;
            }
            if (total[i].doctor_field === "Chirugien") {
              chirugien++;
            }
          }
          this.setState({ jobDoctor, generalist, generalDoctor, neuphrologie, kidsDoctor, chirugien })
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
            <ul style={{textAlign: 'left', listStyleType: 'none'}}>
              <li>Médecin de travail : {this.state.jobDoctor}</li>
              <li>Génèraliste : {this.state.generalist}</li>
              <li>Médecine Générale : {this.state.generalDoctor}</li>
              <li>Neuphrologie : {this.state.neuphrologie}</li>
              <li>Médecin enfant : {this.state.kidsDoctor}</li>
              <li>Chirugien : {this.state.chirugien}</li>
            </ul>
          </CardBody>
        </Card>
      );
    }
  }
}

DoctorsNumbers.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart config object.
   */
};

DoctorsNumbers.defaultProps = {
  title: "Statistiques médecins par spécialité", // Card Title
};


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.authReducer.user,
    doctors: state.doctorsReducer.doctors
  }
}


export default connect(mapStateToProps, null)(DoctorsNumbers);

