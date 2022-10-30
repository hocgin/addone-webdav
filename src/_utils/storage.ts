import { UserSettingKit } from '@hocgin/hkit';

export enum UserSettingKey {
}

export interface UserSettingType {
}

export let userSettingKit = UserSettingKit.create<UserSettingKey, UserSettingType>({});
