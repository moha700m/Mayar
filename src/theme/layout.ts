import { Platform } from 'react-native';

const web = Platform.OS === 'web';

/**
 * Arabic chrome without double-flipping.
 * Web inherits `dir=rtl` from the document, so `row` already starts on the right.
 * Native Yoga stays LTR unless the OS is RTL, so we reverse rows physically.
 */
export const layout = {
  row: (web ? 'row' : 'row-reverse') as 'row' | 'row-reverse',
  rowPhysical: (web ? 'row-reverse' : 'row') as 'row' | 'row-reverse',
  start: (web ? 'flex-start' : 'flex-end') as 'flex-start' | 'flex-end',
  end: (web ? 'flex-end' : 'flex-start') as 'flex-start' | 'flex-end',
};
