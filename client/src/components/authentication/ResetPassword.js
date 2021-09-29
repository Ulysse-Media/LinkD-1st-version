import React from 'react';
import { Form, Field } from 'react-final-form';
import {
    TextField,
} from 'mui-rff';
import {
    Typography,
    Paper,
    Grid,
    Button,
    Avatar,
    CssBaseline,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";
import { resetPasswordUser } from "../../actions/auth-actions/actions";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/1600x900/?medecines)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const resetPasswordToken = window.location.pathname.split("/")[2];
const ResetPassword = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    // Validator for required fields //
    const validate = values => {
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\^&\*])(?=.{8,})");
        // const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        const errors = {};
        if (!values.user_password) {
            errors.user_password = 'Champ requis';
        } else {
            if (!strongRegex.test(values.user_password)) {
                errors.user_password = 'Votre mot de passe doit depasser 8 charactéres, au minimum une lettre majiscule, un chiffre et un symbole';
            }
        }
        return errors;
    };
    // Submit Form Group
    const onSubmit = async (values) => {
        var formData = new FormData(); // Create an instance from formData
        formData.append('values', JSON.stringify(values))
        dispatch(resetPasswordUser(values, resetPasswordToken));
    };
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Connexion
                    </Typography>
                    <Form
                        onSubmit={onSubmit}
                        validate={validate}
                        render={({ handleSubmit, form }) => (
                            <form onSubmit={handleSubmit}>
                                <Paper style={{ padding: 16 }}>
                                    <Grid container alignItems="flex-start" spacing={2}>
                                        <Grid item xs={9}>
                                            <Field name="user_password">
                                                {props => (
                                                    <div>
                                                        <TextField
                                                            label="Tapez votre nouveau mot de passe svp!"
                                                            name="user_password"
                                                            margin="none"
                                                            type="password"
                                                        />
                                                    </div>
                                                )}
                                            </Field>
                                        </Grid>
                                        <Grid item style={{ marginTop: 16 }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                            >
                                                Suivant
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </form>
                        )}
                    />
                </div>
            </Grid>
        </Grid>
    );
}

export default ResetPassword