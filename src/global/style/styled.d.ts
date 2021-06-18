import 'styled-components';
import theme from './theme';

//arquivo criado para que o typescript analise e entenda o tema que criei
declare module 'styled-components' {
  type ThemeType = typeof theme // falando que a variavel que criei é do time theme

  export interface DefaultTheme extends ThemeType {} //exportanto para dar acesso a esta interface criada
}