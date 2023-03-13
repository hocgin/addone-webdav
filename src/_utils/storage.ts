import { UserSettingKit } from '@hocgin/hkit';
import { storageKit, StorageKit } from '@hocgin/browser-addone-kit';
import { WebDavData } from '@/services/webdav/types';

export enum UserSettingKey {}

export interface UserSettingType {}

export let userSettingKit = UserSettingKit.create<
  UserSettingKey,
  UserSettingType
>({});

export function loadAccount(): Promise<WebDavData[]> {
  let result = storageKit.getAsync('account' as any);
  console.log('loadAccount.result', result);
  return result;
}

export function saveAccount(data: WebDavData[]) {
  console.log('saveAccount.result', data);
  return storageKit.setAsync('account' as any, data);
}
