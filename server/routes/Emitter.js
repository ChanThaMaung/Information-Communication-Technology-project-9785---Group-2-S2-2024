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

	router.get('/:txHash', async (req, res) => {
		const { txHash } = req.params;
		try {
			const [rows] = await pool.query('SELECT * FROM emitter WHERE transaction_hash = ?', [txHash]);
			res.json(rows);
		} catch (error) {
			console.error('Error fetching emitter:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});
	
	// POST - Create a new emitter
	router.post('/create', async (req, res) => {
		const { emitterAddress, credit_amount, date_bought, verification_status, transaction_hash } = req.body;
		try {
			const [result] = await pool.query(
				'INSERT INTO emitter (emitter_address, credit_amount, date_bought, verification_status, transaction_hash) VALUES (?, ?, ?, ?, ?)',
				[emitterAddress, credit_amount, date_bought, verification_status, transaction_hash]
			);
			res.status(201).json({ id: result.insertId, emitterAddress, credit_amount, date_bought, verification_status, transaction_hash });
		} catch (error) {
			console.error('Error creating emitter:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});

	// PUT - Update an emitter
	router.put('/update/:txHash', async (req, res) => {
		const { txHash } = req.params;
		const { emitterAddress, credit_amount, date_bought, verification_status } = req.body;
		try {
			await pool.query(
				'UPDATE emitter SET emitter_address = ?, credit_amount = ?, date_bought = ?, verification_status = ? WHERE transaction_hash = ?',
				[emitterAddress, credit_amount, date_bought, verification_status, txHash]
			);
			res.json({ emitterAddress, credit_amount, date_bought, verification_status, txHash });
		} catch (error) {
			console.error('Error updating emitter:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});

	// DELETE - Remove an emitter
	router.delete('/delete/:txHash', async (req, res) => {
		const { txHash } = req.params;
		try {
			await pool.query('DELETE FROM emitter WHERE transaction_hash = ?', [txHash]);
			res.status(204).end();
		} catch (error) {
			console.error('Error deleting emitter:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});

	return router;
}

module.exports = createRouter;