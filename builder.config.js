//@ts-check

/** @type {import('@technobuddha/project/build').Builds} */
const config = {
  default: {
    watch: true,
    steps: [
      {
        name: 'Clean',
        command: 'rm -rf ./dist'
      },
      {
        name: 'Plugin',
        directory: './src',
        command: 'npx tsc -p ./src',
      },
    ],
  },
  prod: {
    steps: [
      { build: 'default' },
    ]
  },
  publish: {
    steps: [
      { build: 'default' },
      {
        name: 'Version',
        command: 'yarn version patch',
      },
      {
        name: 'Publish',
        command: 'yarn npm publish --access public'
      }
    ]
  }
};

export default config;
