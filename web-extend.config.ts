import { defineConfig } from 'web-extend';

export default defineConfig({
    manifest: {
        name: 'Youtube QOL',
        permissions: ['storage', 'tabs'],
        host_permissions: ['*://www.youtube.com/*'],
    },
});
