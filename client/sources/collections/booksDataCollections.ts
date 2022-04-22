import constants from "../constants";

const booksCollection = new webix.DataCollection({
	url: () => fetch(`${constants.URLs.SERVER}books`, {
		method: "GET",
		// mode: 'no-cors', // no-cors, *cors, same-origin
		credentials: "include", // omit, same-origin*
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(res => res.json())
	// save: `rest->${constants.URLs.SERVER}books`
	// scheme: {
	// 	$init(obj) {
	// 	}
	// }
});

export default booksCollection;
