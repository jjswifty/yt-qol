type AdCallback = (isAd: boolean) => void;

export const createAdDetector = (callback: AdCallback) => {
    const observer = new MutationObserver(() => {
        callback(document.documentElement.classList.contains('ad-showing'));
    });

    return {
        start: () => observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] }),
        stop: () => observer.disconnect(),
    };
};
