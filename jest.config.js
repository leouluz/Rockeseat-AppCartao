module.exports = {
  preset : "jest-expo",
  /*
   * testPathIgnorePatterns ignora as pastas que passo dentro do array
   */
  testPathIgnorePatterns: [
    "/node_modules",
    "/android",
    "/ios",
  ],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect"
  ] 
}