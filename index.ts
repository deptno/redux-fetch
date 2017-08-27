import {stringify} from 'querystring'
import * as fetch from 'isomorphic-fetch'

export interface FxHook<S> {
  (dispatch, getState: () => S, extraArgs: any, response: any): any
}
export interface Transform<S> {
  query?(query: any, getState: () => S): any
  body?(body: any, getState: () => S): any
}
export interface BaseOption<S> {
  headers?: any
  transform?: Transform<S>
  success?: FxHook<S>
  fail?: FxHook<S>

  condition?(...args): boolean
}

export type Actions = [string, string, string]
export interface ReduxFetchAction {
  type: string
  query?: any
  body?: any
  error?: Error
  payload?: any
}
export interface GetOption<S> extends BaseOption<S> {
  query?: any
}
export interface PostOption<S> extends BaseOption<S> {
  body?: any
}
export interface PutOption<S> extends BaseOption<S> {
  body?: any
}
export interface PatchOption<S> extends BaseOption<S> {
  body?: any
}
export interface DeleteOption<S> extends BaseOption<S> {
  query?: any
}

export function GET<S>(url, actions: Actions, a: GetOption<S> = {}) {
  return common(url, actions, {...a, method: 'GET'} as any)
}
export function POST<S>(url, actions: Actions, a: GetOption<S> = {}) {
  return common(url, actions, {...a, method: 'POST'} as any)
}
export function PUT<S>(url, actions: Actions, a: GetOption<S> = {}) {
  return common(url, actions, {...a, method: 'PUT'} as any)
}
export function PATCH<S>(url, actions: Actions, a: GetOption<S> = {}) {
  return common(url, actions, {...a, method: 'PATCH'} as any)
}
export function DELETE<S>(url, actions: Actions, a: GetOption<S> = {}) {
  return common(url, actions, {...a, method: 'DELETE'} as any)
}

interface RequestParam {
  query?: any
  body?: any
}

function _transform<S>(getState: () => S, params: RequestParam, transformer: Transform<S>) {
  const ret = {}
  for (let key in transformer) {
    ret[key] = transformer[key](params[key])
  }
  return ret as any
}

function common<S>(url, actions: Actions, a: BaseOption<S> & { method: string, query: any, body: any } = {} as any) {
  const [pending, ok, err]                                                     = actions
  let {method, query, body, headers, condition, success, fail, transform = {}} = a

  return async (dispatch, getState, extraArgs) => {
    if (condition && !condition(dispatch, getState, extraArgs)) {
      return false
    }

    const {query, body} = _transform(getState, {query: a.query, body: a.body}, transform)
    //todo: dispatch reuqest
    dispatch({type: pending, query})
    try {
      const target     = query ? `${url}?${stringify(query)}` : url
      const param: any = {method, headers}

      if (body) {
        param.body = JSON.stringify(body)
      }

      const response = await fetch(target, param)

      if (response.status >= 400) {
        throw await handleError(response)
      }

      const json    = await response.json()
      const payload = success
        ? success(dispatch, getState, extraArgs, json)
        : json

      //todo: dispatch success
      dispatch({type: ok, query, body, payload})
      return true
    } catch (error) {
      console.error(err, error)
      //todo: dispatch fail
      dispatch({
        type:  err,
        error: fail ? fail(dispatch, getState, extraArgs, error) : error,
        query,
        body
      })
      return false
    }
  }
}
async function handleError(response) {
  return new Error(JSON.stringify({
    code:    response.status,
    message: await response.json()
  }))
}

