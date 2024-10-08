const express = require('express');

function createRouter(pool) {
  const router = express.Router();


  router.get('/getLastYearCredits/:address', async (req, res) => {
      const {
        address
      } = req.params;
      try {
        const [rows] = await pool.query('SELECT SUM(credit_amount) AS last_year_credits FROM issuer WHERE issuer_address = ? AND YEAR(date_issued) = YEAR(DATE_SUB(CURRENT_DATE(), INTERVAL 1 YEAR))', [address]);
        res.json(rows);
      } catch (error) {
        console.error('Error fetching last year credits:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
      }

    });
    
    router.get('/getTotalCreditsActiveAndVerified', async (req, res) => {
      try {
        const [rows] = await pool.query('SELECT SUM(credit_amount) AS total_credits FROM issuer WHERE active_status = "0" AND verification_status = "1"');
        res.json(rows);
      } catch (error) {
        console.error('Error fetching total credits:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
      }
    });

    router.get('/getActiveAndVerifiedRows', async (req, res) => {
      try {
        const [rows] = await pool.query('SELECT * FROM issuer WHERE active_status = "0" AND verification_status = "1" ORDER BY date_issued DESC');
        res.json(rows);
      } catch (error) {
        console.error('Error fetching active and verified rows:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
      }
    });

    router.get('/getYearlyAverage/:address', async (req, res) => {
      const {
        address
      } = req.params;
      try {
        const [rows] = await pool.query('SELECT AVG(credit_amount) AS yearly_average FROM issuer WHERE issuer_address = ?', [address]);
        res.json(rows);
      } catch (error) {
        console.error('Error fetching yearly average:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
      }
    });

    router.get('/getVerifiedCredits/:address', async (req, res) => {
      const {
        address
      } = req.params;
      try {
        const [rows] = await pool.query('SELECT SUM(credit_amount) AS credits_issued FROM issuer WHERE issuer_address = ? AND verification_status = "1"', [address]);
        res.json(rows);
      } catch (error) {
        console.error('Error fetching issuer:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
      }
    })

    router.get('/getRetiredCredits/:address', async (req, res) => {
      const {
        address
      } = req.params;
      try {
        const [rows] = await pool.query('SELECT SUM(credit_amount) AS credits_retired FROM issuer WHERE issuer_address = ? AND active_status = "1"', [address]);
        res.json(rows);
      } catch (error) {
        console.error('Error fetching issuer:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
      }
    })

    router.get('/getTotalCredits/:address', async (req, res) => {
      const {
        address
      } = req.params;
      try {
        const [rows] = await pool.query('SELECT SUM(credit_amount) AS total_credits FROM issuer WHERE issuer_address = ?', [address]);
        res.json(rows);
      } catch (error) {
        console.error('Error fetching issuer:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
      }
    })

    router.get('/getYearlyCredits/:address', async (req, res) => {
      const {
        address
      } = req.params;
      try {
        const [rows] = await pool.query('SELECT SUM(credit_amount) AS yearly_credits FROM issuer WHERE issuer_address = ? AND YEAR(date_issued) = YEAR(CURRENT_DATE())', [address]);
        res.json(rows);
      } catch (error) {
        console.error('Error fetching issuer:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
      }
    })
    router.get('/all', async (req, res) => {
      const { issuer_address, project_name, date_issued, period_covered, credit_amount, verification_status, active_status } = req.query; // Change to req.query
      console.log("Received filters:", { issuer_address, project_name, date_issued, period_covered, credit_amount, verification_status, active_status });
      let query = 'SELECT * FROM issuer WHERE 1=1';
      const params = [];
      
      if (issuer_address) {
        query += ' AND issuer_address = ?';
        params.push(`${issuer_address}`);
      }
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
      if (credit_amount) {
        query += ' AND credit_amount = ?';
        params.push(credit_amount);
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

    router.get('/address/:address', async (req, res) => {
      const {
        address
      } = req.params;
      try {
        const [rows] = await pool.query('SELECT * FROM issuer WHERE issuer_address = ?', [address]);
        res.json(rows);
      } catch (error) {
        console.error('Error fetching issuer:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
      }
    });

    router.get('/verified/address/:address', async (req, res) => {
      const {
        address
      } = req.params;
      try {
        const [rows] = await pool.query('SELECT * FROM issuer WHERE issuer_address = ?', [address]);
        res.json(rows);
      } catch (error) {
        console.error('Error fetching verified issuer:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
      }
    }); router.get('/active-rows', async (req, res) => {
      try {
        const [rows] = await pool.query('SELECT credit_amount, date_issued FROM issuer WHERE active_status = "0" ORDER BY date_issued ASC');
        res.json(rows);
      } catch (error) {
        console.error('Error fetching active rows:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
      }
    });

    router.get('/retired-rows', async (req, res) => {
      try {
        const [rows] = await pool.query('SELECT credit_amount, date_issued FROM issuer WHERE active_status = "1" ORDER BY date_issued ASC');
        res.json(rows);
      } catch (error) {
        console.error('Error fetching retired rows:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
      }
    });

    // GET - fetch amount of credits retired 
    router.get('/retired', async (req, res) => {
      try {
        const [rows] = await pool.query('SELECT SUM(credit_amount) AS credit_retired FROM issuer WHERE active_status = "1"');
        res.json(rows);
      } catch (error) {
        console.error('Error fetching total verified credits:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
      }
    });

    router.get('/verified-count', async (req, res) => {
      try {
        const [rows] = await pool.query('SELECT COUNT(*) AS verified_count FROM issuer WHERE verification_status = "1"');
        res.json(rows);
      } catch (error) {
        console.error('Error fetching verified issuer:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
      }
    }); router.get('/verified/count', async (req, res) => {
      try {
        const [rows] = await pool.query('SELECT SUM(credit_amount) AS verified_credits FROM issuer WHERE verification_status = "1"');
        res.json(rows);
      } catch (error) {
        console.error('Error fetching verified issuer count:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
      }
    });

    // GET - fetch amount of credits issued
    router.get('/issued', async (req, res) => {
      try {
        const [rows] = await pool.query('SELECT SUM(credit_amount) AS credit_issued FROM issuer WHERE active_status = "0"');
        res.json(rows);
      } catch (error) {
        console.error('Error fetching total verified credits:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
      }
    });
    // GET - Fetch the number of all issuer transactions
    router.get('/count', async (req, res) => {
      try {
        const [rows] = await pool.query('SELECT COUNT(*) AS transaction_count FROM issuer');
        res.json(rows);
      } catch (error) {
        console.error('Error fetching issuer count:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
      }
    });

    // GET - Fetch the number of unique issuer addresses
    router.get('/addresses', async (req, res) => {
      try {
        const [rows] = await pool.query('SELECT COUNT(DISTINCT issuer_address) AS address_count FROM issuer');
        res.json(rows);
      } catch (error) {
        console.error('Error fetching unique issuer addresses:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
      }
    });

    // GET - Fetch the total amount of verified credits issued
    router.get('/total', async (req, res) => {
      try {
        const [rows] = await pool.query('SELECT SUM(credit_amount) AS credit_count FROM issuer WHERE verification_status = "1"');
        res.json(rows);
      } catch (error) {
        console.error('Error fetching total verified credits:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
      }
    });

    // GET - Fetch all issuers
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

    // GET only verified ones

    router.get('/unverified/count', async (req, res) => {
      try {
        const [rows] = await pool.query('SELECT COUNT(*) AS unverified_count FROM issuer WHERE verification_status = "0"');
        res.json(rows);
      } catch (error) {
        console.error('Error fetching unverified issuers:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
      }
    });

    router.get('/unverified', async (req, res) => {
      try {
        const [rows] = await pool.query('SELECT * FROM issuer WHERE verification_status = "0"');
        res.json(rows);
      } catch (error) {
        console.error('Error fetching verified issuers:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
      }
    });

    router.get('/:txHash', async (req, res) => {
      const {
        txHash
      } = req.params;
      try {
        const [rows] = await pool.query('SELECT * FROM issuer WHERE transaction_hash = ?', [txHash]);
        res.json(rows);
      } catch (error) {
        console.error('Error fetching issuer:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
      }
    });

    // POST - Create a new issuer
    router.post('/create', async (req, res) => {
      const {
        issuer_address,
        project_name,
        credit_amount,
        active_status,
        date_issued,
        country,
        period_covered,
        verification_status,
        prev_tx,
        bought_by,
        transaction_hash
      } = req.body;
      try {
        const currDate = new Date().toLocaleString('en-AU', {
          timeZone: 'Australia/Sydney'
        }).replace(/(\d+)\/(\d+)\/(\d+),?\s*(\d+):(\d+):(\d+)\s*(AM|PM)/i, '$3-$2-$1 $4:$5:$6');
        await pool.query(
          'INSERT INTO issuer (issuer_address, project_name, credit_amount, active_status, date_issued, country, period_covered, verification_status, timestamp, prev_tx, bought_by, transaction_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [issuer_address, project_name, credit_amount, active_status, date_issued, country, period_covered, verification_status, currDate, prev_tx, bought_by, transaction_hash]
        );
        res.status(201).json({
          message: "Issuer created successfully ",
          data: {
            issuer_address,
            project_name,
            credit_amount,
            active_status,
            date_issued,
            country,
            period_covered,
            verification_status,
            currDate,
            prev_tx,
            bought_by,
            transaction_hash
          }
        });
      } catch (error) {
        console.error('Error creating issuer:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
      }
    });

    // PUT - Update an issuer
    router.put('/update/:txHash', async (req, res) => {
      const {
        txHash
      } = req.params;
      const {
        project_name,
        credit_amount,
        active_status,
        date_issued,
        country,
        period_covered,
        verification_status,
        transaction_hash,
        bought_by,
        prev_tx
      } = req.body;
      try {
        const currDate = new Date().toLocaleString('en-AU', {
          timeZone: 'Australia/Sydney'
        }).replace(/(\d+)\/(\d+)\/(\d+),?\s*(\d+):(\d+):(\d+)\s*(AM|PM)/i, '$3-$2-$1 $4:$5:$6');
        await pool.query(
          'UPDATE issuer SET project_name = ?, credit_amount = ?, active_status = ?, date_issued = ?, country = ?, timestamp = ?, period_covered = ?, verification_status = ?, transaction_hash = ?, bought_by = ?, prev_tx = ? WHERE transaction_hash = ?',
          [project_name, credit_amount, active_status, date_issued, country, currDate, period_covered, verification_status, transaction_hash, bought_by, prev_tx, txHash]
        );
        res.json({
          message: "Issuer updated successfully",
          data: {
            project_name,
            credit_amount,
            active_status,
            date_issued,
            country,
            currDate,
            period_covered,
            verification_status,
            transaction_hash,
            bought_by,
            prev_tx
          }
        });
      } catch (error) {
        console.error('Error updating issuer:', error);
        res.status(500).json({
          error: 'Internal server error',
          details: error.message
        });
      }
    });

    return router;
  }

  module.exports = createRouter;