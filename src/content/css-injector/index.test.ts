import { describe, it, expect, beforeEach } from '@rstest/core';
import { injectStyle, removeStyle, isInjected } from '.';

const CLASS = 'yt-ext-active';

beforeEach(() => {
    document.documentElement.classList.remove(CLASS);
});

describe('injectStyle', () => {
    it('adds the class to documentElement', () => {
        injectStyle();

        expect(document.documentElement.classList.contains(CLASS)).toBe(true);
    });
});

describe('removeStyle', () => {
    it('removes the class from documentElement', () => {
        document.documentElement.classList.add(CLASS);

        removeStyle();

        expect(document.documentElement.classList.contains(CLASS)).toBe(false);
    });
});

describe('isInjected', () => {
    it('returns true when class is present', () => {
        document.documentElement.classList.add(CLASS);

        expect(isInjected()).toBe(true);
    });

    it('returns false when class is absent', () => {
        expect(isInjected()).toBe(false);
    });
});
