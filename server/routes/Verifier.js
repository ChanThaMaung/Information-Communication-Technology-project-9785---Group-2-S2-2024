const express = require("express");

function createRouter(pool) {
  const router = express.Router();

  router.get("/getTotalCreditsByAddress/:address", async (req, res) => {
    const { address } = req.params;
    try {
      const [rows] = await pool.query(
        "SELECT SUM(issuer.credit_amount) AS total_credits FROM verifier INNER JOIN issuer ON verifier.project_name = issuer.project_name WHERE verifier.verifier_address = ?",
        [address]
      );
      res.json(rows);
    } catch (error) {
      console.error("Error fetching verifier:", error);
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  });

  // GET - Fetch the number of verified issuer transactions
  router.get("/getTransactionCount/:address/", async (req, res) => {
    const { address } = req.params;
    try {
      const [rows] = await pool.query(
        "SELECT COUNT(*) AS transaction_count FROM verifier WHERE verifier_address = ?",
        [address]
      );
      res.json(rows);
    } catch (error) {
      console.error("Error fetching verifier:", error);
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  });

  // GET - Fetch rows verified by an address
  router.get("/getByAddress/:address", async (req, res) => {
    const { address } = req.params;
    try {
      const [rows] = await pool.query(
        "SELECT * FROM verifier WHERE verifier_address = ? ORDER BY verification_date DESC",
        [address]
      );
      res.json(rows);
    } catch (error) {
      console.error("Error fetching verifier:", error);
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  });

  // GET - Fetch the number of all verifier transactions
  router.get("/count", async (req, res) => {
    try {
      const [rows] = await pool.query(
        "SELECT COUNT(*) AS transaction_count FROM verifier"
      );
      res.json(rows);
    } catch (error) {
      console.error("Error fetching verifier count:", error);
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  });

  // GET - Fetch the number of unique verifier addresses
  router.get("/addresses", async (req, res) => {
    try {
      const [rows] = await pool.query(
        "SELECT COUNT(DISTINCT verifier_address) AS address_count FROM verifier"
      );
      res.json(rows);
    } catch (error) {
      console.error("Error fetching unique verifier addresses:", error);
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  });

  // GET - Fetch all verifiers
  router.get("/all", async (req, res) => {
    const { verifier_address, project_name, verification_date } = req.query;
    console.log("Received filters:", {
      verifier_address,
      project_name,
      verification_date,
    });
    let query = "SELECT * FROM verifier WHERE 1=1";
    const params = [];

    if (verifier_address) {
      query += " AND verifier_address = ?";
      params.push(`${verifier_address}`);
    }
    if (project_name) {
      query += " AND project_name LIKE ?";
      params.push(`%${project_name}%`);
    }
    if (verification_date) {
      query += " AND DATE(verification_date) = ?";
      params.push(`${verification_date}`);
    }

    try {
      const [rows] = await pool.query(query, params);
      res.json(rows);
    } catch (error) {
      console.error("Error fetching verifiers:", error);
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  });

  router.get("/:txHash", async (req, res) => {
    const { txHash } = req.params;
    try {
      const [rows] = await pool.query(
        "SELECT * FROM verifier WHERE transaction_hash = ?",
        [txHash]
      );
      res.json(rows);
    } catch (error) {
      console.error("Error fetching verifier:", error);
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  });

  // POST - Create a new verifier
  router.post("/create", async (req, res) => {
    const {
      verifier_address,
      project_name,
      transaction_updated,
      transaction_hash,
    } = req.body;
    try {
      const currDate = new Date()
        .toLocaleString("en-AU", {
          timeZone: "Australia/Sydney",
          hour12: false,
        })
        .replace(
          /(\d+)\/(\d+)\/(\d+),?\s*(\d+):(\d+):(\d+)/,
          "$3-$2-$1 $4:$5:$6"
        );
      await pool.query(
        "INSERT INTO verifier (verifier_address, project_name, verification_date, transaction_updated, transaction_hash) VALUES ( ?, ?, ?, ?, ?)",
        [
          verifier_address,
          project_name,
          currDate,
          transaction_updated,
          transaction_hash,
        ]
      );
      res.status(201).json({
        message: "Verifier created successfully ",
        data: {
          verifier_address,
          project_name,
          currDate,
          transaction_updated,
          transaction_hash,
        },
      });
    } catch (error) {
      console.error("Error creating verifier:", error);
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  });

  return router;
}

module.exports = createRouter;
