const { noCache } = require('../../middleware/no-cache');

describe('noCache middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            _headers: {},
            set(key, value) {
                this._headers[key] = value;
            },
        };
        next = jest.fn();
    });

    it('should set Cache-Control to no-store', () => {
        noCache(req, res, next);
        expect(res._headers['Cache-Control']).toBe(
            'no-store, no-cache, must-revalidate, proxy-revalidate'
        );
    });

    it('should set Pragma to no-cache', () => {
        noCache(req, res, next);
        expect(res._headers['Pragma']).toBe('no-cache');
    });

    it('should set Expires to 0', () => {
        noCache(req, res, next);
        expect(res._headers['Expires']).toBe('0');
    });

    it('should set Surrogate-Control to no-store', () => {
        noCache(req, res, next);
        expect(res._headers['Surrogate-Control']).toBe('no-store');
    });

    it('should call next()', () => {
        noCache(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
    });
});
