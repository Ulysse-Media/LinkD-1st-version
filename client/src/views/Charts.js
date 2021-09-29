import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import DoctorsSpeciality from "../components/dashboard-statistics/DoctorsSpeciality";
import DoctorsFeedback from "../components/dashboard-statistics/DoctorsFeedback";
import DoctorsNumbers from "../components/dashboard-statistics/DoctorsNumbers";
import DoctorsPotentialSpeciality from "../components/dashboard-statistics/DoctorsPotentialSpeciality";
import DoctorsPotential from "../components/dashboard-statistics/DoctorsPotential";
import ActionsNumber from "../components/dashboard-statistics/ActionsNumber";
import ActionsReporting from "../components/dashboard-statistics/ActionsReporting";
import { useSelector } from "react-redux";

const Charts = () => {
  const [Username, setUsername] = useState("");
  const user = useSelector(
    (state) => state.authReducer.user
);

useEffect(() => {
  if(user.length) {
    setUsername(user[0].user_email.split("@").shift());
  }
}, [user])
  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 1225, height: '100%' }}>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title={`Bonjour ${Username}`} subtitle="Dashboard" className="text-sm-left mb-3" />
        </Row>
        <Row style={{ textAlign: "center", justifyContent: "center" }}>
          {/* Actions number */}
          <Col lg="12" md="9" sm="12" className="mb-4">
            <ActionsNumber />
          </Col>
          {/* Actions reporting */}
          <Col lg="4" md="9" sm="12" className="mb-4">
            <ActionsReporting />
          </Col>
          {/* Doctors Feedbacks */}
          <Col lg="4" md="9" sm="12" className="mb-4">
            <DoctorsFeedback />
          </Col>
          {/* Doctors Speciality */}
          <Col lg="4" md="9" sm="12" className="mb-4">
            <DoctorsSpeciality />
          </Col>
          {/* Doctors number by speciality */}
          <Col lg="12" md="9" sm="12" className="mb-4">
            <DoctorsPotential />
          </Col>
          {/* Doctors number by speciality */}
          <Col lg="6" md="9" sm="12" className="mb-4">
            <DoctorsNumbers />
          </Col>
          {/* Doctors number by speciality potential */}
          <Col lg="6" md="9" sm="12" className="mb-4">
            <DoctorsPotentialSpeciality />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Charts;
