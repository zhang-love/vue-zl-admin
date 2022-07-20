import { ThemeEnum } from '@/enums/appEnum';
import { addClass, removeClass } from '@/utils/domUtils';

export async function updateDarkTheme(mode: ThemeEnum) {
  const htmlRoot = document.getElementById('htmlRoot');
  if (!htmlRoot) {
    return;
  }
  removeClass(htmlRoot, 'light');
  removeClass(htmlRoot, 'dark');
  addClass(htmlRoot, mode);
  htmlRoot.setAttribute('data-theme', mode);
}
