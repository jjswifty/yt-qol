export interface Settings {
    lockHeatMap: boolean;
}

const defaults: Settings = {
    lockHeatMap: false,
};

export async function getSettings(): Promise<Settings> {
    const stored = await chrome.storage.sync.get(null);
    return { ...defaults, ...stored } as Settings;
}

export async function setSettings(partial: Partial<Settings>): Promise<void> {
    const current = await getSettings();
    await chrome.storage.sync.set({ ...current, ...partial });
}
