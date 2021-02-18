const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@users": path.resolve(__dirname, "src/features/users"),
      "@ui": path.resolve(__dirname, "src/ui"),
      "@api": path.resolve(__dirname, "src/api"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@store": path.resolve(__dirname, "src/lib/store"),
    },
  }
};

