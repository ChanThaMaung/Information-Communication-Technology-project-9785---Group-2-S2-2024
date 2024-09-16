const express = require('express');

function createRouter(pool) {
  const router = express.Router();

  // GET - Fetch all issuers
  router.get('/all', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM issuer');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching issuers:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  router.get('/:txHash', async (req, res) => {
    const { txHash } = req.params;
    try {
      const [rows] = await pool.query('SELECT * FROM issuer WHERE transaction_hash = ?', [txHash]);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching issuer:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // POST - Create a new issuer
  router.post('/create', async (req, res) => {
    const { issuerAddress, credit_amount, active_status, date_issued, end_date, verification_status, transaction_hash } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO issuer (issuer_address, credit_amount, active_status, date_issued, end_date, verification_status, transaction_hash) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [issuerAddress, credit_amount, active_status, date_issued, end_date, verification_status, transaction_hash]
      );
      res.status(201).json({ id: result.insertId, issuerAddress, credit_amount, active_status, date_issued, end_date, verification_status, transaction_hash });
    } catch (error) {
      console.error('Error creating issuer:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // PUT - Update an issuer
  router.put('/update/:txHash', async (req, res) => {
    const { txHash } = req.params;
    const { issuerAddress, credit_amount, active_status, date_issued, end_date, verification_status } = req.body;
    try {
      await pool.query(
        'UPDATE issuer SET issuer_address = ?, credit_amount = ?, active_status = ?, date_issued = ?, end_date = ?, verification_status = ? WHERE transaction_hash = ?',
        [issuerAddress, credit_amount, active_status, date_issued, end_date, verification_status, txHash]
      );
      res.json({ issuerAddress, credit_amount, active_status, date_issued, end_date, verification_status, txHash });
    } catch (error) {
      console.error('Error updating issuer:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // DELETE - Remove an issuer
  router.delete('/delete/:txHash  ', async (req, res) => {
    const { txHash } = req.params;
    try {
      await pool.query('DELETE FROM issuer WHERE transaction_hash = ?', [txHash]);
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting issuer:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  return router;
}

module.exports = createRouter;