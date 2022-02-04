async function getListData(config, jetApp) {
	await delay(LOAD_LIST_DATA_DELAY);
	const { actionType = GET_DATA_REQ_TYPE.INIT } = config;
	const listData = {
		...clientsScreenData.listData,
	};
	const {
		columnDefinition,
		contextMenuConfig,
		toolbarConfig,
		datatableConfig,
		pagerConfig,
		filter: filterData,
	} = clientsScreenData;

	return await getListDataByType(
		{
			columnDefinition,
			contextMenuConfig,
			toolbarConfig,
			datatableConfig,
			pagerConfig,
			filterData,
			actionType,
			listData,
			topToolbarConfig: getTopToolbarConfig(jetApp),
		},
		jetApp
	);
}

export default function getLibrarianService() {
	const jetApp = this;

	return {
		getListData(config) {
			return getListData(config, jetApp);
		},
	};
}
