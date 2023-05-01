import { declareIndexPlugin, ReactRNPlugin, WidgetLocation } from '@remnote/plugin-sdk';
import '../style.css';
import '../App.css';

async function onActivate(plugin: ReactRNPlugin) {
  // Register settings

  await plugin.app.registerWidget(
    'Chatbot',
    WidgetLocation.RightSidebar,
    {
      dimensions: {
        height: 'auto',
        width: "100%",
      },
      widgetTabTitle: "GPTCopilot",
      widgetTabIcon: "https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png",
    },
  );
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);
