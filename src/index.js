import error from './error/index';
import { setConfig } from './config';
const monitor = {
    init(options = {}) {
        setConfig(options);
        error();
    },
};

export default monitor;
