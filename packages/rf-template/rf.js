module.exports = {
  config: {
    public_path: "",
    compiler_commons: []
  },
  config_dev: {},
  config_prod: {},
  webpack: (config, env) => {
    // @rf-cli-complete-begin
    // @rf-cli-complete-end
    return config;
  },
  devServer: (config, env) => {
    return config;
  }
};
