import { broadcastSettingsUpdate } from './broadcast';

chrome.storage.onChanged.addListener(broadcastSettingsUpdate);
