import { stringify } from 'query-string';
import { Utils } from '@hocgin/ui';

let { useGet } = Utils.Request;

export default class {
  static ssr({ id, ...payload }: any): Promise<string> {

    let queryString = stringify(payload);
    return useGet(`/api/ssr?${queryString}`)
      .then(Utils.Struct.thenTryErrorIfExits)
      .then(Utils.Struct.thenData);
  }
}
