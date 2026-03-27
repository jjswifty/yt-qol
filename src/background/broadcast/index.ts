import { getSettings } from '../../shared/settings';

export const broadcastSettingsUpdate = async (): Promise<void> => {
    const settings = await getSettings();
    const tabs = await chrome.tabs.query({ url: '*://www.youtube.com/watch*' });
    for (const tab of tabs) {
        if (tab.id !== undefined) {
            chrome.tabs.sendMessage(tab.id, { type: 'SETTINGS_UPDATED', settings }).catch((err) => {
                console.error('Failed to send SETTINGS_UPDATED to tab', tab.id, err);
            });
        }
    }
};
