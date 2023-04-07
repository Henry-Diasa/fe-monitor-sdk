import observeEntries from './observeEntries';
import observePaint from './observePaint';
import observeLCP from './observeLCP';
import config from '../config';
import onVueRouter from './onVueRouter';
export default function performance() {
    observeEntries();
    observePaint();
    observeLCP();
    if (config.vue?.Vue && config.vue?.router) {
        onVueRouter(config.vue?.Vue && config.vue?.router);
    }
}
