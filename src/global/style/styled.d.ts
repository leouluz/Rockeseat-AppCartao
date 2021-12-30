/**** Arquivo para que o TypeScript acesse meu tema ****/

import 'styled-components';
import theme from './theme';

declare module 'styled-components' {
  type ThemeType = typeof theme

  // Exportando a interface do tema
  export interface DefaultTheme extends ThemeType { }
}