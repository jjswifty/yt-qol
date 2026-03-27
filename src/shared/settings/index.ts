export type Settings = {
    lockHeatMap: boolean;
};

const defaults: Settings = {
    lockHeatMap: false,
};

export const getSettings = async (): Promise<Settings> => {
    const stored = await chrome.storage.sync.get(null);
    return { ...defaults, ...stored } as Settings;
};

export const setSettings = async (partial: Partial<Settings>): Promise<void> => {
    const current = await getSettings();
    await chrome.storage.sync.set({ ...current, ...partial });
};
