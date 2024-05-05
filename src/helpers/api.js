import _ from 'lodash';

/**
 * @typedef {string | number | undefined | null} PathItem
 */

/**@type {(path: PathItem | PathItem[], data?: { [s: string]: any } | undefined | null = undefined) => string} */
export const getQueryUrl = (path, data) => {

    let url = getUrl(path);

    if (_.isEmpty(data)) return url;

    const params = Object.entries(data)
        .filter(([, val]) => !_.isNil(val))
        .map(([key, val]) => [key, encodeURIComponent(val)])
        .map(([key, val]) => `${key}=${val}`)
        .join("&");

    if (_.isEmpty(params)) return url;

    url = `${url}${!url.includes("?") ? "?" : "&"}${params}`;

    return url;
}

/**@type {(path: PathItem | PathItem[]) => string} */
const getUrl = (path) => {
    if (_.isArray(path)) {
        path = path
            .filter(s => !_.isNil(s) && (!_.isString(s) || !_.isEmpty(s)))
            .map(s => _.isString(s) ? _.trim(s, '/') : s)
            .join('/')
    }

    const url = (path ?? "").toString();
    return url;
}

export const getAuthorization = () => {
    const authorizationToken = localStorage.getItem(`AuthorizationToken`);
    if (authorizationToken) {
        return authorizationToken
    };
}

export const setAuthorization = (authorizationToken) => {
    if (authorizationToken) {
        localStorage.setItem(`AuthorizationToken`, authorizationToken);
    }
}

export const removeAuthorization = () => {
    localStorage.removeItem(`AuthorizationToken`);
}