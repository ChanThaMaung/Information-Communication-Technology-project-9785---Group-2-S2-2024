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

	router.get('/unverified', async (req, res) => {
		try {
			const [rows] = await pool.query('SELECT * FROM emitter WHERE verification_status = "0"');
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
		const { emitterAddress, project_name, credit_amount, date_bought, verification_status, prev_tx, transaction_hash } = req.body;
		try {
			await pool.query(
				'INSERT INTO emitter (emitter_address, project_name, credit_amount, date_bought, verification_status, prev_tx, transaction_hash) VALUES (?, ?, ?, ?, ?, ?, ?)',
				[emitterAddress, project_name, credit_amount, date_bought, verification_status, prev_tx, transaction_hash]
			);
			res.status(201).json({ emitterAddress, project_name, credit_amount, date_bought, verification_status, prev_tx, transaction_hash });
		} catch (error) {
			console.error('Error creating emitter:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});

	// PUT - Update an emitter
	router.put('/update/:txHash', async (req, res) => {
		const { txHash } = req.params;
		const { credit_amount, date_bought, verification_status, prev_tx, transaction_hash } = req.body;
		try {
			await pool.query(
				'UPDATE emitter SET credit_amount = ?, date_bought = ?, verification_status = ?, prev_tx = ?, transaction_hash = ? WHERE transaction_hash = ?',
				[credit_amount, date_bought, verification_status, prev_tx, transaction_hash, txHash]

			);
			res.json({ credit_amount, date_bought, verification_status, prev_tx, transaction_hash, txHash });
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