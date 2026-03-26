import { describe, it, expect, rs, beforeEach } from '@rstest/core';
import { getSettings, setSettings } from './settings';

const mockGet = rs.fn();
const mockSet = rs.fn();

rs.stubGlobal('chrome', {
    storage: {
        sync: {
            get: mockGet,
            set: mockSet,
        },
    },
});

beforeEach(() => {
    rs.clearAllMocks();
});

describe('setSettings', () => {
    it('persists the value', async () => {
        mockGet.mockResolvedValue({});
        mockSet.mockResolvedValue(undefined);

        await setSettings({ lockHeatMap: true });

        expect(mockSet).toHaveBeenCalledWith({ lockHeatMap: true });
    });

    it('merges with existing settings', async () => {
        mockGet.mockResolvedValue({ lockHeatMap: false });
        mockSet.mockResolvedValue(undefined);

        await setSettings({ lockHeatMap: true });

        expect(mockSet).toHaveBeenCalledWith({ lockHeatMap: true });
    });
});

describe('getSettings', () => {
    it('returns defaults when storage is empty', async () => {
        mockGet.mockResolvedValue({});

        const settings = await getSettings();

        expect(settings).toEqual({ lockHeatMap: false });
    });

    it('returns stored values when present', async () => {
        mockGet.mockResolvedValue({ lockHeatMap: true });

        const settings = await getSettings();

        expect(settings).toEqual({ lockHeatMap: true });
    });
});
