// eslint-disable-next-line no-undef
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts",
  ],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  // Prevent TiddlyWiki from detecting global `window` and booting
  // automatically:
  testEnvironment: "node",
  // Map internal TiddlyWiki names to TypeScript modules:
  moduleNameMapper: {
    "\\$:/plugins/benwebber/dnd/(.*).js$": "<rootDir>/src/files/$1.ts"
  },
};
