var replace = require('replace-in-file');
var package = require("./package.json");
var buildVersion = package.version;
const options = {
    files: ['config.xml'],
    from: /" version="([0-9]*.[0-9]*.[0-9]*)"/g,
    to: "\" version=\""+ buildVersion + "\"",
    allowEmptyPaths: false,
};

const optionsEnv = {
     files: ['src/environments/environment.prod.ts'],
    from: /version: '(.*)'/g,
    to: "version: '"+ buildVersion + "' ",
    allowEmptyPaths: false,
};

try {
    let changedFiles = replace.sync(options);
    if (changedFiles == 0) {
        throw "Please make sure that file '" + options.files + "' has \"version: ''\"";
    }
    changedFiles = replace.sync(optionsEnv);
    if (changedFiles == 0) {
        throw "Please make sure that file '" + optionsEnv.files + "' has \"version: ''\"";
    }
    console.log('Build version set: "' + options.to + '"');
}
catch (error) {
    console.error('Error occurred:', error);
    throw error
}