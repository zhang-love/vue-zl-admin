import { generate } from '@ant-design/colors';

type Fn = (...arg: any) => any;

export const primaryColor = '#0960bd';
export const darkMode = 'light';

export interface GenerateColorsParams {
  mixLighten: Fn;
  mixDarken: Fn;
  tinycolor: any;
  color?: string;
}
export enum ThemeEnum {
  DARK = 'dark',
  DEFAULT = 'default',
  LIGHT = 'light',
}

export function generateAntColors(color: string, theme: ThemeEnum = ThemeEnum.DEFAULT) {
  return generate(color, { theme: theme === ThemeEnum.DARK ? ThemeEnum.DARK : ThemeEnum.DEFAULT });
}

export function getThemeColors(color: string = primaryColor) {
  const lightColors = generateAntColors(color);
  const primary = lightColors[5];
  const modeColors = generateAntColors(primary, ThemeEnum.DARK);
  return [...lightColors, ...modeColors];
}

export function generateColors({ color, mixLighten, mixDarken, tinycolor }: GenerateColorsParams) {
  const arr = new Array(19).fill(0);
  const lightens = arr.map((_t, i) => {
    return mixLighten(color, i / 5);
  });

  const darkens = arr.map((_t, i) => {
    return mixDarken(color, i / 5);
  });

  const alphaColors = arr.map((_t, i) => {
    return tinycolor(color)
      .setAlpha(i / 20)
      .toRgbString();
  });

  const shortAlphaColors = alphaColors.map((item) => item.replace(/\s/g, '').replace(/0\./g, '.'));

  const tinycolorLightens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .lighten(i * 5)
        .toHexString();
    })
    .filter((item) => item !== '#ffffff');

  const tinycolorDarkens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .darken(i * 5)
        .toHexString();
    })
    .filter((item) => item !== '#000000');
  return [
    ...lightens,
    ...darkens,
    ...alphaColors,
    ...shortAlphaColors,
    ...tinycolorDarkens,
    ...tinycolorLightens,
  ].filter((item) => !item.includes('-'));
}
