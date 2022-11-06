import {WebExtension} from '@hocgin/browser-addone-kit';
import {ServiceWorkerOptions} from '@hocgin/browser-addone-kit/es/browser/serviceWorker';
import '@/request.config';

WebExtension.kit.serviceWorker(ServiceWorkerOptions.default);

// 点击打开弹窗
let openNewWindow = (...args: any) => {
  console.log('快捷键点击', args);
  const windowOptions: any = {
    url: WebExtension.runtime.getURL(`/dashboard.html`),
    height: 800,
    width: 1200,
    type: 'popup',
    focused: true,
  };
  WebExtension.windows.create(windowOptions);
};
WebExtension.action.onClicked.addListener(openNewWindow);
WebExtension.commands.onCommand.addListener(openNewWindow);
