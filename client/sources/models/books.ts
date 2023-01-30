import BaseModel from "./baseModel";
import { getRequestOptions } from "./fetchApiService";
import IQueryResult from "sources/interfaces/IQueryResult";
import { showMessage } from "./utils";

interface Genre {
    id_genre: number,
    name: string
}

interface Book {
    id_book: number,
    author: string,
    book_title: string,
    genres: string,
    year_of_publishing: number,
    publishing_house: string,
    number_of_pages: number,
    number_of_available_copies: number,
    first_name: string,
    last_name: string,
    cover_photo: string,
    country_of_publication: string,
    book_file: string,
    audio_recording: string       
}

export default class BooksModel extends BaseModel {
	protected static instance: BooksModel;
    private genres: Genre[];
    private booksData: Book[];

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
                    this.booksData = this.modifyBooksData(response.data);
                    result.data = this.booksData;
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

    public setGenresData(data: Genre[]) {
        this.genres = data;
    }

    public getGenresData(): Genre[] {
        return this.genres;
    }

    public getBooksData(): Book[] {
        return this.booksData;
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

    private modifyBooksData(books: Book[]): Book[] {
        if (this.genres) {
            return books.map((book) => {
                book.genres = book.genres.split(',').map((genreId) => {
                    return this.genres.find(genre => genre.id_genre === Number(genreId)).name;
                }).join(', ');

                return book;
            });
        }
        else return books;
    }
}
