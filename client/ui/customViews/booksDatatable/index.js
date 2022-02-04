const BOOKS_DT_ID = "booksDatatableId";

webix.protoUI(
	{
		name: "booksDatatable",
		$init(config) {},
		_getBooksDt() {
			return this.$$(BOOKS_DT_ID);
		},
	},
	webix.ui.datatable
);
