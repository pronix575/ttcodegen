"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTemplate = void 0;
const handlebars_1 = __importDefault(require("handlebars"));
const utils_1 = require("./utils");
function renderTemplate(template, params) {
    handlebars_1.default.registerHelper("cfl", utils_1.capitalizeFirstLetter);
    const compiledTemplate = handlebars_1.default.compile(template);
    const redneredTemplate = compiledTemplate(params);
    return redneredTemplate;
}
exports.renderTemplate = renderTemplate;
