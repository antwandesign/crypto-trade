const router = require("express").Router();
const cryptoService = require("../services/cryptoService");

router.get("/", async (req, res) => {
	const publications = await cryptoService.getAll().lean();
	res.render("search", { publications });
});

router.post("/", async (req, res) => {
	const { query, paymentMethod } = req.body;
	const publications = await cryptoService.search(query, paymentMethod).lean();
	res.render("search", { publications });
});

module.exports = router;
