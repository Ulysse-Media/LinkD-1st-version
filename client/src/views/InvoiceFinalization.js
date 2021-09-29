import React, { useEffect, useState } from "react";
import {
    TextField,
    Select,
} from 'mui-rff';
import {
    Typography,
    Paper,
    Grid,
    Button,
    MenuItem,
} from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { Form, Field } from 'react-final-form';
import { Row } from "shards-react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addInvoice } from "../actions/invoices-actions/actions";
import { finishActionById } from "../actions/actions-initiation-actions/actions";
import PageTitle from "../components/common/PageTitle";

const InvoiceFinalization = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [LocaleCurrency] = useState("TND");
    const [Currency, setCurrency] = useState("");
    const [LocalePrice, setLocalePrice] = useState(0);
    const [Price, setPrice] = useState(0);
    const [Percentage, setPercentage] = useState({});
    // Action state from redux store
    const action = useSelector(
        (state) => state.actionsReducer.action
    );
    // Products from action selector
    let products = action.product.split(",");
    // Submit Form Group inputs
    const onSubmit = async (values) => {
        values.invoice_product = Percentage;
        values.invoice_local_price = Number(LocalePrice);
        values.invoice_price = Number(Price);
        values.action_id = action.action_id;
        dispatch(finishActionById(action.action_id));
        dispatch(addInvoice(values));
    };
    const handleLocalePrice = (event) => {
        setLocalePrice(event.target.value);
    }
    const handlePercentage = (e, i) => {
        const initialData = {
            id: Number(i),
            product: products[i],
            name: `percentage_${i}`,
            percentage: e.target.value.split("%")[0],
            value: ((e.target.value.split("%")[0] * Number(LocalePrice)) / 100).toFixed(3),
        };
        updatePercentageInputs(initialData);
    }
    const handleCurrency = (event) => {
        setCurrency(event.target.value);
        if (event.target.value === "EUR") {
            setPrice(LocalePrice * 3);
        } else if (event.target.value === "MAD") {
            setPrice(LocalePrice * 0.31);
        }
    }
    const handleBack = () => {
        history.goBack();
    }
    useEffect(() => {
        let defaultPercentage = 0;
        if (products && products.length > 0) {
            if (products.length % 2 === 0) {
                defaultPercentage = Math.round(100 / products.length);
            } else {
                defaultPercentage = (100 / products.length).toFixed(3);
            }
            let data = {};
            products.map((product, i) => {
                const percentagedata = {
                    id: i,
                    name: `percentage_${i}`,
                    percentage: defaultPercentage,
                }
                return data = { ...data, [i]: percentagedata };
            })
            setPercentage(data);
        }

    }, [])
    const updatePercentageInputs = (newPercentageData) => {
        let NewData = {};
        if (newPercentageData.percentage.length === 0) {
            Object.keys(Percentage).map((key, i) => {
                let emptyData = Percentage[key];
                emptyData.percentage = '';
                return NewData[key] = emptyData;
            })
            setPercentage(NewData);
        } else {
            Object.keys(Percentage).map((key, i) => {
                let data = Percentage[key];
                data.percentage = (100 - newPercentageData.percentage) / (products.length-1);
                return NewData[key] = data;
            })
            NewData[newPercentageData.id] = newPercentageData;
            setPercentage(NewData);
        }
    }
    // All displayed fields form //
    const formFields = [
        {
            size: 3,
            field: (
                <Typography className={"typography"} style={{ marginTop: "18px" }}>
                    Coùt local :
                </Typography>
            ),
        },
        {
            size: 6,
            field: (
                <Field name="invoice_local_price">
                    {props => (
                        <div>
                            <TextField
                                type="number"
                                name="invoice_local_price"
                                label="Tapez le cout local"
                                value={LocalePrice}
                                margin="none"
                                onChange={handleLocalePrice}
                            />
                        </div>
                    )}
                </Field>
            ),
        },
        {
            size: 3,
            field: (
                <Field name="local_currency" >
                    {props => (
                        <div>
                            <Select
                                name="local_currency"
                                label="Devise par defaut"
                                formControlProps={{ margin: 'none' }}
                                type="select"
                                style={{ textAlign: 'center' }}
                                value={LocaleCurrency}
                            >
                                <MenuItem value="TND">TND</MenuItem>
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
                    Coùt :
                </Typography>
            ),
        },
        {
            size: 6,
            field: (
                <Field name="invoice_price">
                    {props => (
                        <div>
                            <TextField
                                type="number"
                                name="invoice_price"
                                label="Coùt convertie"
                                margin="none"
                                value={Currency === "EUR" ? LocalePrice * 3 : Currency === "MAD" ? LocalePrice * 0.31 : 0}
                            />
                        </div>
                    )}
                </Field>
            ),
        },
        {
            size: 3,
            field: (
                <Field name="currency" >
                    {props => (
                        <div>
                            <Select
                                name="currency"
                                label="Devise à convertir"
                                formControlProps={{ margin: 'none' }}
                                style={{ textAlign: 'center' }}
                                type="select"
                                onChange={handleCurrency}
                                value={Currency}
                            >
                                <MenuItem value="EUR">EUR</MenuItem>
                                <MenuItem value="MAD">MAD</MenuItem>
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
                    {products.map((element, key) => (
                        <Typography className={"typography"} style={{ marginTop: "18px" }}>
                            {element}
                        </Typography>
                    ))}
                </Typography>
            ),
        },
        {
            size: 6,
            field: (
                <Field name="percentage_product">
                    {props => (
                        Object.keys(Percentage).map((key, index) =>
                            <NumberFormat
                                key={index}
                                label="Tapez en pourcent le produit selectionné"
                                name={`percentage_${key}`}
                                margin="none"
                                customInput={TextField}
                                suffix={'%'}
                                type="text"
                                onChange={(e) => handlePercentage(e, key)}
                                value={Percentage[key].percentage}
                            />)
                    )}
                </Field>
            ),
        },
        {
            size: 3,
            field: (
                <Field name="invoice_product">
                    {props => (
                        Object.keys(Percentage).map((key, index) =>
                            <TextField
                                key={index}
                                name={`value_product_${key}`}
                                label="Valeur correspondante en TND"
                                margin="none"
                                type="number"
                                value={`${Percentage[key].percentage * LocalePrice / 100}`}
                            />
                        )
                    )}
                </Field>
            ),
        },
        {
            size: 3,
            field: (
                <Typography className={"typography"} style={{ marginTop: "18px" }}>
                    Logistique :
                </Typography>
            ),
        },
        {
            size: 9,
            field: (
                <Field name="invoice_logistic">
                    {props => (
                        <div>
                            <TextField
                                type="text"
                                name="invoice_logistic"
                                label="Tapez la technique de la logistique"
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
                    Hébergement :
                </Typography>
            ),
        },
        {
            size: 9,
            field: (
                <Field name="invoice_accommodation">
                    {props => (
                        <div>
                            <TextField
                                type="text"
                                name="invoice_accommodation"
                                label="Hébergement"
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
                    Transfert :
                </Typography>
            ),
        },
        {
            size: 9,
            field: (
                <Field name="invoice_transfer">
                    {props => (
                        <div>
                            <TextField
                                type="text"
                                name="invoice_transfer"
                                label="Transfert"
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
                    Honoraire orateur :
                </Typography>
            ),
        },
        {
            size: 9,
            field: (
                <Field name="invoice_honorary_speaker">
                    {props => (
                        <div>
                            <TextField
                                type="text"
                                label="Honoraire orateur"
                                name="invoice_honorary_speaker"
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
                    Extras :
                </Typography>
            ),
        },
        {
            size: 9,
            field: (
                <Field name="invoice_extras">
                    {props => (
                        <div>
                            <TextField
                                type="text"
                                name="invoice_extras"
                                label="Tapez les extras coùts"
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
                    Commentaires (optionnel):
                </Typography>
            ),
        },
        {
            size: 9,
            field: (
                <Field name="invoice_comments">
                    {props => (
                        <div>
                            <TextField
                                type="text"
                                name="invoice_comments"
                                label="Tapez vos commentaires ici"
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
            <Row noGutters className="page-header py-4">
                <PageTitle sm="4" title="Initiation d'action" subtitle="Link-D / Actions" />
            </Row>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form }) => (
                    <form onSubmit={handleSubmit}>
                        <Paper style={{ padding: 16 }}>
                            <Grid item xs={12}>
                                <Typography variant="h5" component="p">
                                    Validation d'action
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
                                        Finalizer
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

export default InvoiceFinalization;
