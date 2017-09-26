"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var querystring_1 = require("querystring");
var fetch = require("isomorphic-fetch");
function GET(url, actions, a) {
    if (a === void 0) { a = {}; }
    return common(url, actions, __assign({}, a, { method: 'GET' }));
}
exports.GET = GET;
function POST(url, actions, a) {
    if (a === void 0) { a = {}; }
    return common(url, actions, __assign({}, a, { method: 'POST' }));
}
exports.POST = POST;
function PUT(url, actions, a) {
    if (a === void 0) { a = {}; }
    return common(url, actions, __assign({}, a, { method: 'PUT' }));
}
exports.PUT = PUT;
function PATCH(url, actions, a) {
    if (a === void 0) { a = {}; }
    return common(url, actions, __assign({}, a, { method: 'PATCH' }));
}
exports.PATCH = PATCH;
function DELETE(url, actions, a) {
    if (a === void 0) { a = {}; }
    return common(url, actions, __assign({}, a, { method: 'DELETE' }));
}
exports.DELETE = DELETE;
function _transform(getState, params, transformer) {
    var ret = {};
    for (var key in transformer) {
        ret[key] = transformer[key](params[key]);
    }
    return ret;
}
function common(url, actions, a) {
    var _this = this;
    if (a === void 0) { a = {}; }
    var pending = actions[0], ok = actions[1], err = actions[2];
    var method = a.method, query = a.query, body = a.body, headers = a.headers, condition = a.condition, success = a.success, fail = a.fail, transform = a.transform;
    return function (dispatch, getState, extraArgs) { return __awaiter(_this, void 0, void 0, function () {
        var originalParam, _a, query, body, target, param, response, json, payload, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (condition && !condition(dispatch, getState, extraArgs)) {
                        return [2 /*return*/, false];
                    }
                    originalParam = { query: a.query, body: a.body };
                    _a = transform
                        ? _transform(getState, originalParam, transform)
                        : originalParam, query = _a.query, body = _a.body;
                    dispatch({ type: pending, query: query });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    target = query ? url + "?" + querystring_1.stringify(query) : url;
                    param = {
                        method: method,
                        headers: typeof headers === 'function' ? headers(getState) : headers
                    };
                    if (body) {
                        param.body = JSON.stringify(body);
                    }
                    return [4 /*yield*/, fetch(target, param)];
                case 2:
                    response = _b.sent();
                    if (!(response.status >= 400)) return [3 /*break*/, 4];
                    return [4 /*yield*/, handleError(response)];
                case 3: throw _b.sent();
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    json = _b.sent();
                    payload = success
                        ? success(dispatch, getState, extraArgs, json)
                        : json;
                    dispatch({ type: ok, query: query, body: body, payload: payload });
                    return [2 /*return*/, true];
                case 6:
                    error_1 = _b.sent();
                    console.error(err, error_1);
                    dispatch({
                        type: err,
                        error: fail ? fail(dispatch, getState, extraArgs, error_1) : error_1,
                        query: query,
                        body: body
                    });
                    return [2 /*return*/, false];
                case 7: return [2 /*return*/];
            }
        });
    }); };
}
function handleError(response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = Error.bind;
                    _c = (_b = JSON).stringify;
                    _d = {
                        code: response.status
                    };
                    return [4 /*yield*/, response.json()];
                case 1: return [2 /*return*/, new (_a.apply(Error, [void 0, _c.apply(_b, [(_d.message = _e.sent(),
                                _d)])]))()];
            }
        });
    });
}
//# sourceMappingURL=index.js.map