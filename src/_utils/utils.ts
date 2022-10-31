import {LangKit} from '@hocgin/hkit';

export default class Utils extends LangKit {

  /**
   * 拆分数组
   * @param array
   * @param maxLength
   */
  static chunk<T>(array: T[] = [], maxLength: number): T[][] {
    let data = [];
    for (let i = 0; i < array.length; i += maxLength) {
      data.push(array.slice(i, i + maxLength))
    }
    return data
  }
};

