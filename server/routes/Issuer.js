const express = require('express');

function createRouter(pool) {
  const router = express.Router();

  // GET - Fetch the number of all issuer transactions
  router.get('/count', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT COUNT(*) AS transaction_count FROM issuer');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching issuer count:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // GET - Fetch the number of unique issuer addresses
  router.get('/addresses', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT COUNT(DISTINCT issuer_address) AS address_count FROM issuer');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching unique issuer addresses:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // GET - Fetch the total amount of verified credits issued
  router.get('/total', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT SUM(credit_amount) AS credit_count FROM issuer WHERE verification_status = "1"');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching total verified credits:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });
  
  // GET - Fetch all issuers with optional filtering
  router.get('/all', async (req, res) => {
    const { project_name, date_issued, period_covered, verification_status, active_status } = req.query;
    let query = 'SELECT * FROM issuer WHERE 1=1';
    const params = [];

    if (project_name) {
        query += ' AND project_name LIKE ?';
        params.push(`%${project_name}%`);
    }
    if (date_issued) {
        query += ' AND date_issued = ?';
        params.push(date_issued);
    }
    if (period_covered) {
        query += ' AND period_covered LIKE ?';
        params.push(`%${period_covered}%`);
    }
    if (verification_status) {
        query += ' AND verification_status = ?';
        params.push(verification_status);
    }
    if (active_status) {
        query += ' AND active_status = ?';
        params.push(active_status);
    }

    try {
        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching issuers:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // GET only verified ones

  router.get('/unverified', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM issuer WHERE verification_status = "0"');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching verified issuers:', error);
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
    const { issuer_address, project_name, credit_amount, active_status, date_issued, period_covered, verification_status, prev_tx, transaction_hash } = req.body;
    try {
      await pool.query(
        'INSERT INTO issuer (issuer_address, project_name, credit_amount, active_status, date_issued, period_covered, verification_status, prev_tx, transaction_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [issuer_address, project_name, credit_amount, active_status, date_issued, period_covered, verification_status, prev_tx, transaction_hash]
      );
      res.status(201).json({ issuer_address, project_name, credit_amount, active_status, date_issued, period_covered, verification_status, prev_tx, transaction_hash });
    } catch (error) {
      console.error('Error creating issuer:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // PUT - Update an issuer
  router.put('/update/:txHash', async (req, res) => {
    const { txHash } = req.params;
    const { project_name, credit_amount, active_status, date_issued, period_covered, verification_status, transaction_hash, prev_tx } = req.body;
    try {
      await pool.query(
        'UPDATE issuer SET project_name = ?, credit_amount = ?, active_status = ?, date_issued = ?, period_covered = ?, verification_status = ?, prev_tx = ?, transaction_hash = ? WHERE transaction_hash = ?',
        [project_name, credit_amount, active_status, date_issued, period_covered, verification_status, prev_tx, transaction_hash, txHash]
      );
      res.json({ project_name, credit_amount, active_status, date_issued, period_covered, verification_status, prev_tx, transaction_hash });
    } catch (error) {
      console.error('Error updating issuer:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // DELETE - Remove an issuer
  // router.delete('/delete/:txHash  ', async (req, res) => {
  //   const { txHash } = req.params;
  //   try {
  //     await pool.query('DELETE FROM issuer WHERE transaction_hash = ?', [txHash]);
  //     res.status(204).end();
  //   } catch (error) {
  //     console.error('Error deleting issuer:', error);
  //     res.status(500).json({ error: 'Internal server error', details: error.message });
  //   }
  // });

  return router;
}

module.exports = createRouter;