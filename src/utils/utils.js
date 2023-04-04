export function deepClone(target) {
    if (typeof target === 'object') {
        const result = Array.isArray(target) ? [] : {};
        for (const key in target) {
            if (typeof target[key] == 'object') {
                result[key] = deepClone(target[key]);
            } else {
                result[key] = target[key];
            }
        }

        return result;
    }

    return target;
}
export function getPageURL() {
    return window.location.href;
}
export function onBFCacheRestore(callback) {
    window.addEventListener(
        'pageshow',
        (event) => {
            if (event.persisted) {
                callback(event);
            }
        },
        true
    );
}
