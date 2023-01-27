const { body } = require('express-validator');

exports.safetyCardValidationRule = () => {
    return [
        body('project')
            .isString()
            .notEmpty()
            .withMessage('Please select valid project name.'),
        body('site')
            .isString()
            .notEmpty()
            .withMessage('Please select valid project site.'),
        body('location')
            .isString()
            .notEmpty()
            .withMessage('please select valid project location.'),
        body('savingRule')
            .isString()
            .notEmpty()
            .withMessage('please select valid saving rule.'),
        body('description')
            .isString()
            .notEmpty()
            .withMessage('please enter description.')
    ];
};
