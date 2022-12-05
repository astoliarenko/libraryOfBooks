// eslint-disable-next-line import/prefer-default-export
export const showMessage = (e, type: 'success' | 'info' | 'error') => webix.message({text: e, type});
