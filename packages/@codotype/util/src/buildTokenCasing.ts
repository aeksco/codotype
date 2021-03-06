import { makeLabelCase } from "./makeLabelCase";
import { makeKebabCase } from "./makeKebabCase";
import { makePascalCase } from "./makePascalCase";
import { makeCamelCase } from "./makeCamelCase";
import { TokenCasing } from "@codotype/types";
import { makeSnakeCase } from "./makeSnakeCase";

// // // //

// buildTokenCasing
// Accepts a singlar, titleized, human-readable label
// and produces all requisite metadata for sensible code generation
export function buildTokenCasing(label: string): TokenCasing {
  return {
    label: makeLabelCase(label),
    snake: makeSnakeCase(label),
    camel: makeCamelCase(label),
    pascal: makePascalCase(label),
    kebab: makeKebabCase(label),
  };
}
