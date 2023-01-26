import {IJetApp} from 'webix-jet';

import IQueryResult from '../interfaces/IQueryResult';
import AuthModel from './authModel';
import {showMessage} from './utils';

export default class BaseModel {
    protected static instance: BaseModel;

    protected app: IJetApp;

    public entityName: string;

    public setAppInstance(app: IJetApp): void {
        this.app = app;
    }

    async handleRequestResponse(
        fetchAPIOptions,
        data,
        handlers,
        actionName: string
    ): Promise<IQueryResult> {
        let result: IQueryResult = {success: false, data: []};
        try {
            const response = await this.app.getService('fetchAPI').fetchAPI(fetchAPIOptions);
            const statusCode = response.statusCode;
            if (statusCode in handlers) {
                const handlerFunc = handlers[statusCode];
                result = handlerFunc.call(this, response, result);
            }
            else if ([200, 201, 304].includes(statusCode)) {
                result.success = true;
                result.data = response.data;
            }
            else if (statusCode === 400) {
                result.errorFields = response.data.errorFields;
                showMessage(`Something went wrong. We couldn't ${actionName} the ${this.entityName}`, 'error');
            }
            // else if (statusCode === 401) {
            //     const authModel = AuthModel.getInstance();
            //     return await authModel.refreshToken(
            //         this.app,
            //         () => this.handleRequestResponse.call(this,
            //             fetchAPIOptions,
            //             data,
            //             handlers,
            //             actionName)
            //     );
            // }
            // else if (statusCode === 403) {
            //     showMessage(`Sorry, you do not have permission to ${actionName} the ${this.entityName}`, 'error');
            // }
            // else if (statusCode === 404) {
            //     showMessage(`We couldn't find the ${this.entityName}`, 'error');
            // }
            // else if (statusCode === 422) {
            //     result.errorFields = response.data.errorFields;
            //     showMessage('Something went wrong. Invalid request body', 'error');
            // }
            else {
                showMessage('Operation failed. Please try again', 'error');
            }
        }
        catch (e) {
            showMessage(e, 'error');
        }

        return result;
    }
}
