export const input = ['src/**/*.{js,jsx}'];
export const output = './src/locales';
export const options = {
  func: {
    list: ['t'],
    extensions: ['.js', '.jsx']
  },
  lngs: ['en', 'es'],
  defaultLng: 'en',
  resource: {
    loadPath: 'locales/{{lng}}.json',
    savePath: '{{lng}}.json',
    jsonIndent: 2
  }
};
