"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var match_path_sync_1 = require("./match-path-sync");
var config_loader_1 = require("./config-loader");
var options_1 = require("./options");
/**
 * Installs a custom module load function that can adhere to paths in tsconfig.
 */
function register(explicitParams) {
    var configLoaderResult = config_loader_1.configLoader({
        cwd: options_1.options.cwd,
        explicitParams: explicitParams
    });
    if (configLoaderResult.resultType === "failed") {
        console.warn(configLoaderResult.message + ". tsconfig-paths will be skipped");
        return;
    }
    var matchPath = match_path_sync_1.createMatchPath(configLoaderResult.absoluteBaseUrl, configLoaderResult.paths);
    // Patch node's module loading
    // tslint:disable-next-line:no-require-imports variable-name
    var Module = require("module");
    var originalResolveFilename = Module._resolveFilename;
    // tslint:disable-next-line:no-any
    Module._resolveFilename = function (request, _parent) {
        var found = matchPath(request);
        if (found) {
            var modifiedArguments = [found].concat([].slice.call(arguments, 1)); // Passes all arguments. Even those that is not specified above.
            // tslint:disable-next-line:no-invalid-this
            return originalResolveFilename.apply(this, modifiedArguments);
        }
        // tslint:disable-next-line:no-invalid-this
        return originalResolveFilename.apply(this, arguments);
    };
}
exports.register = register;
