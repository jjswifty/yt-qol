const CLASS = 'yt-ext-active';

export const injectStyle = () => {
    document.documentElement.classList.add(CLASS);
};

export const removeStyle = () => {
    document.documentElement.classList.remove(CLASS);
};

export const isInjected = () => document.documentElement.classList.contains(CLASS);
