/* eslint-disable no-unused-vars */

/**
 * This file contains types fixes for Webix library
 */

/// <reference path="../libs/codebase/types/webix.global.d.ts" />

declare namespace webix {
	namespace ui {
		interface comboConfig {
			clear?: boolean | string | number; // https://docs.webix.com/api__link__ui.combo_clear_config.html
		}
	}

	function confirm(text:any, type?:string|WebixCallback, callback?:WebixCallback):Promise<any>;
}
