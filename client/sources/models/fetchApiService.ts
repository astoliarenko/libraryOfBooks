import IPostRequestOptions from './IFetchApiService';

interface IFetchOptions {
    method: string, headers: {string: string}, mode: RequestMode, body?: string
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

export default function fetchApiService(app) {
    const service = {
        getAPIUrl(): string {
            return `http/api`;
        },
        async fetchAPI(options, subdomain?) {
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

            // only for registration page - skip middleware
            if (app.getUrl()[0]?.page === 'registrationCompany') {
                options.path += '?forRegistration=1';
            }

            let fetchOptions:IFetchOptions = {
                method: queryMethod,
                headers: header,
                mode: 'cors'
            };

            if (body) {
                fetchOptions.body = body;
            }

            const response = await fetch(this.getAPIUrl(subdomain) +
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
