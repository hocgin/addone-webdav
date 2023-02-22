export default class Config {

  static isDev() {
    return process.env.NODE_ENV === 'development';
  }

  static getSsoServerUrl() {
    // @ts-ignore
    return ssoServerUrl;
  }

  static getBaseUrl() {
    // @ts-ignore
    return baseUrl;
  }

  static getProjectId() {
    // @ts-ignore
    return projectId;
  }
}
