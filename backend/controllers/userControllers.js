const User = require("../models/index").User;
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
	try {
		const query = await User.findAll({ raw: true });
		console.log(query);
		return res.status(200).json(query);
	} catch (error) {
		return res.sendStatus(404);
	}
};

const postUser = async (req, res) => {
	const { username, password, refreshToken } = req.body;
	if (!username || !password)
		return res.status(400).json({ error: "User and Password required" });

	const userTest = await User.findOne({
		where: {
			username: username
		}
	})

	if(userTest) return res.status(409).json({error: "User already exists!"})
	try {
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);
		const query = User.create({
			username: username,
			password: hashPassword,
			refreshToken: refreshToken,
		});
		return res.sendStatus(200);
	} catch (error) {
		return res.status(400).json({ error: error });
	}
};

const updateUser = async (req, res) => {
	const { username, newUsername, password, newPassword } = req.body;
	const id = Number(req.params.id);

	if (typeof id !== "number")
		return res.status(400).json({
			error: "Id required, and it have to be a number",
			typeProvided: typeof id,
		});

	try {
		const query = await User.findByPk(id);
		const previousUsername = query.dataValues.username;
		const previousPassword = query.dataValues.password;
		const previousRefreshToken = query.dataValues.refreshToken;

		const salt = await bcrypt.genSalt(10);
		const hashPassword = password
			? await bcrypt.hash(password, salt)
			: previousPassword;

		const updating = await User.update(
			{
				username: username ? username : previousUsername,
				password: hashPassword,
				refreshToken: previousRefreshToken,
			},
			{
				where: {
					id: id,
				},
			}
		);

		return res.sendStatus(200);
	} catch (error) {
		return res.status(400).json({ error: error });
	}
};

const deleteUser = async (req, res) => {
	const id = Number(req.params.id);
	if (typeof id !== "number")
		return res.status(400).json({ error: "Type of id must be integer" });

	try {
		const query = User.destroy({
			where: {
				id: id,
			},
		});
		return res.sendStatus(200);
	} catch (error) {
		return res.status(400).json({ error: error });
	}
};

module.exports = {
	deleteUser,
	getAllUsers,
	postUser,
	updateUser,
};
