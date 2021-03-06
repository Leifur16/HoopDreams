const types = require("./types");
const enums = require("./enums");
const queries = require("./queries");
const inputs = require("./inputs");
const mutations = require("./mutations");
const scalar = require('./scalar');

module.exports = `
    ${types}
    ${enums}
    ${queries}
    ${inputs}
    ${mutations}
    ${scalar}
`;
