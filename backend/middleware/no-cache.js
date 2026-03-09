/**
 * No-cache middleware for API routes.
 *
 * Ensures that all API responses include headers that prevent the browser
 * (and any intermediate proxy) from serving stale cached responses.
 * This is critical for state-changing operations (POST/PUT/DELETE) but we
 * apply it to every API response for consistency – the dashboard always
 * needs fresh data from the server.
 */
function noCache(_req, res, next) {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');
    next();
}

module.exports = { noCache };
