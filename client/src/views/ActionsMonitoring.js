import React, { useEffect } from "react";
import { Container, Row } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import { getActionByUserId, getVMActionsByUserId, getVMValidatedActionsByUserId, getSpeakerActions } from "../actions/actions-initiation-actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableCell: {
        textAlign: 'center',
    }
});

const ActionsMonitoring = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    // User state from redux store
    const user = useSelector(
        (state) => state.authReducer.user[0]
    );
    // Actions state from redux store
    const actionsUser = useSelector(
        (state) => state.actionsReducer.actionsUser
    );
    // Actions state from redux store
    const VMActions = useSelector(
        (state) => state.actionsReducer.VMActions
    );
    // Actions state from redux store
    const VMValidatedActions = useSelector(
        (state) => state.actionsReducer.VMValidatedActions
    );
    // Speaker Actions state from redux store
    const speakerActions = useSelector(
        (state) => state.actionsReducer.speakerActions
    );
    // Loading state from redux store
    const isLoading = useSelector(
        (state) => state.actionsReducer.loading
    );
    // Handle click function
    const handleClick = (e) => {
        return history.push(`display-action/${e.target.id}`); // Redirect user after submition of form
    }
    // Component on mount
    useEffect(() => {
        let isCancelled = false;
        if (!isCancelled) {
            if (user.user_position === "DSM") {
                dispatch(getVMActionsByUserId(user.user_id));
            } else if (user.user_position === "CDP") {
                dispatch(getVMValidatedActionsByUserId(user.user_id));
                dispatch(getSpeakerActions());
            } else if (user.user_position === "MED") {
                dispatch(getSpeakerActions());
            }
            else {
                dispatch(getActionByUserId(user.user_id));
            }
        }
        return () => (isCancelled = true);
    }, [dispatch, user.user_id, user.user_position]);
    if (!isLoading) {
        return (
            <div style={{ padding: 16, margin: 'auto', maxWidth: 1225, height: '100%' }}>
                <Container fluid className="main-content-container px-4">
                    {/* Page Header */}
                    <Row noGutters className="page-header py-4">
                        <PageTitle sm="4" title="Suivi d'action" subtitle="Link-D / Actions" />
                    </Row>
                    <Row style={{ height: 500, width: '100%' }}>
                        <Grid item xs={12}>
                            <Typography variant="h5" component="p">
                                Tableau de suivi des demandes d'actions :
                            </Typography>
                        </Grid>
                        {user.user_position === "VM" && (
                            <TableContainer component={Paper} style={{ height: '450px', overflow: "scroll" }}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Type d'action</TableCell>
                                            <TableCell>Thématique</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Lieu</TableCell>
                                            <TableCell>Nb d'invités</TableCell>
                                            <TableCell>Récapitulatif</TableCell>
                                            <TableCell>Statut</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {actionsUser.filter((element, key) => element.status !== "Terminée et archivée" && element.status !== "Terminée et non archivée" && element.status !== "Finalisée").map((row) => (
                                            <TableRow key={row.action_id}>
                                                <TableCell>{row.action_type}</TableCell>
                                                <TableCell>{row.meeting_theme}</TableCell>
                                                <TableCell>{(new Date(row.start_action)).toLocaleDateString()}</TableCell>
                                                <TableCell>{row.action_location}</TableCell>
                                                <TableCell className={classes.tableCell}>{row.pax_number}</TableCell>
                                                <TableCell className={classes.tableCell}><button className="overview-action" id={row.action_id} onClick={handleClick}>Voir</button></TableCell>
                                                <TableCell className={"status" + (row.status === 'Validé' ? 'validated' : row.status === "Refusé" ? 'denied' : row.status === "Terminée et non archivée" ? 'finished' : row.status === "Terminée et archivée" ? 'archieved' : 'pending')}>{row.status}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                        {user.user_position === "DSM" && (
                            <TableContainer component={Paper} style={{ height: '450px', overflow: "scroll" }}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Initiateur d'action</TableCell>
                                            <TableCell>Type d'action</TableCell>
                                            <TableCell>Thématique</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Lieu</TableCell>
                                            <TableCell>Nb d'invités</TableCell>
                                            <TableCell>Récapitulatif</TableCell>
                                            <TableCell>Statut</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {VMActions.filter((element, key) => element.status !== "Terminée et archivée" && element.status !== "Terminée et non archivée" && element.status !== "Finalisée").map((row) => (
                                            <TableRow key={row.action_id}>
                                                <TableCell>{row.user_email.split("@").shift()}</TableCell>
                                                <TableCell>{row.action_type}</TableCell>
                                                <TableCell>{row.meeting_theme}</TableCell>
                                                <TableCell>{(new Date(row.start_action)).toLocaleDateString()}</TableCell>
                                                <TableCell>{row.action_location}</TableCell>
                                                <TableCell className={classes.tableCell}>{row.pax_number}</TableCell>
                                                <TableCell className={classes.tableCell}><button className="overview-action" id={row.action_id} onClick={handleClick}>Voir</button></TableCell>
                                                <TableCell className={"status" + (row.status === 'Validé' ? 'validated' : row.status === "Refusé" ? 'denied' : row.status === "Terminée et non archivée" ? 'finished' : row.status === "Terminée et archivée" ? 'archieved' : 'pending')}>{row.status}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                        {user.user_position === "CDP" && (
                            <TableContainer component={Paper} style={{ height: '450px', overflow: "scroll" }}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Initiateur d'action</TableCell>
                                            <TableCell>Type d'action</TableCell>
                                            <TableCell>Thématique</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Lieu</TableCell>
                                            <TableCell>Nb d'invités</TableCell>
                                            <TableCell>Récapitulatif</TableCell>
                                            <TableCell>Statut</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {VMValidatedActions.filter((element, key) => element.status !== "Terminée et archivée" && element.status !== "Terminée et non archivée" && element.status !== "Finalisée").map((row) => (
                                            <TableRow key={row.action_id}>
                                                <TableCell>{row.user_email.split("@").shift()}</TableCell>
                                                <TableCell>{row.action_type}</TableCell>
                                                <TableCell>{row.meeting_theme}</TableCell>
                                                <TableCell>{(new Date(row.start_action)).toLocaleDateString()}</TableCell>
                                                <TableCell>{row.action_location}</TableCell>
                                                <TableCell className={classes.tableCell}>{row.pax_number}</TableCell>
                                                <TableCell className={classes.tableCell}><button className="overview-action" id={row.action_id} onClick={handleClick}>Voir</button></TableCell>
                                                <TableCell className={"status" + (row.status === 'Validé' ? 'validated' : row.status === "Refusé" ? 'denied' : row.status === "Terminée et non archivée" ? 'finished' : row.status === "Terminée et archivée" ? 'archieved' : 'pending')}>{row.status}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                        {user.user_position === "MED" && (
                            <TableContainer component={Paper} style={{ height: '450px', overflow: "scroll" }}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Initiateur d'action</TableCell>
                                            <TableCell>Type d'action</TableCell>
                                            <TableCell>Thématique</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Lieu</TableCell>
                                            <TableCell>Nb d'invités</TableCell>
                                            <TableCell>Récapitulatif</TableCell>
                                            <TableCell>Statut</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {speakerActions.filter((element, key) => element.status === "En attente de validation CDP et MED" || element.status === "En attente de validation MED" || element.status === "Finalisée" || element.status === "Validé").map((row) => (
                                            <TableRow key={row.action_id}>
                                                <TableCell>{row.user_email.split("@").shift()}</TableCell>
                                                <TableCell>{row.action_type}</TableCell>
                                                <TableCell>{row.meeting_theme}</TableCell>
                                                <TableCell>{(new Date(row.start_action)).toLocaleDateString()}</TableCell>
                                                <TableCell>{row.action_location}</TableCell>
                                                <TableCell className={classes.tableCell}>{row.pax_number}</TableCell>
                                                <TableCell className={classes.tableCell}><button className="overview-action" id={row.action_id} onClick={handleClick}>Voir</button></TableCell>
                                                <TableCell className={"status" + (row.status === 'Validé' ? 'validated' : row.status === "Refusé" ? 'denied' : row.status === "Terminée et non archivée" ? 'finished' : row.status === "Terminée et archivée" ? 'archieved' : 'pending')}>{row.status}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Row>
                </Container>
            </div>
        );
    } else {
        return (
            <CircularProgress color="primary" className="spinner" /> // Loading Spinner
        )
    }
}

export default ActionsMonitoring;
