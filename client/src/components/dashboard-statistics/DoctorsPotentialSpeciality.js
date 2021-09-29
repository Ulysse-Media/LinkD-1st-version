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

class DoctorsPotentialSpeciality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      counter_jobDoctor_A: 0,
      counter_jobDoctor_B: 0,
      counter_jobDoctor_C: 0,
      counter_jobDoctor_D: 0,
      counter_generalist_A: 0,
      counter_generalist_B: 0,
      counter_generalist_C: 0,
      counter_generalist_D: 0,
      counter_generalDoctor_A: 0,
      counter_generalDoctor_B: 0,
      counter_generalDoctor_C: 0,
      counter_generalDoctor_D: 0,
      counter_neuphrologie_A: 0,
      counter_neuphrologie_B: 0,
      counter_neuphrologie_C: 0,
      counter_neuphrologie_D: 0,
      counter_kidsDoctor_A: 0,
      counter_kidsDoctor_B: 0,
      counter_kidsDoctor_C: 0,
      counter_kidsDoctor_D: 0,
      counter_chirugien_A: 0,
      counter_chirugien_B: 0,
      counter_chirugien_C: 0,
      counter_chirugien_D: 0,
    }
  }
  // Component on mount
  componentDidMount() {
    let jobDoctor = [];
    let generalist = [];
    let generalDoctor = [];
    let neuphrologie = [];
    let kidsDoctor = [];
    let chirugien = [];
    let counter_jobDoctor_A = 0;
    let counter_jobDoctor_B = 0;
    let counter_jobDoctor_C = 0;
    let counter_jobDoctor_D = 0;
    let counter_generalist_A = 0;
    let counter_generalist_B = 0;
    let counter_generalist_C = 0;
    let counter_generalist_D = 0;
    let counter_generalDoctor_A = 0;
    let counter_generalDoctor_B = 0;
    let counter_generalDoctor_C = 0;
    let counter_generalDoctor_D = 0;
    let counter_neuphrologie_A = 0;
    let counter_neuphrologie_B = 0;
    let counter_neuphrologie_C = 0;
    let counter_neuphrologie_D = 0;
    let counter_kidsDoctor_A = 0;
    let counter_kidsDoctor_B = 0;
    let counter_kidsDoctor_C = 0;
    let counter_kidsDoctor_D = 0;
    let counter_chirugien_A = 0;
    let counter_chirugien_B = 0;
    let counter_chirugien_C = 0;
    let counter_chirugien_D = 0;
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
              jobDoctor.push(total[i]);
            }
            if (total[i].doctor_field === "Generaliste") {
              generalist.push(total[i]);
            }
            if (total[i].doctor_field === "Médecin Général") {
              generalDoctor.push(total[i]);
            }
            if (total[i].doctor_field === "Neuphrologie") {
              neuphrologie.push(total[i]);
            }
            if (total[i].doctor_field === "Médecin enfant") {
              kidsDoctor.push(total[i]);
            }
            if (total[i].doctor_field === "Chirugien") {
              chirugien.push(total[i]);
            }
          }
          // Job doctor percentage // 
          jobDoctor.map((element, key) => {
            if (element.doctor_potential === 'A') {
              counter_jobDoctor_A++;
            }
            if (element.doctor_potential === 'B') {
              counter_jobDoctor_B++;
            }
            if (element.doctor_potential === 'C') {
              counter_jobDoctor_C++;
            }
            if (element.doctor_potential === 'D') {
              counter_jobDoctor_D++;
            }
          });
          this.setState({ counter_jobDoctor_A, counter_jobDoctor_B, counter_jobDoctor_C, counter_jobDoctor_D });
          // Generalist percentage // 
          generalist.map((element, key) => {
            if (element.doctor_potential === 'A') {
              counter_generalist_A++;
            }
            if (element.doctor_potential === 'B') {
              counter_generalist_B++;
            }
            if (element.doctor_potential === 'C') {
              counter_generalist_C++;
            }
            if (element.doctor_potential === 'D') {
              counter_generalist_D++;
            }
          })
          this.setState({ counter_generalist_A, counter_generalist_B, counter_generalist_C, counter_generalist_D });
          // General Doctor percentage // 
          generalDoctor.map((element, key) => {
            if (element.doctor_potential === 'A') {
              counter_generalDoctor_A++;
            }
            if (element.doctor_potential === 'B') {
              counter_generalDoctor_B++;
            }
            if (element.doctor_potential === 'C') {
              counter_generalDoctor_C++;
            }
            if (element.doctor_potential === 'D') {
              counter_generalDoctor_D++;
            }
          })
          this.setState({ counter_generalDoctor_A, counter_generalDoctor_B, counter_generalDoctor_C, counter_generalDoctor_D });
          // Neuphrologie percentage // 
          neuphrologie.map((element, key) => {
            if (element.doctor_potential === 'A') {
              counter_neuphrologie_A++;
            }
            if (element.doctor_potential === 'B') {
              counter_neuphrologie_B++;
            }
            if (element.doctor_potential === 'C') {
              counter_neuphrologie_C++;
            }
            if (element.doctor_potential === 'D') {
              counter_neuphrologie_D++;
            }
          })
          this.setState({ counter_neuphrologie_A, counter_neuphrologie_B, counter_neuphrologie_C, counter_neuphrologie_D });
          // Kids Doctor percentage // 
          kidsDoctor.map((element, key) => {
            if (element.doctor_potential === 'A') {
              counter_kidsDoctor_A++;
            }
            if (element.doctor_potential === 'B') {
              counter_kidsDoctor_B++;
            }
            if (element.doctor_potential === 'C') {
              counter_kidsDoctor_C++;
            }
            if (element.doctor_potential === 'D') {
              counter_kidsDoctor_D++;
            }
          })
          this.setState({ counter_kidsDoctor_A, counter_kidsDoctor_B, counter_kidsDoctor_C, counter_kidsDoctor_D });
          // Chirugien percentage // 
          chirugien.map((element, key) => {
            if (element.doctor_potential === 'A') {
              counter_chirugien_A++;
            }
            if (element.doctor_potential === 'B') {
              counter_chirugien_B++;
            }
            if (element.doctor_potential === 'C') {
              counter_chirugien_C++;
            }
            if (element.doctor_potential === 'D') {
              counter_chirugien_D++;
            }
          })
          this.setState({ counter_chirugien_A, counter_chirugien_B, counter_chirugien_C, counter_chirugien_D });
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
              jobDoctor.push(total[i]);
            }
            if (total[i].doctor_field === "Generaliste") {
              generalist.push(total[i]);
            }
            if (total[i].doctor_field === "Médecin Général") {
              generalDoctor.push(total[i]);
            }
            if (total[i].doctor_field === "Neuphrologie") {
              neuphrologie.push(total[i]);
            }
            if (total[i].doctor_field === "Médecin enfant") {
              kidsDoctor.push(total[i]);

            }
            if (total[i].doctor_field === "Chirugien") {
              chirugien.push(total[i]);
            }
          }
          // Job doctor percentage // 
          jobDoctor.map((element, key) => {
            if (element.doctor_potential === 'A') {
              counter_jobDoctor_A++;
            }
            if (element.doctor_potential === 'B') {
              counter_jobDoctor_B++;
            }
            if (element.doctor_potential === 'C') {
              counter_jobDoctor_C++;
            }
            if (element.doctor_potential === 'D') {
              counter_jobDoctor_D++;
            }
          })
          // Generalist percentage // 
          generalist.map((element, key) => {
            if (element.doctor_potential === 'A') {
              counter_generalist_A++;
            }
            if (element.doctor_potential === 'B') {
              counter_generalist_B++;
            }
            if (element.doctor_potential === 'C') {
              counter_generalist_C++;
            }
            if (element.doctor_potential === 'D') {
              counter_generalist_D++;
            }
          })
          // General Doctor percentage // 
          generalDoctor.map((element, key) => {
            if (element.doctor_potential === 'A') {
              counter_generalDoctor_A++;
            }
            if (element.doctor_potential === 'B') {
              counter_generalDoctor_B++;
            }
            if (element.doctor_potential === 'C') {
              counter_generalDoctor_C++;
            }
            if (element.doctor_potential === 'D') {
              counter_generalDoctor_D++;
            }
          })
          // Neuphrologie percentage // 
          neuphrologie.map((element, key) => {
            if (element.doctor_potential === 'A') {
              counter_neuphrologie_A++;
            }
            if (element.doctor_potential === 'B') {
              counter_neuphrologie_B++;
            }
            if (element.doctor_potential === 'C') {
              counter_neuphrologie_C++;
            }
            if (element.doctor_potential === 'D') {
              counter_neuphrologie_D++;
            }
          })
          // Kids Doctor percentage // 
          kidsDoctor.map((element, key) => {
            if (element.doctor_potential === 'A') {
              counter_kidsDoctor_A++;
            }
            if (element.doctor_potential === 'B') {
              counter_kidsDoctor_B++;
            }
            if (element.doctor_potential === 'C') {
              counter_kidsDoctor_C++;
            }
            if (element.doctor_potential === 'D') {
              counter_kidsDoctor_D++;
            }
          })
          // Chirugien percentage // 
          chirugien.map((element, key) => {
            if (element.doctor_potential === 'A') {
              counter_chirugien_A++;
            }
            if (element.doctor_potential === 'B') {
              counter_chirugien_B++;
            }
            if (element.doctor_potential === 'C') {
              counter_chirugien_C++;
            }
            if (element.doctor_potential === 'D') {
              counter_chirugien_D++;
            }
          })
        })
      } else if (this.props.user[0].user_position === "CDP" || this.props.user[0].user_position === "MED") {
        axiosInstance.get(`http://localhost:3000/api/doctors`, {
        }).then((response) => {
          let total = response.data;
          for (let i = 0; i < total.length; i++) {
            if (total[i].doctor_field === "Médecin de travail") {
              jobDoctor.push(total[i]);
            }
            if (total[i].doctor_field === "Generaliste") {
              generalist.push(total[i]);
            }
            if (total[i].doctor_field === "Médecin Général") {
              generalDoctor.push(total[i]);
            }
            if (total[i].doctor_field === "Neuphrologie") {
              neuphrologie.push(total[i]);
            }
            if (total[i].doctor_field === "Médecin enfant") {
              kidsDoctor.push(total[i]);

            }
            if (total[i].doctor_field === "Chirugien") {
              chirugien.push(total[i]);
            }
          }
          // Job doctor percentage // 
          jobDoctor.map((element, key) => {
            if (element.doctor_potential === 'A') {
              counter_jobDoctor_A++;
            }
            if (element.doctor_potential === 'B') {
              counter_jobDoctor_B++;
            }
            if (element.doctor_potential === 'C') {
              counter_jobDoctor_C++;
            }
            if (element.doctor_potential === 'D') {
              counter_jobDoctor_D++;
            }
          })
          // Generalist percentage // 
          generalist.map((element, key) => {
            if (element.doctor_potential === 'A') {
              counter_generalist_A++;
            }
            if (element.doctor_potential === 'B') {
              counter_generalist_B++;
            }
            if (element.doctor_potential === 'C') {
              counter_generalist_C++;
            }
            if (element.doctor_potential === 'D') {
              counter_generalist_D++;
            }
          })
          // General Doctor percentage // 
          generalDoctor.map((element, key) => {
            if (element.doctor_potential === 'A') {
              counter_generalDoctor_A++;
            }
            if (element.doctor_potential === 'B') {
              counter_generalDoctor_B++;
            }
            if (element.doctor_potential === 'C') {
              counter_generalDoctor_C++;
            }
            if (element.doctor_potential === 'D') {
              counter_generalDoctor_D++;
            }
          })
          // Neuphrologie percentage // 
          neuphrologie.map((element, key) => {
            if (element.doctor_potential === 'A') {
              counter_neuphrologie_A++;
            }
            if (element.doctor_potential === 'B') {
              counter_neuphrologie_B++;
            }
            if (element.doctor_potential === 'C') {
              counter_neuphrologie_C++;
            }
            if (element.doctor_potential === 'D') {
              counter_neuphrologie_D++;
            }
          })
          // Kids Doctor percentage // 
          kidsDoctor.map((element, key) => {
            if (element.doctor_potential === 'A') {
              counter_kidsDoctor_A++;
            }
            if (element.doctor_potential === 'B') {
              counter_kidsDoctor_B++;
            }
            if (element.doctor_potential === 'C') {
              counter_kidsDoctor_C++;
            }
            if (element.doctor_potential === 'D') {
              counter_kidsDoctor_D++;
            }
          })
          // Chirugien percentage // 
          chirugien.map((element, key) => {
            if (element.doctor_potential === 'A') {
              counter_chirugien_A++;
            }
            if (element.doctor_potential === 'B') {
              counter_chirugien_B++;
            }
            if (element.doctor_potential === 'C') {
              counter_chirugien_C++;
            }
            if (element.doctor_potential === 'D') {
              counter_chirugien_D++;
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
            <ul style={{ textAlign: 'left', listStyleType: 'none' }}>
              <li>Médecin de travail : <span>A</span>({this.state.counter_jobDoctor_A}) <span>B</span>({this.state.counter_jobDoctor_B}) <span>C</span>({this.state.counter_jobDoctor_C}) <span>D</span>({this.state.counter_jobDoctor_D})</li>
              <li>Génèraliste : <span>A</span>({this.state.counter_generalist_A}) <span>B</span>({this.state.counter_generalist_B}) <span>C</span>({this.state.counter_generalist_C}) <span>D</span>({this.state.counter_generalist_D})</li>
              <li>Médecine Générale : <span>A</span>({this.state.counter_generalDoctor_A}) <span>B</span>({this.state.counter_generalDoctor_B}) <span>C</span>({this.state.counter_generalDoctor_C}) <span>D</span>({this.state.counter_generalDoctor_D})</li>
              <li>Neuphrologie : <span>A</span>({this.state.counter_neuphrologie_A}) <span>B</span>({this.state.counter_neuphrologie_B}) <span>C</span>({this.state.counter_neuphrologie_C}) <span>D</span>({this.state.counter_neuphrologie_D})</li>
              <li>Médecin enfant : A({this.state.counter_kidsDoctor_A}) B({this.state.counter_kidsDoctor_B}) C({this.state.counter_kidsDoctor_C}) D({this.state.counter_kidsDoctor_D})</li>
              <li>Chirugien : <span>A</span>({this.state.counter_chirugien_A}) <span>B</span>({this.state.counter_chirugien_B}) <span>C</span>({this.state.counter_chirugien_C}) <span>D</span>({this.state.counter_chirugien_D})</li>
            </ul>
          </CardBody>
        </Card>
      );
    }
  }
}

DoctorsPotentialSpeciality.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart config object.
   */
};

DoctorsPotentialSpeciality.defaultProps = {
  title: "Potentiels médecins par spécialité", // Card Title
};


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.authReducer.user,
    doctors: state.doctorsReducer.doctors
  }
}


export default connect(mapStateToProps, null)(DoctorsPotentialSpeciality);

