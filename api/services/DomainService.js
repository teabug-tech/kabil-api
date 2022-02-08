"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Domain_1 = __importDefault(require("../models/Domain"));
const crud_1 = __importDefault(require("../shared/crud"));
exports.default = (0, crud_1.default)(Domain_1.default);
//# sourceMappingURL=DomainService.js.map