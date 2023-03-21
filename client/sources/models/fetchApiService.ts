import IPostRequestOptions from './IFetchApiService';
import { IJetApp } from 'webix-jet';

interface IFetchOptions {
    method: string, headers: {string: string}, mode: RequestMode, body?: string, credentials?: RequestCredentials
}

interface IReqOptions {
    path: string, body?: any
}

export const getRequestOptions = ({path}) => ({
    path,
    method: 'GET'
});

export const deleteRequestOptions = (reqOptions: IReqOptions) => {
    const options: {path: string, method: string, body?: any} = {
        path: reqOptions.path,
        method: 'DELETE'
    };

    if (reqOptions?.body) options.body = JSON.stringify(reqOptions.body);

    return options;
};

export const putRequestOptions = ({path, body}) => ({
    path,
    body: JSON.stringify(body),
    method: 'PUT'
});

export const patchRequestOptions = ({path, body}, isFormData: boolean = false) => ({
    path,
    body: isFormData ? body : JSON.stringify(body),
    method: 'PATCH',
    formData: isFormData
});

export const postRequestOptions = ({path, body}, isFormData: boolean = false) => {
    const options : IPostRequestOptions = {
        path,
        body: isFormData ? body : JSON.stringify(body),
        method: 'POST',
        formData: isFormData
    };

    return options;
};

export default function fetchApiService(app: IJetApp): void {
    const service = {
        getAPIUrl(): string {
            // return `http/api`;
            return "http://localhost:3500/";
        },
        async fetchAPI(options): Promise<{data?: any, statusCode: number}> {
            let header;
            let body;
            const queryMethod = options.method;

            if (['POST', 'PATCH', 'PUT'].includes(queryMethod)
            || (queryMethod === 'DELETE' && (options?.body || options?.formData))) {
                if (!options.formData) {
                    header = {
                        'Content-Type': 'application/json'
                    };
                }
                body = options.body;
            }

            let fetchOptions: IFetchOptions = {
                method: queryMethod,
                headers: header,
                mode: 'cors',
                credentials: 'include', // omit, same-origin*
            };

            if (body) {
                fetchOptions.body = body;
            }

            const response = await fetch(this.getAPIUrl() +
                options.path, fetchOptions);
            const textResponse = await response.text();
            if (!textResponse) {
                return {statusCode: response.status};
            }
            const resultData = JSON.parse(textResponse);
            return {data: resultData, statusCode: response.status};
        }
    };
    app.setService('fetchAPI', service);
}
