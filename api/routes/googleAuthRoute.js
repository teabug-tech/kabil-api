"use strict";
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
const google_auth_library_1 = require("google-auth-library");
const UserService_1 = __importDefault(require("../services/UserService"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const googleAuthRouter = (0, express_1.Router)();
function verify(idToken, audience) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new google_auth_library_1.OAuth2Client(audience);
        const ticket = yield client.verifyIdToken({
            idToken,
            audience, // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        return payload;
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
    });
}
googleAuthRouter.post('/google', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.body.token;
        const clientId = req.body.clientId;
        const payload = yield verify(token, clientId);
        const user = yield UserService_1.default.getOneAndPopulate({ email: payload.email })(['dialect'])()();
        if (!user)
            throw new Error('User does not exist');
        const jwtToken = jsonwebtoken_1.default.sign(Object.assign({}, user), process.env.JWT_SECRET);
        res.cookie('JWT', jwtToken, { sameSite: 'none', secure: false });
        res.status(200).json({ success: true, message: { user, token: jwtToken } });
    }
    catch (e) {
        next(e);
    }
}));
exports.default = googleAuthRouter;
//# sourceMappingURL=googleAuthRoute.js.map