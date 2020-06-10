import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ConfigurationCollectionInput } from "../ConfigurationCollectionInput";
import {
    OptionValueInstance,
    testState,
    ConfigurationGroup,
    OptionValue,
    ConfigurationGroupProperty,
} from "@codotype/types";
const { LambdaBuilderConfigurationGroup } = testState;
import { Story } from "@src/components/dev";
import {
    buildConfigurationGroupValue,
    buildConfigurationGroupPropertyValue,
} from "@codotype/util";

// // // //

const stories: [string, ConfigurationGroup, OptionValueInstance][] = [
    ["render", LambdaBuilderConfigurationGroup, {}],
];

const storyCollection = storiesOf(
    "ConfigurationEditor/ConfigurationCollectionInput",
    module,
);

// // // //

stories.forEach(story => {
    storyCollection.add(story[0], () => {
        // // // //
        // Testing with allowDisable
        const collectionProperty: ConfigurationGroupProperty =
            story[1].properties[0];
        const collectionProperties = [
            {
                ...collectionProperty.properties[0],
                allowDisable: true,
            },
            collectionProperty.properties[1],
        ];

        collectionProperty.properties = collectionProperties;
        // // // //

        const [value, setValue] = React.useState<OptionValue>(
            buildConfigurationGroupPropertyValue(collectionProperty),
        );
        return (
            <Story>
                <ConfigurationCollectionInput
                    label="Lambda Functions"
                    identifiers={{
                        singular: {
                            label: "Lambda",
                            snake: "lambda",
                            camel: "lambda",
                            pascal: "Lambda",
                            kebab: "lambda",
                        },
                        plural: {
                            label: "Lambdas",
                            snake: "lambdas",
                            camel: "lambdas",
                            pascal: "Lambdas",
                            kebab: "lambdas",
                        },
                    }}
                    properties={collectionProperty.properties}
                    value={value}
                    onChange={(updatedVal: OptionValue) => {
                        setValue(updatedVal);
                    }}
                />
            </Story>
        );
    });
});
