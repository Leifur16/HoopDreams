const types = require("./types");
const enums = require("./enums");
const queries = require("./queries");

module.exports = `
    ${types}
    ${enums}
    ${queries}
`;
