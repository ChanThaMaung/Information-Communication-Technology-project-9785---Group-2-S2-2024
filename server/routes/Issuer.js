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

  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query('SELECT * FROM issuer WHERE id = ?', [id]);
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
        'INSERT INTO issuers (issuerAddress, credit_amount, active_status, date_issued, end_date, verification_status, transaction_hash) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [issuerAddress, credit_amount, active_status, date_issued, end_date, verification_status, transaction_hash]
      );
      res.status(201).json({ id: result.insertId, issuerAddress, credit_amount, active_status, date_issued, end_date, verification_status, transaction_hash });
    } catch (error) {
      console.error('Error creating issuer:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // PUT - Update an issuer
  router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { issuerAddress, credit_amount, active_status, date_issued, end_date, verification_status, transaction_hash } = req.body;
    try {
      await pool.query(
        'UPDATE issuers SET issuerAddress = ?, credit_amount = ?, active_status = ?, date_issued = ?, end_date = ?, verification_status = ?, transaction_hash = ? WHERE id = ?',
        [issuerAddress, credit_amount, active_status, date_issued, end_date, verification_status, transaction_hash, id]
      );
      res.json({ id, issuerAddress, credit_amount, active_status, date_issued, end_date, verification_status, transaction_hash });
    } catch (error) {
      console.error('Error updating issuer:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // DELETE - Remove an issuer
  // router.delete('/delete/:id', async (req, res) => {
  //   const { id } = req.params;
  //   try {
  //     await pool.query('DELETE FROM issuers WHERE id = ?', [id]);
  //     res.status(204).end();
  //   } catch (error) {
  //     console.error('Error deleting issuer:', error);
  //     res.status(500).json({ error: 'Internal server error', details: error.message });
  //   }
  // });

  return router;
}

module.exports = createRouter;