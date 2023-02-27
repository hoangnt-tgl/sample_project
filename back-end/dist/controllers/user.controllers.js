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
exports.cookie = exports.getSearchUserByIdController = exports.getQueryUserController = exports.uploadUserImageController = exports.logoutController = exports.updateUserController = exports.createUserController = void 0;
const user_services_1 = require("../services/user.services");
const model_services_1 = require("../services/model.services");
const user_model_1 = __importDefault(require("../models/user.model"));
const model_services_2 = require("../services/model.services");
const formidable_1 = __importDefault(require("formidable"));
const uploadFile_service_1 = require("../services/uploadFile.service");
const response_constants_1 = require("../constant/response.constants");
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { userAddress, signature } = req.body;
        userAddress = userAddress.toLowerCase();
        const user = yield (0, model_services_2.createService)(user_model_1.default, { userAddress });
        return res.status(200).json({ data: user });
    }
    catch (error) {
        return res.status(403).json({ error: response_constants_1.ERROR_RESPONSE[403] });
    }
});
exports.createUserController = createUserController;
const cookie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield res.cookie('signature', "Done", { domain: 'http://192.168.0.128:3001', path: '/', httpOnly: true, expires: new Date(Date.now() + 3600000) });
    return res.status(200).json("Done");
});
exports.cookie = cookie;
const uploadUserImageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const form = (0, formidable_1.default)();
        const result = yield (0, uploadFile_service_1.handlePromiseUpload)(form, req, "users");
        return res.status(200).json({ data: result });
    }
    catch (error) {
        return res.status(500).json({ error: response_constants_1.ERROR_RESPONSE[500] });
    }
});
exports.uploadUserImageController = uploadUserImageController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userAddress = req.params.userAddress;
    const { avatar, background, username, email, social, bio } = req.body;
    const avatarURL = avatar.result;
    const backgroundURL = background.result;
    try {
        const user = yield (0, user_services_1.updateUserService)(userAddress, avatarURL, backgroundURL, username, email, social, bio);
        return res.status(200).json({ data: user });
    }
    catch (error) { }
    return res.status(500).json({ error: response_constants_1.ERROR_RESPONSE[403] });
});
exports.updateUserController = updateUserController;
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userAddress } = req.body;
        const user = yield (0, model_services_1.findOneService)(user_model_1.default, { userAddress });
        if (user.signature) {
            yield (0, model_services_1.updateOneService)(user_model_1.default, { userAddress }, { signature: "" });
        }
        return res.status(200).json({ message: "Logout successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: response_constants_1.ERROR_RESPONSE[500] });
    }
});
exports.logoutController = logoutController;
const getQueryUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageSize, pageId } = req.params;
    try {
        const textSearch = req.body.text;
        const sort = req.body.sort;
        const users = yield (0, user_services_1.getManyUserService)(textSearch, sort, parseInt(pageSize), parseInt(pageId));
        if (users)
            res.status(200).json(users);
        else
            res.status(403).json({ message: response_constants_1.ERROR_RESPONSE[403] });
    }
    catch (error) {
        return res.status(500).json({ error: response_constants_1.ERROR_RESPONSE[500] });
    }
});
exports.getQueryUserController = getQueryUserController;
const getSearchUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield (0, user_services_1.getSearchUserByIdService)(userId);
        const response = {
            data: user,
        };
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: response_constants_1.ERROR_RESPONSE[500] });
    }
});
exports.getSearchUserByIdController = getSearchUserByIdController;
