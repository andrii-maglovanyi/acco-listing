module.exports = {
  hooks: {
    "pre-commit": tasks([
      "pretty-quick --staged",
      "eslint src/*.ts --fix-dry-run",
    ]),
  },
};
