export default {
  singleQuote: true,
  overrides: [
    {
      files: '**/*.hbs',
      options: {
        parser: 'glimmer',
        singleQuote: false,
      },
    },
  ],
};
