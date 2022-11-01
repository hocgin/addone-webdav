export let ServiceConfig = [{
  id: 'jianguoyun',
  label: '坚果云',
  api: 'https://dav.jianguoyun.com',
  rootPath: '/我的坚果云',
  support_auth: ['digest', 'basic', 'token']
}, {
  id: 'custom',
  label: '自定义',
  rootPath: '/',
  support_auth: ['digest', 'basic', 'token']
}];


export function getConfig(value: string) {
  return ServiceConfig.find(({id}) => id === value)
}
