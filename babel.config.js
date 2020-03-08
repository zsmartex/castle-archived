module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: false }
    ]
  ],
  env: {
    development: {
      compact: false
    },
    production: {
      compact: false
    }
  }
};
