import {storageKit} from '@hocgin/browser-addone-kit';
import {WebDavData} from '@/services/webdav/types';
import {LangKit} from '@hocgin/hkit';
import {OpenType, StorageKeys} from "@/_types";

export enum UserSettingKey {
  Common = 'Common'
}

interface UserSettingCommonType {
  openType?: OpenType,
};

export interface UserSettingType {
  [UserSettingKey.Common]: UserSettingCommonType
}

export default class AppStorage {
  static async getUserSetting(defaultValue: UserSettingType = {
    [UserSettingKey.Common]: {
      openType: OpenType.Tab,
    },
  }): Promise<UserSettingType> {
    let values = await storageKit.getAsync(StorageKeys.UserSetting) || {};
    return LangKit.merge(defaultValue, values);
  }

  static async getUserSettingWithKey(settingKey: UserSettingKey): Promise<UserSettingCommonType | any> {
    let settings = await AppStorage.getUserSetting() as any;
    return settings?.[settingKey];
  }

  static async updateUserSettingWithKey(settingKey: UserSettingKey, value: object) {
    let userSetting: any = await AppStorage.getUserSetting() ?? {};
    let newValue = LangKit.merge(userSetting, {
      [settingKey]: LangKit.merge(userSetting[settingKey] ?? {}, value),
    });
    await AppStorage.updateUserSetting(newValue);
  }

  static async updateUserSetting(value: UserSettingType) {
    await storageKit.setAsync(StorageKeys.UserSetting, value);
    console.log('更新用户配置', value);
  }
}

export function loadAccount(): Promise<WebDavData[]> {
  let result = storageKit.getAsync('account' as any);
  console.log('loadAccount.result', result);
  return result;
}

export function saveAccount(data: WebDavData[]) {
  console.log('saveAccount.result', data);
  return storageKit.setAsync('account' as any, data);
}
