module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [2, "always", ["project", "server", "client", "data"]],
    "scope-case": [2, "always", "lower-case"],
    "scope-empty": [2, "never"]
  },
};
