import {stringify} from 'querystring'
import * as fetch from 'isomorphic-fetch'

export interface FxHook<S> {
  (dispatch, getState: () => S, extraArgs: any, response: any): any
}
export interface Transform<S> {
  query?(query: any, getState: () => S): any
}
export interface BaseOption<S> {
  headers?: any
  transform?: Transform<S>
  success?: FxHook<S>
  fail?: FxHook<S>

  condition?(...args): boolean
}
export interface GetOption<S> extends BaseOption<S> {
  query?: any
}

export const GET = <S>(url, actions: Actions, {query, headers, condition, success, fail, transform = {}}: GetOption<S> = {}) => {
  const [pending, ok, err] = actions
  return async (dispatch, getState, extraArgs) => {
    if (condition && !condition(dispatch, getState, extraArgs)) {
      return false
    }
    if (transform.query) {
      query = transform.query(query, getState)
    }
    dispatch({
      type: pending,
      query
    })
    const target = query ? `${url}?${stringify(query)}` : url

    try {
      const response = await fetch(target, {
        method: 'GET',
        headers
      })
      if (response.status >= 400) {
        throw await handleError(response)
      }

      const json    = await response.json()
      const payload = success
        ? success(dispatch, getState, extraArgs, json)
        : json

      dispatch({
        type: ok,
        query,
        payload
      })
      return true
    } catch (error) {
      console.error(err, error)
      dispatch({
        type:  err,
        error: fail ? fail(dispatch, getState, extraArgs, error) : error,
        query,
      })
      return false
    }
  }
}

export interface PostOption<S> extends BaseOption<S> {
  body?: any
}

export const POST = <S>(url, actions: Actions, {body, headers, success, fail}: PostOption<S> = {}) => {
  const [pending, ok, err] = actions

  return async (dispatch, getState, extraArgs) => {
    dispatch({type: pending})
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body:   JSON.stringify(body)
      })
      if (response.status >= 400) {
        throw await handleError(response)
      }
      const json    = await response.json()
      const payload = success
        ? success(dispatch, getState, extraArgs, json)
        : json

      dispatch({
        type: ok,
        body,
        payload
      })
      return true
    } catch (error) {
      dispatch({
        type:  err,
        body,
        error: fail ? fail(dispatch, getState, extraArgs, error) : error
      })
      return false
    }
  }
}

export interface PutOption<S> extends BaseOption<S> {
  body?: any
}

export const PUT = <S>(url, actions: Actions, {headers, body, success}: PutOption<S> = {}) => {
  const [pending, ok, err] = actions

  return async (dispatch, getState, extraArgs) => {
    dispatch({type: pending})
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body:   JSON.stringify(body)
      })
      if (response.status >= 400) {
        throw await handleError(response)
      }
      const json    = await response.json()
      const payload = success
        ? success(dispatch, getState, extraArgs, json)
        : json

      dispatch({
        type: ok,
        payload
      })
      return true
    } catch (error) {
      dispatch({
        type: err,
        error
      })
      return false
    }
  }
}

export interface PatchOption<S> extends BaseOption<S> {
  body?: any
}

export const PATCH = <S>(url, actions: Actions, {headers, body, success, fail}: PatchOption<S> = {}) => {
  const [pending, ok, err] = actions

  return async (dispatch, getState, extraArgs) => {
    dispatch({type: pending})
    try {
      const response = await fetch(url, {
        headers,
        method: 'PATCH',
        body:   JSON.stringify(body)
      })
      if (response.status >= 400) {
        throw await handleError(response)
      }
      const json    = await response.json()
      const payload = success
        ? success(dispatch, getState, extraArgs, json)
        : json

      dispatch({
        type: ok,
        payload
      })
      return true
    } catch (error) {
      dispatch({
        type:  err,
        error: fail ? fail(dispatch, getState, extraArgs, error) : error
      })
      return false
    }
  }
}

export interface PatchOption<S> extends BaseOption<S> {
  query?: any
}

export const DELETE = <S>(url, actions: string[], {headers, query}: PatchOption<S> = {}) => {
  const [pending, ok, err] = actions

  return async (dispatch, getState) => {
    dispatch({
      type: pending,
      query
    })
    const target = query ? `${url}?${stringify(query)}` : url

    try {
      const response = await fetch(target, {
        headers,
        method: 'DELETE',
      })
      if (response.status >= 400) {
        throw await handleError(response)
      }

      dispatch({
        type:    ok,
        payload: response.json(),
        query,
      })
      return true
    } catch (error) {
      dispatch({
        type: err,
        query,
        error
      })
      return false
    }
  }
}

const handleError = async response => {
  const message = await response.json()
  return new Error(JSON.stringify({
    code: response.status,
    message
  }))
}

type Actions = [string, string, string]
