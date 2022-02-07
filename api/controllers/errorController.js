"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = exports.handleDuplicateKeyError = void 0;
// import { Error } from 'mongoose';
const handleDuplicateKeyError = (err, res) => {
    const field = Object.keys(err.keyValue);
    const code = 409;
    const error = `The field ${field} already exists.`;
    res.status(code).json({ success: false, message: error, fields: field });
};
exports.handleDuplicateKeyError = handleDuplicateKeyError;
const handleValidationError = (err, res) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const fields = Object.values(err.errors).map((el) => el.path);
    const code = 400;
    if (errors.length > 1) {
        const formattedErrors = errors.join(' ');
        res.status(code).json({ success: false, message: formattedErrors, fields: fields });
    }
    else {
        res.status(code).json({ success: false, message: errors[0], fields: fields });
    }
};
exports.handleValidationError = handleValidationError;
//# sourceMappingURL=errorController.js.map