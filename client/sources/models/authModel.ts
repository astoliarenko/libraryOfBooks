// import {events} from '../helpers/constants/commonConst';
// import {getItem, setItem} from '../helpers/storages/localAndSessionStorage';

import IQueryResult from '../interfaces/IQueryResult';
import BaseModel from './baseModel';
import {postRequestOptions} from './fetchApiService';
// import {showMessage} from './utils';
import constants from '../constants';

export default class AuthModel extends BaseModel {
    protected static instance: AuthModel;

    private constructor() {
        super();
        this.entityName = 'auth';
    }

    public static getInstance(): AuthModel {
        if (!AuthModel.instance) {
            AuthModel.instance = new AuthModel();
        }

        return AuthModel.instance;
    }

    public loginUser(body: {username: string, password: string, isRemember: boolean}) {
        return this.handleRequestResponse(
            postRequestOptions({path: '/auth/login', body}),
            body,
            {
                200: (response, result: IQueryResult) => {
                    result.success = true;
                    result.data = {
                        userInfo: response.data.userInfo
                    };
                    return result;
                },
                404: (response, result: IQueryResult) => {
                    result.success = false;
                    result.data = {
                        message: response.data.message,
                    }
                    result.errorFields = [response.data.field];
                    return result;
                },
                422: (response, result: IQueryResult) => {
                    result.success = false;
                    result.data = {
                        message: response.data.message,
                    }
                    result.errorFields = [response.data.field];
                    return result;
                },
                500: (response, result: IQueryResult) => {
                    result.success = false;
                    result.data = {
                        message: response.data.message
                    }
                    return result;
                }
            },
            'login'
        );
    }

    public cookieLogin(): Promise<{success: boolean, userInfo?: any, message?: string}> {
        return	fetch(`${constants.URLs.SERVER}auth/login`, {
            method: "GET",
            // mode: 'no-cors', // no-cors, *cors, same-origin
            credentials: "include", // omit, same-origin*
            // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json());
    }

    // async refreshToken(app, repeatRequest) {
    //     return this.handleRequestResponse(
    //         getRequestOptions({path: '/auth/refresh'}),
    //         [],
    //         {
    //             200: () => {
    //                 return repeatRequest();
    //             },
    //             304: () => {
    //                 return repeatRequest();
    //             },
    //             401: () => {
    //                 // reset user data
    //                 this.data = null;
    //                 app.callEvent(events.app.refreshTokenError);
    //             }
    //         },
    //         'refresh token'
    //     );
    // }

    // async logOutUser(body): Promise<IQueryResult> {
    //     return this.handleRequestResponse(
    //         postRequestOptions({path: '/auth/logout', body}),
    //         body,
    //         {200: (response: IQueryResult) => {
    //             response.success = true;
    //             this.app.callEvent(events.app.refreshTokenError, [true]);
    //             return response;
    //         }},
    //         'logout'
    //     );
    // }

    public async registrationNewUser(body): Promise<IQueryResult> {
        return this.handleRequestResponse(
            postRequestOptions({path: '/auth/registration', body}),
            body,
            {201: (response, result: IQueryResult) => {
                result.success = true;
                result.data = response.data;

                return result;
            },
            400: (response, result: IQueryResult) => {
                result.success = false;
                result.data = response.data;
                result.errorFields = [response.data.field];

                return result;
            },
            422: (response, result: IQueryResult) => {
                result.success = false;
                result.data = response.data;
                result.errorFields = [response.data.field];

                return result;
            }
        },
            'registration new user'
        );
    }
}
