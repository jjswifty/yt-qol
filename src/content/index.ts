import type { ContentScriptConfig } from 'web-extend';

export const config: ContentScriptConfig = {
    matches: ['*://www.youtube.com/*'],
};
