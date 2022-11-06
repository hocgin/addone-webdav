import {stringify} from 'query-string';
import {useGet, StructKit} from '@hocgin/hkit';

export default class {
  static ssr({id, ...payload}: any): Promise<string> {
    let queryString = stringify(payload);
    return useGet(`/api/ssr?${queryString}`)
      .then(StructKit.thenTryErrorIfExits)
      .then(StructKit.thenData);
  }
}
