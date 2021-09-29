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
    Link,
    Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";
import { signupUser } from "../../actions/auth-actions/actions";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Sanofi
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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

const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    // Validator for required fields //
    const validate = values => {
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\^&\*])(?=.{8,})");
        // const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        const errors = {};
        if (!values.user_email) {
            errors.user_email = 'Champ requis';
        }
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
        dispatch(signupUser(values));
    };

    // All displayed fields form //
    const formFields = [
        {
            size: 3,
            field: (
                <Typography className={"typography"} style={{ marginTop: "18px" }}>
                    Email : <span className="red-star">*</span>
                </Typography>
            ),
        },
        {
            size: 9,
            field: (
                <Field name="user_email">
                    {props => (
                        <div>
                            <TextField
                                label="Tapez votre adresse email svp!"
                                name="user_email"
                                margin="none"
                                type="email"
                            />
                        </div>
                    )}
                </Field>
            ),
        },
        {
            size: 3,
            field: (
                <Typography className={"typography"} >
                    Mot de passe : <span className="red-star">*</span>
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
                                label="Tapez votre mot de passe svp!"
                                name="user_password"
                                margin="none"
                                type="password"
                            />
                        </div>
                    )}
                </Field>
            ),
        },
    ];
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
                        S'inscrire
                    </Typography>
                    <Form
                        onSubmit={onSubmit}
                        validate={validate}
                        render={({ handleSubmit, form }) => (
                            <form onSubmit={handleSubmit}>
                                <Paper style={{ padding: 16 }}>
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
                                                Créer un compte
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                                <Grid container>
                                    <Grid item>
                                        <Link href="/login" variant="body2">
                                            {"Connectez vous?"}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Box mt={30}>
                                </Box>
                            </form>
                        )}
                    />
                </div>
                <Copyright />
            </Grid>
        </Grid>
    );
}

export default Login