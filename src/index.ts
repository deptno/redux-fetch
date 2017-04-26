import {stringify} from 'querystring';
import * as fetch from 'isomorphic-fetch';

let headers = {'Content-Type': 'application/json'};

const handleError = async response => {
    const message = await response.json();
    return new Error(JSON.stringify({code: response.status, message}));
};
const defaultHook = res => res;

export const updateHeader = async () => {
    try {
        headers = await getHeaders(headers);
    } catch (ex) {}
};

export let getHeaders = async headers => headers;

export const GET = ((cache) =>
    (args: GetArguments) => {
        const {url, query, actions, useLatest = false, okHook = defaultHook, failHook = defaultHook} = args;
        const [pending, ok, err] = actions;

        return async (dispatch, getState?) => {
            dispatch({type: pending, query});
            const target = query ? `${url}?${stringify(query)}` : url;

            if (useLatest) {
                cache[url] = {query};
            }
            try {
                await updateHeader();
                const response = await fetch(target, {method: 'GET', headers});
                if (response.status >= 400) {
                    throw await handleError(response);
                }
                const payload = okHook(await response.json());

                if (useLatest) {
                    if (cache[url] && cache[url].query === query) {
                        delete cache[url];
                    } else {
                        return false;
                    }
                }

                if (Array.isArray(ok)) {
                    ok.map(type => dispatch({type, query, payload}));
                } else {
                    dispatch({type: ok, query, payload});
                }
                return true;
            } catch(error) {
                console.error(err, error);
                dispatch({type: err, query, error: failHook(error)});
                return false;
            }
        }
    }
)({});
export const POST = ({url, actions, body, okHook = defaultHook, failHook = defaultHook}) => {
    const [pending, ok, err] = actions;

    return async (dispatch, getState?) => {
        dispatch({type: pending});
        try {
            await updateHeader();
            const response = await fetch(url, {method: 'POST', headers, body: JSON.stringify(body)});
            if (response.status >= 400) {
                throw await handleError(response);
            }
            const payload = okHook(await response.json());
            if (Array.isArray(ok)) {
                ok.map(type => dispatch({type, payload}));
            } else {
                dispatch({type: ok, payload});
            }
            return true;
        } catch(error) {
            dispatch({type: err, body, error: failHook(error)});
            return false;
        }
    }
};
export const PUT = ({url, actions, body, okHook = defaultHook, failHook = defaultHook}) => {
    const [pending, ok, err] = actions;

    return async (dispatch, getState?) => {
        dispatch({type: pending});
        try {
            await updateHeader();
            const response = await fetch(url, {method: 'PUT', headers, body: JSON.stringify(body)});
            if (response.status >= 400) {
                throw await handleError(response);
            }
            const payload = okHook(await response.json());
            if (Array.isArray(ok)) {
                ok.map(type => dispatch({type, payload}));
            } else {
                dispatch({type: ok, payload});
            }
        } catch(error) {
            dispatch({type: err, error: failHook(error)});
        }
    }
};
export const PATCH = ({url, actions, body, okHook = defaultHook, failHook = defaultHook}) => {
    const [pending, ok, err] = actions;

    return async (dispatch, getState?) => {
        dispatch({type: pending});
        try {
            await updateHeader();
            const response = await fetch(url, {method: 'PATCH', headers, body: JSON.stringify(body)});
            if (response.status >= 400) {
                throw await handleError(response);
            }
            const payload = okHook(await response.json());
            if (Array.isArray(ok)) {
                ok.map(type => dispatch({type, payload}));
            } else {
                dispatch({type: ok, payload});
            }
        } catch(error) {
            dispatch({type: err, error: failHook(error)});
        }
    }
};
export const DELETE = ({url, actions, okHook = defaultHook, failHook = defaultHook}) => {
    const [pending, ok, err] = actions;

    return async (dispatch, getState?) => {
        dispatch({type: pending});
        try {
            const response = await fetch(url, {method: 'DELETE', headers});
            if (response.status >= 400) {
                throw await handleError(response);
            }
            const payload = okHook(await response.json());
            dispatch({type: ok, payload});
        } catch(error) {
            dispatch({type: err, error: failHook(error)});
        }
    }
};