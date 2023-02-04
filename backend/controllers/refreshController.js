const User = require("../models/index").User;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefresh = async (req, res) => {
	console.log(req.cookies);
	const cookies = req.cookies;
	if (!cookies?.loginCookie) return res.status(400).json({ error: "Invalid token" });
	const token = cookies.loginCookie


	try {
		const foundUser = await User.findOne({
			where: {
				refreshToken: token,
			},
		});

		if (!foundUser) return res.status(403).json({ error: "invalid user" });

		console.log(foundUser.username);

		jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
			console.log(decoded);
			if (err || foundUser.username !== decoded.userInfo.username)
				return res.sendStatus(403);

			const accessToken = jwt.sign(
				{
					userInfo: {
						username: decoded.username,
					},
				},
				process.env.ACCESS_TOKEN_SECRET,
				{
					expiresIn: "60s",
				}
			);
			return res.status(200).json({ accessToken });
		});
	} catch (error) {
		res.status(400).json({ error: error });
	}
};

module.exports = {handleRefresh}