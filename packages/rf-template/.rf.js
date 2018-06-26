module.exports = {
  config: {
    public_path: "/",
    js_path: "static/js/",
    css_path: "static/css/",
    media_path: "static/media/",
    compiler_commons: [],
    compiler_vendors: []
  },
  webpack: (config, env) => {
    // @rf-cli-complete-begin
    // @rf-cli-complete-end
    return config;
  },
  devServer: (config, env) => {
    return config;
  }
};
