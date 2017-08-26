export interface FxHook<S> {
    (dispatch: any, getState: () => S, extraArgs: any, response: any): any;
}
export interface Transform<S> {
    query?(query: any, getState: () => S): any;
}
export interface BaseOption<S> {
    headers?: any;
    transform?: Transform<S>;
    success?: FxHook<S>;
    fail?: FxHook<S>;
    condition?(...args: any[]): boolean;
}
export interface GetOption<S> extends BaseOption<S> {
    query?: any;
}
export declare const GET: <S>(url: any, actions: [string, string, string], {query, headers, condition, success, fail, transform}?: GetOption<S>) => (dispatch: any, getState: any, extraArgs: any) => Promise<boolean>;
export interface PostOption<S> extends BaseOption<S> {
    body?: any;
}
export declare const POST: <S>(url: any, actions: [string, string, string], {body, headers, success, fail}?: PostOption<S>) => (dispatch: any, getState: any, extraArgs: any) => Promise<boolean>;
export interface PutOption<S> extends BaseOption<S> {
    body?: any;
}
export declare const PUT: <S>(url: any, actions: [string, string, string], {headers, body, success}?: PutOption<S>) => (dispatch: any, getState: any, extraArgs: any) => Promise<boolean>;
export interface PatchOption<S> extends BaseOption<S> {
    body?: any;
}
export declare const PATCH: <S>(url: any, actions: [string, string, string], {headers, body, success, fail}?: PatchOption<S>) => (dispatch: any, getState: any, extraArgs: any) => Promise<boolean>;
export interface PatchOption<S> extends BaseOption<S> {
    query?: any;
}
export declare const DELETE: <S>(url: any, actions: string[], {headers, query}?: PatchOption<S>) => (dispatch: any, getState: any) => Promise<boolean>;
