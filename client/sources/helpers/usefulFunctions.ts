function getCookie(name) {
	let cookie = {};

	document.cookie.split(";").forEach((el) => {
		let [k, v] = el.split("=");

		cookie[k.trim()] = v;
	});

	return cookie[name];
}

function wrapInScrollView(
	scrollType: 'x' | 'y' | 'xy'| 'auto',
	body: any,
	isNeedBorders?: boolean
): webix.ui.scrollviewConfig {
	return {
		view: 'scrollview', css: 'custom-scroll-view', borderless: !isNeedBorders, scroll: scrollType, body
	};
}

export {getCookie, wrapInScrollView};
