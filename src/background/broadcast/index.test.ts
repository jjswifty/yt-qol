import { describe, it, expect, rs, beforeEach } from '@rstest/core';
import { broadcastSettingsUpdate } from '.';

const mockStorageGet = rs.fn();
const mockTabsQuery = rs.fn();
const mockSendMessage = rs.fn();

rs.stubGlobal('chrome', {
    storage: {
        sync: {
            get: mockStorageGet,
        },
    },
    tabs: {
        query: mockTabsQuery,
        sendMessage: mockSendMessage,
    },
});

beforeEach(() => {
    rs.clearAllMocks();
});

describe('broadcastSettingsUpdate', () => {
    it('does not send messages when no matching tabs', async () => {
        mockStorageGet.mockResolvedValue({});
        mockTabsQuery.mockResolvedValue([]);

        await broadcastSettingsUpdate();

        expect(mockSendMessage).not.toHaveBeenCalled();
    });

    it('sends SETTINGS_UPDATED to all YouTube watch tabs', async () => {
        mockStorageGet.mockResolvedValue({ lockHeatMap: true });
        mockTabsQuery.mockResolvedValue([{ id: 1 }, { id: 2 }]);
        mockSendMessage.mockResolvedValue(undefined);

        await broadcastSettingsUpdate();

        expect(mockTabsQuery).toHaveBeenCalledWith({ url: '*://www.youtube.com/watch*' });
        expect(mockSendMessage).toHaveBeenCalledTimes(2);
        expect(mockSendMessage).toHaveBeenCalledWith(1, {
            type: 'SETTINGS_UPDATED',
            settings: { lockHeatMap: true },
        });
        expect(mockSendMessage).toHaveBeenCalledWith(2, {
            type: 'SETTINGS_UPDATED',
            settings: { lockHeatMap: true },
        });
    });
});
