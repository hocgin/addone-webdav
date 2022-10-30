import { CssPropsKit } from '@hocgin/hkit';

export enum CssPropsKey {

}

export let cssPropsKit = CssPropsKit.create<CssPropsKey | any, string>();

export default class CssProps {
  static setBackgroundColor(value: string = 'unset') {
    cssPropsKit.set('--background-color', value);
  }
}
