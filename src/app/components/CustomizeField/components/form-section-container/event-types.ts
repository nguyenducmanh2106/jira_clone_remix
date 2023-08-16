// @flow

export type EventOptions = {
    passive?: boolean,
    capture?: boolean,
    // sometimes an event might only event want to be bound once
    once?: boolean,
};

export type EventBinding = {
    eventName: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    fn: Function,
    options?: EventOptions,
};
