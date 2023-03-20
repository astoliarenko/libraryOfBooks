import {events} from '../helpers/constants/commonConst';
import {getItem, setItem} from '../helpers/storages/localAndSessionStorage';

import IQueryResult from '../interfaces/IQueryResult';
import BaseModel from './baseModel';
import {getRequestOptions, postRequestOptions} from './fetchApiService';
import {showMessage} from './utils';

export default class AuthModel extends BaseModel {
    protected static instance: AuthModel;

    private data: any;

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

    public getUserInfo() {
        if (!this.data) {
            this.data = JSON.parse(getItem(localStorage, 'userData'));
        }
        return this.data;
    }

    public isReader() {
        const userInfo = this.getUserInfo();
        return !userInfo?.isAdmin && !userInfo?.isSuperAdmin;
    }

    public isAdmin() {
        const userInfo = this.getUserInfo();
        return userInfo?.isAdmin;
    }

    public isLibrarian() {
        const userInfo = this.getUserInfo();
        return userInfo?.isSuperAdmin;
    }

    async loginUser(body: {username: string, password: string, isRemember: boolean}) {
        return this.handleRequestResponse(
            postRequestOptions({path: '/auth/login', body}),
            body,
            {
                200: (response, result: IQueryResult) => {
                    result.success = true;
                    result.data = response.data;
                    this.data = response.data;
                    setItem(localStorage, 'userData', JSON.stringify(response.data));
                    return result;
                },
                401: (response, result: IQueryResult) => {
                    result.success = false;
                    result.data.message = response.data.message;
                    return result;
                },
                422: () => {
                    showMessage('Invalid user credentials', 'error');
                }
                // todo allow replace default
                // showMessage('Something went wrong. Please try to login again', 'error');
            },
            'login'
        );
    }

    async checkUser() {
        return this.handleRequestResponse(
            getRequestOptions({path: '/auth/user'}),
            [],
            {
                200: (response, result: IQueryResult) => {
                    result.success = true;
                    this.data = response.data;
                    setItem(localStorage, 'userData', JSON.stringify(response.data));
                    return result;
                }
            },
            'check user'
        );
    }

    async refreshToken(app, repeatRequest) {
        return this.handleRequestResponse(
            getRequestOptions({path: '/auth/refresh'}),
            [],
            {
                200: () => {
                    return repeatRequest();
                },
                304: () => {
                    return repeatRequest();
                },
                401: () => {
                    // reset user data
                    this.data = null;
                    app.callEvent(events.app.refreshTokenError);
                }
            },
            'refresh token'
        );
    }

    async logOutUser(body): Promise<IQueryResult> {
        return this.handleRequestResponse(
            postRequestOptions({path: '/auth/logout', body}),
            body,
            {200: (response: IQueryResult) => {
                response.success = true;
                // reset user data
                this.data = null;
                this.app.callEvent(events.app.refreshTokenError, [true]);
                return response;
            }},
            'logout'
        );
    }

    async registrationNewUser(body): Promise<IQueryResult> {
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

                return result;
            }
        },
            'logout'
        );
    }
}
