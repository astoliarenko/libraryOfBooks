import getCookie from "../../helpers/usefulFunctions";
import constants from "../../constants";
import TokenService from "../token/token.service";
import usersRepository from "./users.repository";

class UsersController {
	async getUserInfo(req, res): Promise<void> {
		try {
			const reqCookies = req.headers.cookie;

			if (!reqCookies) {
				res.status(400);
			}
			else {
				const token = getCookie(reqCookies, constants.TOKEN_NAMES.ACCESS_TOKEN);
	
				if (token) {
					const tokenInfo = TokenService.getInfoFromToken(token);

					const [rows, fields] = await usersRepository.getUserInfoById(tokenInfo.id);
					
					if (rows.length) {
						res.status(200).json(rows[0]);
					}
				}
				else res.status(400);
			}
		}
		catch(e) {
			console.log(e);
		}
	}
}

export default new UsersController();
