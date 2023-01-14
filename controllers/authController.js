//IMPORTS
const router = require("express").Router();
const authService = require("../services/authService");
const { isAuth, isGuest } = require("../middlewares/authMiddleware");
const { getErrorMessage } = require("../utils/errorHelpers");

//LOGIN
router.get("/login", isGuest, (req, res) => {
	res.render("auth/login");
});

router.post("/login", isGuest, async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await authService.login(email, password);
		const token = await authService.createToken(user);
		res.cookie("user", token, { httpOnly: true });
		res.redirect("/");
	} catch (err) {
		res.render("auth/login", { error: getErrorMessage(err) });
	}
});

//REGISTER
router.get("/register", isGuest, (req, res) => {
	res.render("auth/register");
});

router.post("/register", isGuest, async (req, res) => {
	const { username, email, password, repeatPassword } = req.body;
	if (password !== repeatPassword) {
		return res.render("auth/register", { error: "Passwords do not match" });
	}
	if (password.length < 4) {
		return res.render("auth/register", {
			error: "Password should be atleast 4 characters long",
		});
	}
	//Create user
	try {
		const createdUser = await authService.create({
			username,
			email,
			password,
		});
		//Auto login user
		const token = await authService.createToken(createdUser);
		res.cookie("user", token, { httpOnly: true });
		//Redirect to Login Page
		res.redirect("/");
	} catch (err) {
		res.render("auth/register", { error: getErrorMessage(err) });
	}
});
//Log out user
router.get("/logout", isAuth, (req, res) => {
	res.clearCookie("user");
	res.redirect("/");
});

//EXPORTS
module.exports = router;
