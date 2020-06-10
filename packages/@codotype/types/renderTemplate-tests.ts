import get from "lodash.get";

document.getElementById("app").innerHTML = `
<h1>Hello Parcel!</h1>
<div>
  Look
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>
  for more info about Parcel.
</div>
`;

// // // //

enum ConstraintExpression {
  exists = "EXISTS",
  exact = "EXACT",
  startsWith = "startsWith",
  endsWith = "endsWith",
  contains = "contains",
  notContains = "notContains",
  containsCaseIntensitive = "containsCaseIntensitive"
}

enum TemplateActionType {
  filter = "filter",
  render = "render"
}

interface TemplateAction {
  type: TemplateActionType;
  value: {
    [key: string]: string;
  };
}

interface Constraint {
  source: string; // The source of the field matched in the Constraint
  expression: ConstraintExpression;
  // TODO - should this be an object?
  value: string; // The value the source is compared to
}

interface TemplateDefinition {
  id: string; // UUID
  constraint: Constraint;
  action: TemplateAction;
}

enum TemplateLayoutVariant {
  codeLight = "CODE_LIGHT",
  codeDark = "CODE_DARK"
}

interface TemplateConfig {
  variant: TemplateLayoutVariant;
  definitions: TemplateDefinition[];
}

// // // //

export function evaluateAction(props: {
  action: TemplateAction;
  source: any;
}): string {
  const { action, source } = props;
  console.log(action);
  console.log(source);
  // return "TEMPLATE";
  if (action.type === TemplateActionType.render) {
    return action.value.template.replace("$value.");
  }
  return "";
}

export function evaluateConstraint(props: {
  constraint: Constraint;
  source: any;
}): boolean {
  const { constraint, source } = props;
  const value: any = get(
    source,
    constraint.source.replace("$value.", "").replace("$value", ""),
    undefined
  );

  // if (value === undefined)
  // console.log(value);
  // console.log(source);
  // console.log(constraint.source);
  if (constraint.expression === ConstraintExpression.exact) {
    return value === constraint.value;
  }

  // Return false otherwise
  return false;
}

export function evaluateTemplate(props: {
  definitions: TemplateDefinition[];
  source: any;
}): string | null {
  console.log("evaluateTemplate");
  let templateValue = "";
  props.definitions.forEach(d => {
    if (
      evaluateConstraint({ constraint: d.constraint, source: props.source })
    ) {
      templateValue = evaluateAction({
        action: d.action,
        source: props.source
      });
    }
  });
  return templateValue;
}

// // // //

const testCases: [string, any][] = [["test with basic object", { foo: "bar" }]];

const myCollectionTemplate: TemplateConfig = {
  variant: TemplateLayoutVariant.codeDark,
  definitions: [
    {
      id: "123",
      constraint: {
        source: "$value.foo",
        expression: ConstraintExpression.exact,
        value: "bar"
      },
      action: {
        type: TemplateActionType.render,
        value: {
          template: "POST /api/$value.foo"
        }
      }
    }
  ]
};

testCases.forEach(testCase => {
  // @ts-ignore
  const value = evaluateTemplate({
    definitions: myCollectionTemplate.definitions,
    source: testCase[1]
  });
  // console.log("Test Case");
  // console.log(value);
});

// // // // //
// This kinda works nicely
const otherDefinitionOption = {
  constraints: [
    {
      source: "$value.scope",
      expression: ConstraintExpression.exact,
      value: "COLLECTION"
    }
  ],
  template:
    "Generates Route: $$value.verb$$ /api/$$schema.identifiers.plural.snake$$/$$value.route$$/"
};

const otherDefinitionOptionTwo = {
  constraints: [
    {
      source: "$value.scope",
      expression: ConstraintExpression.exact,
      value: "MODEL"
    }
  ],
  template:
    "Generates Route: $$value.verb$$ /api/$$schema.identifiers.plural.snake$$/:id/$$value.route$$/"
};

const value1 = {
  scope: "MODEL",
  verb: "POST",
  route: "like"
};

const value2 = {
  scope: "COLLECTION",
  verb: "POST",
  route: "like"
};

const schemaIdentifiers: any = {
  singular: {
    label: "Movie",
    snake: "movie",
    camel: "movie",
    pascal: "Movie",
    kebab: "movie"
  },
  plural: {
    label: "Movies",
    snake: "movies",
    camel: "movies",
    pascal: "Movies",
    kebab: "movies"
  }
};

const definitions = [otherDefinitionOption, otherDefinitionOptionTwo];

function getTemplateValue(definitions: any[], value: any): string {
  let result = "";
  for (const od of definitions) {
    let compiledTemplate = od.template;

    // TODO - do the other schema-level replacements
    if (
      !od.constraints.every(c =>
        evaluateConstraint({ constraint: c, source: value })
      )
    ) {
      continue;
    }

    // Perform schema-level replacements
    compiledTemplate = compiledTemplate.replace(
      "$$schema.identifiers.plural.snake$$",
      schemaIdentifiers.plural.snake
    );

    // Perform schema-level replacements
    compiledTemplate = compiledTemplate.replace(
      "$$schema.identifiers.singular.pascal$$",
      schemaIdentifiers.plural.snake
    );

    Object.keys(value).forEach(k => {
      compiledTemplate = compiledTemplate.replace(
        `$$value.${k}$$`,
        get(value, k, "")
      );
    });

    // console.log(otherDefinitionOption);
    // console.log(compiledTemplate);
    result = compiledTemplate;
  }
  return result;
}

console.log("results!");
console.log(getTemplateValue(definitions, value2));
console.log(getTemplateValue(definitions, value1));
