import { declareIndexPlugin, ReactRNPlugin, WidgetLocation } from '@remnote/plugin-sdk';
import '../style.css';
import '../App.css';

async function onActivate(plugin: ReactRNPlugin) {

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

  await plugin.settings.registerStringSetting({
    id: "apiKey",
    title: "Enter your OpenAI API key",
    defaultValue: "sk-",
  });
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);
