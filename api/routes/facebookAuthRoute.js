"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import * as queryString from 'query-string';
const dotenv = __importStar(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv.config();
const facebookAuthRouter = (0, express_1.Router)();
// const stringifiedParams = queryString.stringify({
//   client_id: process.env.FACEBOOK_CLIENT_ID,
//   redirect_uri: process.env.FACEBOOK_REDIRECT_URL,
//   scope: ['public_profile', ' email'].join(','), // comma seperated string
//   response_type: 'code',
//   auth_type: 'rerequest',
//   display: 'popup',
// });
// const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
function getAccessTokenFromCode(code) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield (0, axios_1.default)({
            url: 'https://graph.facebook.com/v4.0/oauth/access_token',
            method: 'get',
            params: {
                client_id: process.env.FACEBOOK_CLIENT_ID,
                client_secret: process.env.FACEBOOK_CLIENT_SECRET,
                redirect_uri: process.env.FACEBOOK_REDIRECT_URL,
                code,
            },
        });
        return data.access_token;
    });
}
function getFacebookUserData(access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield (0, axios_1.default)({
            url: 'https://graph.facebook.com/me',
            method: 'get',
            params: {
                fields: ['id', 'email', 'first_name', 'last_name'].join(','),
                access_token: access_token,
            },
        });
        return data;
    });
}
facebookAuthRouter.get('/facebook/url', (req, res) => {
    const facebookUrl = `https://www.facebook.com/v12.0/dialog/oauth?
                    client_id=${process.env.FACEBOOK_CLIENT_ID}
                    &redirect_uri=${process.env.FACEBOOK_REDIRECT_URL}`;
    return res.end(facebookUrl);
});
facebookAuthRouter.get('/facebook', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = req.query.code;
        const token = yield getAccessTokenFromCode(code);
        const user = yield getFacebookUserData(token);
        return res.send(user);
    }
    catch (e) {
        next(e);
    }
}));
exports.default = facebookAuthRouter;
//# sourceMappingURL=facebookAuthRoute.js.map