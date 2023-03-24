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
* @constant {object} formInputs - details of inputs
*/
const formInputs = {
    phoneNumberLength: 12
};

/**
* @constant {object} formInputNames - input names
*/
const formInputNames = {
    userInfo: {
        firstName: 'first_name',
        secondName: 'last_name',
        thirdName: 'third_name',
        passportNumber: 'passport_number',
        birthDate: 'birthday',
        address: 'address',
        login: 'login',
        password: 'password',
        phone1: 'phone_1',
        phone2: 'phone_2',
        phone3: 'phone_3',
        phone4: 'phone_4',
        cardId: 'card_id'
    }
};

export {
    events,
    globalIds,
    formInputs,
    formInputNames
}
