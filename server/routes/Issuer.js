const express = require('express');

function createRouter(pool) {
  const router = express.Router();


  router.get('/getYearlyAverage/:address', async (req, res) => {
    const { address } = req.params;
    try {
      const [rows] = await pool.query('SELECT AVG(credit_amount) AS yearly_average FROM issuer WHERE issuer_address = ?', [address]);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching yearly average:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });
  
  router.get('/getVerifiedCredits/:address', async (req, res) => {
    const { address } = req.params;
    try {
      const [rows] = await pool.query('SELECT SUM(credit_amount) AS credits_issued FROM issuer WHERE issuer_address = ? AND verification_status = "1"', [address]);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching issuer:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  })

  router.get('/getRetiredCredits/:address', async (req, res) => {
    const { address } = req.params;
    try {
      const [rows] = await pool.query('SELECT SUM(credit_amount) AS credits_retired FROM issuer WHERE issuer_address = ? AND active_status = "1"', [address]);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching issuer:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  })

  router.get('/getTotalCredits/:address', async (req, res) => {
    const { address } = req.params;
    try {
      const [rows] = await pool.query('SELECT SUM(credit_amount) AS total_credits FROM issuer WHERE issuer_address = ?', [address]);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching issuer:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  })

  router.get('/getYearlyCredits/:address', async (req, res) => {
    const { address } = req.params;
    try {
      const [rows] = await pool.query('SELECT SUM(credit_amount) AS yearly_credits FROM issuer WHERE issuer_address = ? AND YEAR(date_issued) = YEAR(CURRENT_DATE())', [address]);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching issuer:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  })

  router.get('/address/:address', async (req, res) => {
    const { address } = req.params;
    try {
      const [rows] = await pool.query('SELECT * FROM issuer WHERE issuer_address = ?', [address]);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching issuer:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  router.get('/verified/address/:address', async (req, res) => {
    const { address } = req.params;
    try {
      const [rows] = await pool.query('SELECT * FROM issuer WHERE issuer_address = ?', [address]);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching verified issuer:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });
  router.get('/active-rows', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT credit_amount, date_issued FROM issuer WHERE active_status = "0" ORDER BY date_issued ASC');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching active rows:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  router.get('/retired-rows', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT credit_amount, date_issued FROM issuer WHERE active_status = "1" ORDER BY date_issued ASC');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching retired rows:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });
  
  // GET - fetch amount of credits retired 
  router.get('/retired', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT SUM(credit_amount) AS credit_retired FROM issuer WHERE active_status = "1"');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching total verified credits:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  router.get('/verified-count', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT COUNT(*) AS verified_count FROM issuer WHERE verification_status = "1"');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching verified issuer:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });
  router.get('/verified/count', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT SUM(credit_amount) AS verified_credits FROM issuer WHERE verification_status = "1"');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching verified issuer count:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // GET - fetch amount of credits issued
  router.get('/issued', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT SUM(credit_amount) AS credit_issued FROM issuer WHERE active_status = "0"');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching total verified credits:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });
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