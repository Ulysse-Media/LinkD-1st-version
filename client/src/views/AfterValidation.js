import React, { useEffect } from "react";
import {
    Select,
} from 'mui-rff';
import {
    Typography,
    Paper,
    Grid,
    Button,
    TextField
} from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from "react-redux";
import { getAgencies } from "../actions/agencies-actions/actions";
import { getServices } from "../actions/services-actions/actions";
import { validateservices } from "../actions/actions-initiation-actions/actions";
import { useHistory } from "react-router-dom";

const AfterValidation = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    // Agencies state from redux store
    const agencies = useSelector(
        (state) => state.agenciesReducer.agencies
    );
    // Services state from redux store
    const services = useSelector(
        (state) => state.servicesReducer.services
    );
    // Action state from redux store
    const action = useSelector(
        (state) => state.actionsReducer.action
    );
    // Submit Form Group inputs
    const onSubmit = async (values) => {
        dispatch(validateservices(values, action));
    };
    const handleBack = () => {
        history.goBack();
    }
    useEffect(() => {
        dispatch(getAgencies());
        dispatch(getServices());
    }, [dispatch])
    // All displayed fields form //
    const formFields = [
        {
            size: 3,
            field: (
                <Typography className={"typography"} style={{ marginTop: "18px" }}>
                    Agences : <span className="red-star">*</span>
                </Typography>
            ),
        },
        {
            size: 9,
            field: (
                <Field type="select" name="agency">
                    {props => (
                        <div>
                            <Select
                                name="agency"
                                formControlProps={{ margin: 'none' }}
                                multiple
                                type="select"
                                native
                            >
                                {agencies.map((element, key) => {
                                    return (<option key={key} value={[element.agency_email, element.agency_name]}>
                                        {element.agency_name}
                                    </option>)
                                })}

                            </Select>
                        </div>
                    )}
                </Field>
            ),
        },
        {
            size: 3,
            field: (
                <Typography className={"typography"} style={{ marginTop: "18px" }}>
                    Services : <span className="red-star">*</span>
                </Typography>
            ),
        },
        {
            size: 9,
            field: (
                <Field type="select" name="service_name">
                    {props => (
                        <div>
                            <Select
                                name="service_name"
                                formControlProps={{ margin: 'none' }}
                                multiple
                                type="select"
                                native
                            >
                                {services.map((element, key) => {
                                    return (<option key={key} value={element.service_name}>
                                        {element.service_name}
                                    </option>)
                                })}
                            </Select>
                        </div>
                    )}
                </Field>
            ),
        },
        {
            size: 3,
            field: (
                <Typography className={"typography"} >
                    Commentaires :
                </Typography>
            ),
        },
        {
            size: 9,
            field: (
                <Field name="comments">
                {props => (
                  <div>
                    <TextField
                      placeholder="Tapez des commentaires"
                      margin="none"
                    />
                  </div>
                )}
              </Field>
            ),
        },
    ];
    return (
        <div style={{ padding: 16, margin: 'auto', maxWidth: 1225, height: '100%' }}>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form }) => (
                    <form onSubmit={handleSubmit}>
                        <Paper style={{ padding: 16 }}>
                            <Grid item xs={12}>
                                <Typography variant="h5" component="p">
                                    Choix de service
                                </Typography>
                            </Grid>
                            <Grid container alignItems="flex-start" spacing={2}>
                                {formFields.map((item, index) => (
                                    <Grid item xs={item.size} key={index}>
                                        {item.field}
                                    </Grid>
                                ))}
                                <Grid item style={{ marginTop: 16 }}>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        onClick={handleBack}
                                    >
                                        Précedent
                                    </Button>
                                </Grid>
                                <Grid item style={{ marginTop: 16 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Envoyer
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </form>
                )}
            />
        </div>
    );
}

export default AfterValidation;
