const router = require("express").Router();
const cryptoService = require("../services/cryptoService");
const { isAuth } = require("../middlewares/authMiddleware");

//Main route for publications
router.get("/", async (req, res) => {
	const publications = await cryptoService.getAll().lean();
	res.render("catalog", { publications });
});

//Route for creating a new publication
router.get("/create", isAuth, (req, res) => {
	res.render("catalog/create");
});

//Route for creating a new publication
router.post("/create", isAuth, async (req, res) => {
	try {
		const createdPublication = await cryptoService.create({
			...req.body,
			owner: req.user._id,
		});
		res.redirect("/catalog");
	} catch (err) {
		res.render("catalog/create", { ...req.body, error: err.message });
	}
});

//Route for publication details
router.get("/:cryptoId/details", async (req, res) => {
	const publication = await cryptoService
		.getOneDetailed(req.params.cryptoId)
		.lean();

	const isOwner = publication.owner._id == req.user?._id;
	const isLoggedIn = req.user;
	const hasPurchased = publication.buyers.map((buyer) => {
		if (buyer._id.toString() == req.user?._id) {
			return true;
		} else {
			false;
		}
	});
	res.render("catalog/details", {
		...publication,
		isOwner,
		isLoggedIn,
		hasPurchased,
	});
});

//Route for editing a publication

router.get("/:cryptoId/edit", isAuth, async (req, res, next) => {
	const publication = await cryptoService.getOne(req.params.cryptoId).lean();
	if (publication.owner._id.toString() !== req.user?._id.toString()) {
		return next({
			message: "You are not authorized to edit this publication",
			status: 401,
		});
	}
	res.render("catalog/edit", { ...publication });
});

// Route for saving edited publication
router.post("/:cryptoId/edit", isAuth, async (req, res, next) => {
	try {
		const publication = await cryptoService.getOne(req.params.cryptoId).lean();
		if (publication.owner._id.toString() !== req.user?._id.toString()) {
			return next({
				message: "You are not authorized to edit this publication",
				status: 401,
			});
		}

		const updatedPublication = await cryptoService.update(
			req.params.cryptoId,
			req.body
		);
		res.redirect(`/catalog/${req.params.cryptoId}/details`);
	} catch (err) {
		res.render("catalog/edit", { ...req.body, error: err.message });
	}
});

// Route for buying crypto
router.get("/:cryptoId/buy", isAuth, async (req, res) => {
	try {
		const publication = await cryptoService.buy(
			req.params.cryptoId,
			req.user._id
		);
		res.redirect(`/catalog/${req.params.cryptoId}/details`);
	} catch (err) {
		res.render("");
	}
});

// Route for deleting crypto
router.get("/:cryptoId/delete", isAuth, async (req, res, next) => {
	try {
		await cryptoService.delete(req.params.cryptoId, req.user._id);
		res.redirect(`/catalog/`);
	} catch (err) {
		return next({
			message: "You are not authorized to edit this publication",
			status: 401,
		});
	}
});

module.exports = router;
