import { db } from "../database/database.connection.js";

export async function getRentals(req, res) {
  try {
    const rental = await db.query(`SELECT rentals.*, customers.id, customers.name, games.id, games.name
    FROM rentals
    JOIN games
      ON rentals."gameId" = games.id
    JOIN customers
      ON rentals."customerId" = customers.id
    `)
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}

// export async function getCustomers(req, res) {
//   try {
//     const customers = await db.query("SELECT * FROM customers");
//     const results = customers.rows;
//     return res.status(200).send(results);
//   } catch (error) {
//     console.log(error);
//     return res.sendStatus(500);
//   }
// }

// export async function getCustomerById(req, res) {
//   try {
//     const { id } = req.params;
//     const existsCustomer = await db.query("SELECT * FROM customers WHERE id=$1", [id]);
//     if (existsCustomer.rowCount === 0) return res.sendStatus(404);
//     const results = existsCustomer.rows;
//     return res.status(200).send(results);
//   } catch (error) {
//     console.log(error);
//     return res.sendStatus(500);
//   }
// }

// export async function updateCustomer(req, res) {
//   try {
//     const { id } = req.params;
//     const { name, phone, cpf, birthday } = req.body;

//     const existsCustomer = await db.query("SELECT * FROM customers WHERE id=$1", [id]);
//     if (existsCustomer.rowCount === 0) return res.sendStatus(404);

//     const existsCustomerCPF = await db.query("SELECT * FROM customers WHERE id!=$1 AND cpf=$2", [
//       id,
//       cpf,
//     ]);
//     if (existsCustomerCPF.rowCount !== 0) return res.sendStatus(409);

//     await db.query(`UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;`, [
//       name,
//       phone,
//       cpf,
//       birthday,
//       id,
//     ]);
//     return res.sendStatus(200);
//   } catch (error) {
//     console.log(error);
//     return res.sendStatus(500);
//   }
// }
