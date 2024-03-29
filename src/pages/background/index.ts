import {WebExtension} from '@hocgin/browser-addone-kit';
import {ServiceWorkerOptions} from '@hocgin/browser-addone-kit/dist/esm/browser/serviceWorker';
import '@/request.config';
import Config from "@/config";
import AppStorage, {UserSettingKey} from "@/_utils/storage";
import {OpenType} from "@/_types";

WebExtension.kit.serviceWorker({
  ...ServiceWorkerOptions.default,
  canLogin: false,
  projectId: Config.getProjectId(),
});

// 点击打开弹窗
let openNewWindow = async (...args) => {
  console.log('快捷键点击', args);
  let commonSettings = await AppStorage.getUserSettingWithKey(UserSettingKey.Common);
  if (commonSettings?.openType === OpenType.Popup) {
    WebExtension.windows.create({
      url: WebExtension.runtime.getURL(`/dashboard.html`),
      height: 800,
      width: 1200,
      type: 'popup',
      focused: true,
    });
  } else {
    WebExtension.kit.openURL(WebExtension.runtime.getURL(`/dashboard.html`));
  }
};
WebExtension.action.onClicked.addListener(openNewWindow);
WebExtension.commands.onCommand.addListener(openNewWindow);

/**
 * 后台服务保活
 * - 用户打开新标签唤起
 * from: https://stackoverflow.com/questions/66618136/persistent-service-worker-in-chrome-extension
 * ====================================================================================================================================
 */
const isMV2 = WebExtension.runtime.getManifest().manifest_version === 2;
let lifeline: any;

async function keepAlive() {
  if (lifeline) return;
  for (const tab of await WebExtension.tabs.query({url: '*://*/*'})) {
    try {
      await WebExtension.scripting.executeScript({
        target: {tabId: tab.id as any},
        // @ts-ignore
        func: () => chrome.runtime.connect({name: 'keepAlive'}),
      });
      WebExtension.tabs.onUpdated.removeListener(retryOnTabUpdate);
      return;
    } catch (e) {
      // Do nothing
    }
  }
  WebExtension.tabs.onUpdated.addListener(retryOnTabUpdate);
}

async function retryOnTabUpdate(tabId: any, info: any) {
  if (info.url && /^(file|https?):/.test(info.url)) {
    keepAlive();
  }
}

function keepAliveForced() {
  lifeline?.disconnect();
  lifeline = null;
  keepAlive();
}

if (!isMV2) {
  WebExtension.runtime.onConnect.addListener((port: any) => {
    if (port.name === 'keepAlive') {
      lifeline = port;
      /* eslint-disable-next-line */
      console.log('Stayin alive: ', new Date());
      setTimeout(keepAliveForced, 295e3);
      port.onDisconnect.addListener(keepAliveForced);
    }
  });

  keepAlive();
}
