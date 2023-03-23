/**
* @module CommonConstants
*/
/**
* @constant {object} events - list of global events
*/
const events = {
    app: {
        refreshTokenError: 'app:refreshTokenError',
        appGuard: 'app:guard',
        appLogout: 'app:user:logout',
    }

};

/**
* @constant {object} globalIds - list of global ids
*/
const globalIds = {};

/**
* @constant {object} globalIds - list of global ids
*/
const formInputs = {
    phoneNumberLength: 12
};

export {
    events,
    globalIds,
    formInputs
}
