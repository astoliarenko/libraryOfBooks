export default {
	admin: {
		name: "admin",
		views: [
			{id: "users", value: "Users", isDefaultPage: true},
			{id: "edit", value: "Edit"}
		]
	},
	librarian: {
		name: "librarian",
		views: [
			{id: "books", value: "Books", isDefaultPage: true},
			{id: "users", value: "Users"}
		]
	},
	reader: {
		name: "reader",
		views: [
			{id: "orderBook", value: "Order book", isDefaultPage: true},
			{id: "cancelOrder", value: "Cancel order"},
			{id: "profile", value: "Profile"}
		]
	},
};
