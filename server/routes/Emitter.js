const express = require('express');

function createRouter(pool) {
	const router = express.Router();

	// GET - Fetch all emitters
	router.get('/all', async (req, res) => {
		try {
			const [rows] = await pool.query('SELECT * FROM emitter');
			res.json(rows);
		} catch (error) {
			console.error('Error fetching emitters:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});

	// POST - Create a new emitter
	router.post('/create', async (req, res) => {
		const { name, email } = req.body;
		try {
			const [result] = await pool.query(
				'INSERT INTO emitters (name, email) VALUES (?, ?)',
				[name, email]
			);
			res.status(201).json({ id: result.insertId, name, email });
		} catch (error) {
			console.error('Error creating emitter:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});

	// PUT - Update an emitter
	router.put('/update/:id', async (req, res) => {
		const { id } = req.params;
		const { name, email } = req.body;
		try {
			await pool.query(
				'UPDATE emitters SET name = ?, email = ? WHERE id = ?',
				[name, email, id]
			);
			res.json({ id, name, email });
		} catch (error) {
			console.error('Error updating emitter:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});

	// DELETE - Remove an emitter
	router.delete('/delete/:id', async (req, res) => {
		const { id } = req.params;
		try {
			await pool.query('DELETE FROM emitters WHERE id = ?', [id]);
			res.status(204).end();
		} catch (error) {
			console.error('Error deleting emitter:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});

	return router;
}

module.exports = createRouter;