// @flow
import type { EventBinding, EventOptions } from './event-types';

type UnbindFn = () => void;

function getOptions(
  shared?: EventOptions,
  fromBinding?: EventOptions,
): EventOptions {
  return {
    ...shared,
    ...fromBinding,
  };
}

export default function bindEvents(
  el: HTMLElement,
  bindings: EventBinding[],
  sharedOptions?: EventOptions,
// eslint-disable-next-line @typescript-eslint/ban-types
): Function {
  const unbindings: UnbindFn[] = bindings.map(
    (binding: EventBinding): UnbindFn => {
        console.log('bindings:')
      const options: any = getOptions(sharedOptions, binding.options);

      el.addEventListener(binding.eventName, binding.fn, options);

      return function unbind() {
        el.removeEventListener(binding.eventName, binding.fn, options);
      };
    },
  );

  // Return a function to unbind events
  return function unbindAll() {
    unbindings.forEach((unbind: UnbindFn) => {
      unbind();
    });
  };
}
