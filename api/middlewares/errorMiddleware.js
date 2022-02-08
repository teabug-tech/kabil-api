"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
const errorController_1 = require("../controllers/errorController");
exports.default = (err, req, res, next) => {
    try {
        if (err instanceof mongodb_1.MongoServerError) {
            if (err.code && err.code == 11000) {
                return (0, errorController_1.handleDuplicateKeyError)(err, res);
            }
        }
        if (err instanceof mongoose_1.Error.ValidationError) {
            return (0, errorController_1.handleValidationError)(err, res);
        }
        return res.status(404).send({ success: false, message: err.message });
    }
    catch (err) {
        return res.status(500).send({ success: false, message: err.message });
    }
};
//# sourceMappingURL=errorMiddleware.js.map