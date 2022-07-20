import * as monaco from 'monaco-editor';
import { onMounted, onUnmounted, Ref, unref } from 'vue';
import prettier from 'prettier/standalone';
import parser from 'prettier/parser-html';
import parserTs from 'prettier/parser-typescript';
import { useDebounceFn } from '@vueuse/shared';

export function useMonaco(elRef: Ref<HTMLDListElement>) {
  let editor: monaco.editor.IStandaloneCodeEditor | undefined = undefined;
  let monacoHtml: string;
  onMounted(() => {
    window.addEventListener('resize', resizeFn);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', resizeFn);
  });
  function initMonaco() {
    const el = unref(elRef);
    if (!el) return;
    if (editor) editor.dispose();
    editor = monaco.editor.create(el, {
      language: 'html',
      value: monacoHtml,
      theme: 'vs-dark',
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      const val = editor?.getValue();
      setVal(val);
    });
  }
  const resizeFn = useDebounceFn(initMonaco, 200);

  function setVal(value = '') {
    if (!value) return;
    monacoHtml = value;
    if (!editor) {
      initMonaco();
    }
    if (!prettier || !editor) return;
    const val = prettier.format(value, {
      parser: 'html',
      bracketSpacing: true,
      plugins: [parserTs, parser],
      printWidth: 100,
      semi: true,
      tabWidth: 2,
      vueIndentScriptAndStyle: true,
      singleQuote: true,
      trailingComma: 'all',
      proseWrap: 'never',
      htmlWhitespaceSensitivity: 'strict',
      endOfLine: 'auto',
    });
    editor?.setValue(val);
  }
  function getVal() {
    return editor?.getValue();
  }
  return {
    editor,
    setVal,
    getVal,
  };
}
