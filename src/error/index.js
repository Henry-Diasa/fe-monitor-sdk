import { lazyReportCache } from '../utils/report';
import { onBFCacheRestore, getPageURL } from '../utils/utils';
import config from '../config';
export default function error() {
    const oldConsoleError = window.console.error;
    window.console.error = (...args) => {
        oldConsoleError.apply(this, args);
        lazyReportCache({
            type: 'error',
            subType: 'console-error',
            startTime: performance.now(),
            errData: args,
            pageURL: getPageURL(),
        });
    };

    // 资源加载错误
    window.addEventListener(
        'error',
        (e) => {
            const target = e.target;
            if (!target) return;
            if (target.src || target.href) {
                const url = target.src || target.href;
                lazyReportCache({
                    url,
                    type: 'error',
                    subType: 'resource',
                    startTime: performance.now(),
                    html: target.outerHTML,
                    resourceType: target.tagName,
                    paths: e.path?.map((item) => item.tagName).filter(Boolean),
                    pageURL: getPageURL(),
                });
            }
        },
        true
    );

    // js报错
    window.onerror = (msg, url, line, column, error) => {
        lazyReportCache({
            msg,
            line,
            column,
            error: error.stack,
            subType: 'js',
            pageURL: url,
            type: 'error',
            startTime: performance.now(),
        });
    };
    // promise 报错
    window.addEventListener('unhandledrejection', (e) => {
        lazyReportCache({
            reason: e.reason?.stack,
            subType: 'promise',
            type: 'error',
            startTime: e.timeStamp,
            pageURL: getPageURL(),
        });
    });
    // vue
    if (config.vue?.Vue) {
        config.vue.Vue.config.errorHandler = (err, vm, info) => {
            console.error(err);

            lazyReportCache({
                info,
                error: err.stack,
                subType: 'vue',
                type: 'error',
                startTime: performance.now(),
                pageURL: getPageURL(),
            });
        };
    }
    onBFCacheRestore(() => {
        error();
    });
}
