import { LangKit } from '@hocgin/hkit';

export default class Utils extends LangKit {
  /**
   * 拆分数组
   * @param array
   * @param maxLength
   */
  static chunk<T>(array: T[] = [], maxLength: number): T[][] {
    let data = [];
    for (let i = 0; i < array.length; i += maxLength) {
      data.push(array.slice(i, i + maxLength));
    }
    return data;
  }

  static getSuffix(basename?: string) {
    let strings = `${basename}`.split('.');
    if (!strings.length || !basename?.includes('.')) {
      return undefined;
    }
    return strings.pop();
  }

  static suffix2fileType(suffix: string = 'unknown') {
    if (['md', 'txt', 'unknown'].includes(suffix)) {
      return 'text';
    }
    return suffix;
  }

  static splitPath = (path: string) => path.split('/').filter((s) => s.length);
}
