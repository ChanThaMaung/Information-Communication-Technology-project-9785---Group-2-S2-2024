const express = require('express');

function createRouter(pool) {
  const router = express.Router();

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

  router.get('/all', async (req, res) => {
    const { project_name, verification_date } = req.query;
    console.log("Received filters:", { project_name, verification_date });
    let query = 'SELECT * FROM verifier WHERE 1=1';
    const params = [];

    if (project_name) {
      query += ' AND project_name LIKE ?';
      params.push(`%${project_name}%`);
    }
    if (verification_date) {
      query += ' AND verification_date LIKE ?';
      params.push(`%${verification_date}%`);
    }

    try {
      const [rows] = await pool.query(query, params);
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
    const { verifierAddress, project_name, verification_date, transaction_updated, transaction_hash } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO verifier (verifier_address, project_name, verification_date, transaction_updated, transaction_hash) VALUES (?, ?, ?, ?, ?)',
        [verifierAddress, project_name, verification_date, transaction_updated, transaction_hash]
      );
      res.status(201).json({ verifierAddress, project_name, verification_date, transaction_updated, transaction_hash });
    } catch (error) {
      console.error('Error creating verifier:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // PUT - Update a verifier
  router.put('/update/:txHash', async (req, res) => {
    const { txHash } = req.params;
    const { verifierAddress, transaction_updated } = req.body;
    try {
      await pool.query(
        'UPDATE verifier SET verifier_address = ?, transaction_updated = ? WHERE transaction_hash = ?',
        [verifierAddress, transaction_updated, txHash]
      );
      res.json({ txHash, verifierAddress, transaction_updated });
    } catch (error) {
      console.error('Error updating verifier:', error);
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