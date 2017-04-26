import {GET, POST, PUT, DELETE} from './';
import * as nock from 'nock';

const url = 'https://bglee.com';
const PREFIX = {PENDING: 'pending', OK: 'ok', ERR: 'err'};
const createAsyncAction = actionName => ([
    [PREFIX.PENDING, actionName].join('_'),
    [PREFIX.OK, actionName].join('_'),
    [PREFIX.ERR, actionName].join('_')
]);
const checkDispatchedAction = (result, index = 0) => action => expect(action.type).toEqual(result[index++]);
const defineErrorQuery = code => nock(url).get(`/error/${code}`).replyWithError({code, message: code});

describe('internal function', () => {
    it('check validation', () => {
        const [pending, ok, err] = createAsyncAction('test_action');

        expect(pending).toEqual('pending_test_action');
        expect(ok).toEqual('ok_test_action');
        expect(err).toEqual('err_test_action');
    });
});
describe('action test', () => {
    beforeEach(() => {
        nock(url).get('/').reply(200, {});
        defineErrorQuery(400);
    });
    afterEach(() => nock.cleanAll());

    it('get ok', done => {
        const actions = createAsyncAction('test');

        GET({url, actions})(checkDispatchedAction(actions)).then(done);
    });
    it('get error', done => {
        const actions = createAsyncAction('test');
        GET({url: `${url}/error/400`, actions})(checkDispatchedAction([actions[0], actions[2]])).then(done);
    });
});
