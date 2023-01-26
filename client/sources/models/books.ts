import BaseModel from "./baseModel";
import { getRequestOptions } from "./fetchApiService";
import IQueryResult from "sources/interfaces/IQueryResult";
import { showMessage } from "./utils";

export default class BooksModel extends BaseModel {
	protected static instance: BooksModel;

    private constructor() {
        super();
        this.entityName = 'books or genres';
    }

    public static getInstance(): BooksModel {
        if (!BooksModel.instance) {
            BooksModel.instance = new BooksModel();
        }

        return BooksModel.instance;
    }

    async getAllBooks() {
        return this.handleRequestResponse(
            getRequestOptions({path: '/books'}),
            '',
            {
                200: (response, result: IQueryResult) => {
                    result.success = true;
                    result.data = response.data;
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
            'get'
        );
    }

    async getBookGenres() {
        return this.handleRequestResponse(
            getRequestOptions({path: '/genres'}),
            '',
            {
                200: (response, result: IQueryResult) => {
                    result.success = true;
                    result.data = response.data;
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
            'get'
        );
    }
}
