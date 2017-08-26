"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var querystring_1 = require("querystring");
var fetch = require("isomorphic-fetch");
var handleError = function (response) { return __awaiter(_this, void 0, void 0, function () {
    var message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, response.json()];
            case 1:
                message = _a.sent();
                return [2 /*return*/, new Error(JSON.stringify({
                        code: response.status,
                        message: message
                    }))];
        }
    });
}); };
exports.GET = function (url, actions, _a) {
    var _b = _a === void 0 ? {} : _a, query = _b.query, headers = _b.headers, condition = _b.condition, success = _b.success, fail = _b.fail, _c = _b.transform, transform = _c === void 0 ? {} : _c;
    var pending = actions[0], ok = actions[1], err = actions[2];
    return function (dispatch, getState, extraArgs) { return __awaiter(_this, void 0, void 0, function () {
        var target, response, json, payload, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (condition && !condition(dispatch, getState, extraArgs)) {
                        return [2 /*return*/, false];
                    }
                    if (transform.query) {
                        query = transform.query(query, getState);
                    }
                    dispatch({
                        type: pending,
                        query: query
                    });
                    target = query ? url + "?" + querystring_1.stringify(query) : url;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch(target, {
                            method: 'GET',
                            headers: headers
                        })];
                case 2:
                    response = _a.sent();
                    if (!(response.status >= 400)) return [3 /*break*/, 4];
                    return [4 /*yield*/, handleError(response)];
                case 3: throw _a.sent();
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    json = _a.sent();
                    payload = success
                        ? success(dispatch, getState, extraArgs, json)
                        : json;
                    dispatch({
                        type: ok,
                        query: query,
                        payload: payload
                    });
                    return [2 /*return*/, true];
                case 6:
                    error_1 = _a.sent();
                    console.error(err, error_1);
                    dispatch({
                        type: err,
                        error: fail ? fail(dispatch, getState, extraArgs, error_1) : error_1,
                        query: query,
                    });
                    return [2 /*return*/, false];
                case 7: return [2 /*return*/];
            }
        });
    }); };
};
exports.POST = function (url, actions, _a) {
    var _b = _a === void 0 ? {} : _a, body = _b.body, headers = _b.headers, success = _b.success, fail = _b.fail;
    var pending = actions[0], ok = actions[1], err = actions[2];
    return function (dispatch, getState, extraArgs) { return __awaiter(_this, void 0, void 0, function () {
        var response, json, payload, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatch({ type: pending });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch(url, {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify(body)
                        })];
                case 2:
                    response = _a.sent();
                    if (!(response.status >= 400)) return [3 /*break*/, 4];
                    return [4 /*yield*/, handleError(response)];
                case 3: throw _a.sent();
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    json = _a.sent();
                    payload = success
                        ? success(dispatch, getState, extraArgs, json)
                        : json;
                    dispatch({
                        type: ok,
                        body: body,
                        payload: payload
                    });
                    return [2 /*return*/, true];
                case 6:
                    error_2 = _a.sent();
                    dispatch({
                        type: err,
                        body: body,
                        error: fail ? fail(dispatch, getState, extraArgs, error_2) : error_2
                    });
                    return [2 /*return*/, false];
                case 7: return [2 /*return*/];
            }
        });
    }); };
};
exports.PUT = function (url, actions, _a) {
    var _b = _a === void 0 ? {} : _a, headers = _b.headers, body = _b.body, success = _b.success;
    var pending = actions[0], ok = actions[1], err = actions[2];
    return function (dispatch, getState, extraArgs) { return __awaiter(_this, void 0, void 0, function () {
        var response, json, payload, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatch({ type: pending });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch(url, {
                            method: 'PUT',
                            headers: headers,
                            body: JSON.stringify(body)
                        })];
                case 2:
                    response = _a.sent();
                    if (!(response.status >= 400)) return [3 /*break*/, 4];
                    return [4 /*yield*/, handleError(response)];
                case 3: throw _a.sent();
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    json = _a.sent();
                    payload = success
                        ? success(dispatch, getState, extraArgs, json)
                        : json;
                    dispatch({
                        type: ok,
                        payload: payload
                    });
                    return [2 /*return*/, true];
                case 6:
                    error_3 = _a.sent();
                    dispatch({
                        type: err,
                        error: error_3
                    });
                    return [2 /*return*/, false];
                case 7: return [2 /*return*/];
            }
        });
    }); };
};
exports.PATCH = function (url, actions, _a) {
    var _b = _a === void 0 ? {} : _a, headers = _b.headers, body = _b.body, success = _b.success, fail = _b.fail;
    var pending = actions[0], ok = actions[1], err = actions[2];
    return function (dispatch, getState, extraArgs) { return __awaiter(_this, void 0, void 0, function () {
        var response, json, payload, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatch({ type: pending });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch(url, {
                            headers: headers,
                            method: 'PATCH',
                            body: JSON.stringify(body)
                        })];
                case 2:
                    response = _a.sent();
                    if (!(response.status >= 400)) return [3 /*break*/, 4];
                    return [4 /*yield*/, handleError(response)];
                case 3: throw _a.sent();
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    json = _a.sent();
                    payload = success
                        ? success(dispatch, getState, extraArgs, json)
                        : json;
                    dispatch({
                        type: ok,
                        payload: payload
                    });
                    return [2 /*return*/, true];
                case 6:
                    error_4 = _a.sent();
                    dispatch({
                        type: err,
                        error: fail ? fail(dispatch, getState, extraArgs, error_4) : error_4
                    });
                    return [2 /*return*/, false];
                case 7: return [2 /*return*/];
            }
        });
    }); };
};
exports.DELETE = function (url, actions, _a) {
    var _b = _a === void 0 ? {} : _a, headers = _b.headers, query = _b.query;
    var pending = actions[0], ok = actions[1], err = actions[2];
    return function (dispatch, getState) { return __awaiter(_this, void 0, void 0, function () {
        var target, response, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatch({
                        type: pending,
                        query: query
                    });
                    target = query ? url + "?" + querystring_1.stringify(query) : url;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, fetch(target, {
                            headers: headers,
                            method: 'DELETE',
                        })];
                case 2:
                    response = _a.sent();
                    if (!(response.status >= 400)) return [3 /*break*/, 4];
                    return [4 /*yield*/, handleError(response)];
                case 3: throw _a.sent();
                case 4:
                    dispatch({
                        type: ok,
                        payload: response.json(),
                        query: query,
                    });
                    return [2 /*return*/, true];
                case 5:
                    error_5 = _a.sent();
                    dispatch({
                        type: err,
                        query: query,
                        error: error_5
                    });
                    return [2 /*return*/, false];
                case 6: return [2 /*return*/];
            }
        });
    }); };
};
//# sourceMappingURL=index.js.map