import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({ 
  config,
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.50',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
  components: {
    Table: {
      baseStyle: (props: any) => ({
        table: {
          bg: props.colorMode === 'dark' ? 'gray.700' : 'white',
        },
        th: {
          bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.50',
          color: props.colorMode === 'dark' ? 'white' : 'gray.800',
        },
        td: {
          borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.200',
        },
      }),
    },
    Modal: {
      baseStyle: (props: any) => ({
        dialog: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
        },
      }),
    },
    Card: {
      baseStyle: (props: any) => ({
        container: {
          bg: props.colorMode === 'dark' ? 'gray.700' : 'white',
        },
      }),
    },
  },
});

export default theme;