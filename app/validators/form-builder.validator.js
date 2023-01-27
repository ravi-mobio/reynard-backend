const { body } = require('express-validator');

exports.formbuilderValidationRule = () => {
    return [
        body('questionHeader')
            .isString()
            .notEmpty()
            .withMessage('Please select valid question header.'),
        body('questionType')
            .isString()
            .notEmpty()
            .withMessage('Please select valid question type.'),
    ];
};