import Config from '../../config/config.js'

export function getApiUrl(prefix) {
    return Config.api[prefix];
}

export function getConfig(prefix) {
    return Config[prefix];
}

export function getPathHost(group, child) {
    return group && child ? Config.urlPath[group][child] : "";
}