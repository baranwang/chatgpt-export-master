import { createRoot } from 'react-dom/client';
import { ExportButton } from '~components/ExportButton';

import type { PlasmoCSConfig } from 'plasmo';

export const config: PlasmoCSConfig = {
  matches: ['https://chat.openai.com/chat/*'],
};

const EXPORT_BTN_WRAPPER_CLASS = 'export-markdown-wrap';

const renderExportButton = () => {
  const formWrapper = document.querySelector('form div > div');
  const exportBtnContainer = document.createElement('div');
  exportBtnContainer.classList.add(EXPORT_BTN_WRAPPER_CLASS);
  formWrapper.appendChild(exportBtnContainer);
  const root = createRoot(exportBtnContainer);
  root.render(<ExportButton />);
};

const observer = new MutationObserver(() => {
  if (!document.querySelector(`.${EXPORT_BTN_WRAPPER_CLASS}`)) {
    renderExportButton();
  }
});

observer.observe(document.getElementById('__next'), {
  childList: true,
  subtree: true,
});
