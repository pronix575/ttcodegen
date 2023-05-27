"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTemplate = void 0;
const handlebars_1 = __importDefault(require("handlebars"));
function renderTemplate(template, params) {
    const compiledTemplate = handlebars_1.default.compile(template);
    const redneredTemplate = compiledTemplate(params);
    return redneredTemplate;
}
exports.renderTemplate = renderTemplate;
