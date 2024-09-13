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

  // POST - Create a new issuer
  router.post('/create', async (req, res) => {
    const { name, public_key } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO issuers (name, public_key) VALUES (?, ?)',
        [name, public_key]
      );
      res.status(201).json({ id: result.insertId, name, public_key });
    } catch (error) {
      console.error('Error creating issuer:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // PUT - Update an issuer
  router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, public_key } = req.body;
    try {
      await pool.query(
        'UPDATE issuers SET name = ?, public_key = ? WHERE id = ?',
        [name, public_key, id]
      );
      res.json({ id, name, public_key });
    } catch (error) {
      console.error('Error updating issuer:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // DELETE - Remove an issuer
  router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM issuers WHERE id = ?', [id]);
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting issuer:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  return router;
}

module.exports = createRouter;