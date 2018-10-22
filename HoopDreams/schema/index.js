const types = require("./types");
const enums = require("./enums");
const queries = require("./queries");
const inputs = require("./inputs");
const mutations = require("./mutations");

module.exports = `
    ${types}
    ${enums}
    ${queries}
    ${inputs}
    ${mutations}
`;
