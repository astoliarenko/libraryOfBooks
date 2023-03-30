import BaseModel from "./baseModel";
import { getRequestOptions, patchRequestOptions } from "./fetchApiService";
import IQueryResult from "../interfaces/IQueryResult";

export default class UsersModel extends BaseModel {
	protected static instance: UsersModel;

    private constructor() {
        super();
        this.entityName = 'books or genres';
    }

    public static getInstance(): UsersModel {
        if (!UsersModel.instance) {
            UsersModel.instance = new UsersModel();
        }

        return UsersModel.instance;
    }

	public async getUserinfo() {
		return this.handleRequestResponse(
            getRequestOptions({path: '/users'}),
            {},
            {200: (response, result: IQueryResult) => {
                result.success = true;
                result.data = response.data;

                return result;
            },
            400: (response, result: IQueryResult) => {
                result.success = false;

                return result;
            }
        },
            'registration new user'
        );
	}

    public async updateUserinfo(userInfo) {
		return this.handleRequestResponse(
            patchRequestOptions({path: '/users', body: userInfo}),
            {},
            {200: (response, result: IQueryResult) => {
                result.success = true;

                return result;
            },
            400: (response, result: IQueryResult) => {
                result.success = false;

                return result;
            }
        },
            'user info was updated'
        );
	}

    public async getAllUsers(userInfo) {
		return this.handleRequestResponse(
            getRequestOptions({path: '/users'}),
            {},
            {200: (response, result: IQueryResult) => {
                result.success = true;
                result.data = response.data;

                return result;
            },
            400: (response, result: IQueryResult) => {
                result.success = false;

                return result;
            }
        },
            'get user info'
        );
	}
}
