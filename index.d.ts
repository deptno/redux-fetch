export interface FxHook<S> {
    (dispatch: any, getState: () => S, extraArgs: any, response: any): any;
}
export interface Transform<S> {
    query?(query: any, getState: () => S): any;
    body?(body: any, getState: () => S): any;
}
export interface BaseOption<S> {
    headers?: (getState) => any | any;
    transform?: Transform<S>;
    success?: FxHook<S>;
    fail?: FxHook<S>;
    condition?(...args: any[]): boolean;
}
export declare type Actions = [string, string, string];
export interface ReduxFetchAction<T> {
    type: string;
    query?: any;
    body?: any;
    error?: Error;
    payload?: T;
}
export interface GetOption<S> extends BaseOption<S> {
    query?: any;
}
export interface PostOption<S> extends BaseOption<S> {
    body?: any;
}
export interface PutOption<S> extends BaseOption<S> {
    body?: any;
}
export interface PatchOption<S> extends BaseOption<S> {
    body?: any;
}
export interface DeleteOption<S> extends BaseOption<S> {
    query?: any;
}
export declare function GET<S>(url: any, actions: Actions, a?: GetOption<S>): (dispatch: any, getState: any, extraArgs: any) => Promise<boolean>;
export declare function POST<S>(url: any, actions: Actions, a?: PostOption<S>): (dispatch: any, getState: any, extraArgs: any) => Promise<boolean>;
export declare function PUT<S>(url: any, actions: Actions, a?: PutOption<S>): (dispatch: any, getState: any, extraArgs: any) => Promise<boolean>;
export declare function PATCH<S>(url: any, actions: Actions, a?: PatchOption<S>): (dispatch: any, getState: any, extraArgs: any) => Promise<boolean>;
export declare function DELETE<S>(url: any, actions: Actions, a?: DeleteOption<S>): (dispatch: any, getState: any, extraArgs: any) => Promise<boolean>;
