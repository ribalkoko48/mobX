declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare const API_ROOT: InitialData;

declare module '*.module.scss' {
    const content: { [key: string]: string };
    export = content;
}

interface Window {
    avayaCall: (phoneNumber: string) => void;
    location: never;
}
