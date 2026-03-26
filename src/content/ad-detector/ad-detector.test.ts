import { describe, it, expect, beforeEach } from '@rstest/core';
import { createAdDetector } from '.';

beforeEach(() => {
    document.documentElement.classList.remove('ad-showing');
});

describe('createAdDetector', () => {
    it('fires callback with true when ad-showing is added', async () => {
        const calls: boolean[] = [];
        const detector = createAdDetector((isAd) => calls.push(isAd));
        detector.start();

        document.documentElement.classList.add('ad-showing');
        await Promise.resolve();

        expect(calls).toEqual([true]);
        detector.stop();
    });

    it('fires callback with false when ad-showing is removed', async () => {
        document.documentElement.classList.add('ad-showing');
        const calls: boolean[] = [];
        const detector = createAdDetector((isAd) => calls.push(isAd));
        detector.start();

        document.documentElement.classList.remove('ad-showing');
        await Promise.resolve();

        expect(calls).toEqual([false]);
        detector.stop();
    });

    it('does not fire callback after stop', async () => {
        const calls: boolean[] = [];
        const detector = createAdDetector((isAd) => calls.push(isAd));
        detector.start();
        detector.stop();

        document.documentElement.classList.add('ad-showing');
        await Promise.resolve();

        expect(calls).toEqual([]);
    });
});
