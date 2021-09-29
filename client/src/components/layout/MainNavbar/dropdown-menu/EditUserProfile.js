import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import {
    TextField,
} from 'mui-rff';
import {
    Typography,
    Paper,
    Grid,
    Button,
    CircularProgress,
} from '@material-ui/core';
import PageTitle from "../../../common/PageTitle";
import { Row } from "shards-react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../../../actions/auth-actions/actions";

const EditUserProfile = () => {
    const [File, setFile] = useState([]);
    const dispatch = useDispatch();
    // User state from redux store
    const user = useSelector(
        (state) => state.authReducer.user[0]
    );
    // Loading state from redux store
    const isLoading = useSelector(
        (state) => state.doctorsReducer.isLoading
    );

    const onFileChange = function (e) {
        setFile(e.target.files[0]); // Hook file to local state
    }
    // Validator for required fields //
    const validate = values => {
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\^&\*])(?=.{8,})");
        const errors = {};
        if (values.user_password !== values.user_password_confirmation) {
            errors.user_password = 'Vous devez saisir le méme mot de passe';
            errors.user_password_confirmation = 'Vous devez saisir le méme mot de passe';
        } else {
            if (!strongRegex.test(values.user_password)) {
                errors.user_password = 'Votre mot de passe doit depasser 8 charactéres, au minimum une lettre majiscule, un chiffre et un symbole';
            }
            if (!strongRegex.test(values.user_password_confirmation)) {
                errors.user_password = 'Votre mot de passe doit depasser 8 charactéres, au minimum une lettre majiscule, un chiffre et un symbole';
            }
        }
        return errors;
    };

    // Submit Form Group
    const onSubmit = async (values) => {
        const formData = new FormData(); // Create an instance of FormData
        formData.append("file", File, File.name); // Append file to formData
        formData.append("values", JSON.stringify(values)); // Append all data except file upload to formData
        dispatch(updateUserProfile(user.user_id, formData))
    };

    // All displayed fields form //
    const formFields = [
        {
            size: 3,
            field: (
                <Typography className={"typography"} style={{ marginTop: "18px" }}>
                    Mettre à jour votre photo de profil : <span className="red-star">*</span>
                </Typography>
            ),
        },
        {
            size: 9,
            display: true,
            field: (
                <Field name="user_avatar">
                    {props => (
                        <div>
                            <TextField
                                name="user_avatar"
                                margin="none"
                                type="file"
                                onChange={onFileChange}
                                value={File.filename}
                            />
                        </div>
                    )}
                </Field>
            ),
        },
        {
            size: 3,
            field: (
                <Typography className={"typography"} style={{ marginTop: "18px" }}>
                    Mot de passe :
                </Typography>
            ),
        },
        {
            size: 9,
            field: (
                <Field name="user_password">
                    {props => (
                        <div>
                            <TextField
                                type="password"
                                label="Tapez votre nouveau mot de passe"
                                name="user_password"
                                margin="none"
                            />
                        </div>
                    )}
                </Field>
            ),
        },
        {
            size: 3,
            field: (
                <Typography className={"typography"} style={{ marginTop: "18px" }}>
                    Mot de passe vérification :
                </Typography>
            ),
        },
        {
            size: 9,
            field: (
                <Field name="user_password_confirmation">
                    {props => (
                        <div>
                            <TextField
                                type="password"
                                label="Tapez à nouveau votre nouveau mot de passe"
                                name="user_password_confirmation"
                                margin="none"
                            />
                        </div>
                    )}
                </Field>
            ),
        },
    ];
    if (!isLoading) {
        return (
            <div style={{ padding: 16, margin: 'auto', maxWidth: 1225 }}>
                {/* Page Header */}
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Initiation d'action" subtitle="Link-D / Actions" />
                </Row>
                <Form
                    onSubmit={onSubmit}
                    validate={validate}
                    render={({ handleSubmit, form }) => (
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <Paper style={{ padding: 16 }}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" component="p">
                                        Modifier le profil
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
                                            onClick={form.reset}
                                        >
                                            Reinitialiser
                                        </Button>
                                    </Grid>
                                    <Grid item style={{ marginTop: 16 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                        >
                                            Enregistrer
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
    return (
        <CircularProgress color="primary" /> // Loading Spinner
    )
}

export default EditUserProfile;