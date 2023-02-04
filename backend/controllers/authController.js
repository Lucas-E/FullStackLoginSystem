const User = require("../models/index").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password)
		return res
			.status(400)
			.json({ error: "Username and password required" });

	try {
		const foundUser = await User.findOne({
			where: {
				username: username,
			},
		});

		if (!foundUser)
			return res.status(400).json({ error: "User not found" });

		bcrypt.compare(password, foundUser.password, async (err, result) => {
			if (err) return res.status(400).json({ error: err });

			if (result) {
				//generating access token
				const accessToken = jwt.sign(
					{
						userInfo: {
							username: foundUser.username,
						},
					},
					process.env.ACCESS_TOKEN_SECRET,
					{ expiresIn: "60s" }
				);
				//generating refresh token
				const refreshToken = jwt.sign(
					{
						userInfo: {
							username: foundUser.username,
						},
					},
					process.env.REFRESH_TOKEN_SECRET,
					{ expiresIn: "1d" }
				);

				//updating refresh token on user
				// const updateUser = await User.update({
				// 	refreshToken: refreshToken
				// }, {
				// 	where: {
				// 		username:foundUser.username
				// 	}
				// })

				foundUser.refreshToken = refreshToken
				await foundUser.save()

				//responding cookie with refresh token
				res.cookie("loginCookie", refreshToken, {
					httpOnly: true,
					maxAge: 60 * 60 * 24 * 1000,
				});

				//returning access token
				return res.status(200).json({ accessToken: accessToken });
			} else {
				return res.status(400).json({ msg: "user not found" });
			}
		});
	} catch (error) {
		return res.status(400).json({ error: error });
	}
};

module.exports = {
	handleLogin,
};
