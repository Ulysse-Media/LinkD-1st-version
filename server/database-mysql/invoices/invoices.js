const { connection } = require("../config/connect")
const { sql } = require("../config/db")

// Database function to insert new doctor  //
const addInvoice = async (req) => {
  let invoice_product = JSON.stringify(req.invoice_product)
  var query = `INSERT INTO invoices (action_id, invoice_local_price, invoice_price, invoice_product, invoice_logistic, invoice_accommodation, invoice_transfer, invoice_honorary_speaker, invoice_extras, invoice_comments) values (${req.action_id}, '${req.invoice_local_price}', '${req.invoice_price}', '${invoice_product}', '${req.invoice_logistic}', '${req.invoice_accommodation}', '${req.invoice_transfer}', '${req.invoice_honorary_speaker}', '${req.invoice_extras}', '${req.invoice_comments}')`;
  try {
    let invoice = await sql(query);
    return invoice;
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  addInvoice,
}