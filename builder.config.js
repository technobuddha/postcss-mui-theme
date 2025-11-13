//@ts-check

/** @type {import('@technobuddha/builder').Builds} */
const config = {
  dev: {
    watch: true,
    steps: [
      {
        name: 'Clean',
        command: 'rm -rf ./dist'
      },
      {
        name: 'Plugin',
        directory: './src',
        command: 'tsc -p ./src',
      },
    ],
  },
  prod: {
    steps: [
      {
        name: 'Clean',
        command: 'rm -rf ./dist',
      },
      {
        name: 'Plugin',
        command: 'tsc -p ./src',
      },
    ]
  },
  publish: {
    steps: [
      {
        name: 'Clean',
        command: 'rm -rf ./dist',
      },
      {
        name: 'Plugin',
        command: 'tsc -p ./src',
      },
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
