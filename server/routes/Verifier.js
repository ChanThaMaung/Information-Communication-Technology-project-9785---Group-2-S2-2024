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

  // POST - Create a new verifier
  router.post('/create', async (req, res) => {
    const { name, public_key } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO verifiers (name, public_key) VALUES (?, ?)',
        [name, public_key]
      );
      res.status(201).json({ id: result.insertId, name, public_key });
    } catch (error) {
      console.error('Error creating verifier:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // PUT - Update a verifier
  router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, public_key } = req.body;
    try {
      await pool.query(
        'UPDATE verifiers SET name = ?, public_key = ? WHERE id = ?',
        [name, public_key, id]
      );
      res.json({ id, name, public_key });
    } catch (error) {
      console.error('Error updating verifier:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // DELETE - Remove a verifier
  router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM verifiers WHERE id = ?', [id]);
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting verifier:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  return router;
}

module.exports = createRouter;