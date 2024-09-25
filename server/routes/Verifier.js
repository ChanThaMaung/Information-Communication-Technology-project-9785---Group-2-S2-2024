const express = require('express');

function createRouter(pool) {
  const router = express.Router();


  router.get('/getRows/:address', async (req, res) => {
    const { address } = req.params;
    try {
      const [rows] = await pool.query('SELECT * FROM verifier WHERE verifier_address = ?', [address]);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching verifier:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // GET - Fetch the number of verified issuer transactions
  router.get('/getTransactionCount/:address/:type', async (req, res) => {
    const { address, type } = req.params;
    try {
      const [rows] = await pool.query('SELECT COUNT(*) AS transaction_count FROM verifier WHERE verifier_address = ? AND type = ?', [address, type]);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching verifier:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // GET - Fetch rows verified by an address
  router.get('/getByAddress/:address', async (req, res) => {
    const { address } = req.params;
    try {
      const [rows] = await pool.query('SELECT * FROM verifier WHERE verifier_address = ?', [address]);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching verifier:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // GET - Fetch the number of all verifier transactions
  router.get('/count', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT COUNT(*) AS transaction_count FROM verifier');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching verifier count:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // GET - Fetch the number of unique verifier addresses
  router.get('/addresses', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT COUNT(DISTINCT verifier_address) AS address_count FROM verifier');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching unique verifier addresses:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });
  
  // GET - Fetch all verifiers
  router.get('/all', async (req, res) => {


    try {
      const [rows] = await pool.query('SELECT * FROM verifier');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching verifiers:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  router.get('/:txHash', async (req, res) => {
    const { txHash } = req.params;
    try {
      const [rows] = await pool.query('SELECT * FROM verifier WHERE transaction_hash = ?', [txHash]);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching verifier:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // POST - Create a new verifier
  router.post('/create', async (req, res) => {
    const { verifierAddress, type, project_name, verification_date, transaction_updated, transaction_hash } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO verifier (verifier_address, type, project_name, verification_date, transaction_updated, transaction_hash) VALUES (?, ?,  ?, ?, ?, ?)',
        [verifierAddress, type, project_name, verification_date, transaction_updated, transaction_hash]
      );
      res.status(201).json({ verifierAddress, type, project_name, verification_date, transaction_updated, transaction_hash });
    } catch (error) {
      console.error('Error creating verifier:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // DELETE - Remove a verifier
  router.delete('/delete/:txHash', async (req, res) => {
    const { txHash } = req.params;
    try {
      await pool.query('DELETE FROM verifier WHERE transaction_hash = ?', [txHash]);
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting verifier:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  return router;
}

module.exports = createRouter;