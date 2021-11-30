const books = new webix.DataCollection({
	data: [
		{
			book_id: 1,
			book_title: "Mein Kampf",
			book_file: "19948899",
			year_of_publishing: 1999,
			genres: "comedy",
			author: "",
			country_of_publication: "",
			cover_photo: "",
			number_of_available_copies: "",
			number_of_pages: "",
			publishing_house: "",
			audio_recording: ""
		},
		{
			book_id: 2,
			book_title: "Witcher",
			book_file: "19948899",
			year_of_publishing: 1999,
			genres: "roman",
			author: "",
			country_of_publication: "",
			cover_photo: "",
			number_of_available_copies: "",
			number_of_pages: "",
			publishing_house: "",
			audio_recording: ""
		}
	]
});

export default books;

// import constants from "../constants";

// const booksCollection = new webix.DataCollection({
// 	url: "http://localhost:3500/books/",
// 	save: "rest->http://localhost:3500/books",
// 	scheme: {
// 		$init(obj) {
// 		}
// 	}
// });

// export default booksCollection;
