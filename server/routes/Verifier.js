const express = require('express');

function createRouter(pool) {
  const router = express.Router();

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

  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query('SELECT * FROM verifier WHERE id = ?', [id]);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching verifier:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // POST - Create a new verifier
  router.post('/create', async (req, res) => {
    const { verifierAddress, transaction_updated, transaction_hash } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO verifier (verifier_address, transaction_updated, transaction_hash) VALUES (?, ?, ?)',
        [verifierAddress, transaction_updated, transaction_hash]
      );
      res.status(201).json({ id: result.insertId, verifierAddress, transaction_updated, transaction_hash });
    } catch (error) {
      console.error('Error creating verifier:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // PUT - Update a verifier
  router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { verifierAddress, transaction_updated, transaction_hash } = req.body;
    try {
      await pool.query(
        'UPDATE verifier SET verifier_address = ?, transaction_updated = ?, transaction_hash = ? WHERE id = ?',
        [verifierAddress, transaction_updated, transaction_hash, id]
      );
      res.json({ id, verifierAddress, transaction_updated, transaction_hash });
    } catch (error) {
      console.error('Error updating verifier:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // DELETE - Remove a verifier
  router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM verifier WHERE id = ?', [id]);
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting verifier:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  return router;
}

module.exports = createRouter;