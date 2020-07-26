import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ConfigurationInput } from "../component";
import { buildConfigurationGroupValue } from "@codotype/util";
import {
    OptionValueInstance,
    testState,
    GroupLayoutVariant,
    ConfigurationGroup,
} from "@codotype/types";
const {
    ComponentBuilderConfigurationGroup,
    ApiExamplesConfigurationGroup,
    ComponentBuilderConfigurationGroupPropertySingleDropdown,
    ComponentBuilderConfigurationGroupPropertyWithInstance,
    ComponentBuilderConfigurationGroupPropertyWithInstance01,
} = testState;
import { Story } from "@src/components/dev";

// // // //

const storyCollection = storiesOf(
    "ConfigurationEditor/ConfigurationInput",
    module,
);

storyCollection.add("renders", () => {
    const [count, increment] = React.useReducer(i => i + 1, 0);
    const [configurationOptionValue, setVal] = React.useState<
        OptionValueInstance
    >(buildConfigurationGroupValue(ComponentBuilderConfigurationGroup));

    return (
        <Story>
            <ConfigurationInput
                configurationGroup={ComponentBuilderConfigurationGroup}
                value={configurationOptionValue}
                onChange={(updatedVal: OptionValueInstance) => {
                    setVal(updatedVal);
                    increment();
                }}
            />
            <p>{count}</p>
            <pre>{JSON.stringify(configurationOptionValue, null, 4)}</pre>
        </Story>
    );
});

storyCollection.add("single dropdown", () => {
    const [count, increment] = React.useReducer(i => i + 1, 0);
    const [configurationOptionValue, setVal] = React.useState<
        OptionValueInstance
    >(
        buildConfigurationGroupValue({
            ...ComponentBuilderConfigurationGroup,
            properties: [
                ComponentBuilderConfigurationGroupPropertySingleDropdown,
            ],
        }),
    );

    return (
        <Story>
            <ConfigurationInput
                configurationGroup={{
                    ...ComponentBuilderConfigurationGroup,
                    properties: [],
                }}
                value={configurationOptionValue}
                onChange={(updatedVal: OptionValueInstance) => {
                    setVal(updatedVal);
                    increment();
                }}
            />
            <p>{count}</p>
            <pre>{JSON.stringify(configurationOptionValue, null, 4)}</pre>
        </Story>
    );
});

storyCollection.add("nested instance", () => {
    const [count, increment] = React.useReducer(i => i + 1, 0);
    const [configurationOptionValue, setVal] = React.useState<
        OptionValueInstance
    >(
        buildConfigurationGroupValue({
            ...ComponentBuilderConfigurationGroup,
            properties: [
                ComponentBuilderConfigurationGroupPropertyWithInstance,
            ],
        }),
    );

    return (
        <Story>
            <ConfigurationInput
                configurationGroup={{
                    ...ComponentBuilderConfigurationGroup,
                    properties: [
                        ComponentBuilderConfigurationGroupPropertyWithInstance,
                    ],
                }}
                value={configurationOptionValue}
                onChange={(updatedVal: OptionValueInstance) => {
                    setVal(updatedVal);
                    increment();
                }}
            />
            <p>{count}</p>
            <pre>{JSON.stringify(configurationOptionValue, null, 4)}</pre>
        </Story>
    );
});

storyCollection.add("instance", () => {
    const [count, increment] = React.useReducer(i => i + 1, 0);
    const [configurationOptionValue, setVal] = React.useState<
        OptionValueInstance
    >(
        buildConfigurationGroupValue({
            ...ComponentBuilderConfigurationGroup,
            properties: [
                ComponentBuilderConfigurationGroupPropertyWithInstance01,
            ],
        }),
    );

    return (
        <Story>
            <ConfigurationInput
                configurationGroup={{
                    ...ComponentBuilderConfigurationGroup,
                    properties: [
                        ComponentBuilderConfigurationGroupPropertyWithInstance01,
                    ],
                }}
                value={configurationOptionValue}
                onChange={(updatedVal: OptionValueInstance) => {
                    setVal(updatedVal);
                    increment();
                }}
            />
            <p>{count}</p>
            <pre>{JSON.stringify(configurationOptionValue, null, 4)}</pre>
        </Story>
    );
});

// // // //

const allowDisableOptions = [false, true];

const groupVariants = [
    GroupLayoutVariant.TABS,
    GroupLayoutVariant.LIST,
    GroupLayoutVariant.DOCS_3x9,
    GroupLayoutVariant.DOCS_4x8,
    GroupLayoutVariant.DOCS_6x6,
    GroupLayoutVariant.DETAIL_3x9,
    GroupLayoutVariant.DETAIL_4x8,
    GroupLayoutVariant.DETAIL_6x6,
];

const layoutVariantStoriesNew: [
    string,
    string,
    GroupLayoutVariant,
    boolean,
][] = [];
allowDisableOptions.forEach(allowDisable => {
    groupVariants.forEach(layoutVariant => {
        layoutVariantStoriesNew.push([
            `ConfigurationEditor/ConfigurationInput/${layoutVariant}`,
            `allowDisable: ${allowDisable}`,
            layoutVariant,
            allowDisable,
        ]);
    });
});

layoutVariantStoriesNew.forEach(testCase => {
    const storyCollection = storiesOf(testCase[0], module);

    // Defines configurationGroup from test case
    const configurationGroup: ConfigurationGroup = {
        ...ComponentBuilderConfigurationGroup,
        documentation: ApiExamplesConfigurationGroup.documentation,
        layoutVariant: testCase[2],
        allowDisable: testCase[3],
    };

    storyCollection.add(testCase[1], () => {
        const [count, increment] = React.useReducer(i => i + 1, 0);
        const [configurationOptionValue, setVal] = React.useState<
            OptionValueInstance
        >(buildConfigurationGroupValue(configurationGroup));

        return (
            <Story>
                <ConfigurationInput
                    configurationGroup={configurationGroup}
                    value={configurationOptionValue}
                    onChange={(updatedVal: OptionValueInstance) => {
                        setVal(updatedVal);
                        increment();
                    }}
                />
                <pre className="p-4 bg-dark text-light rounded mt-4">
                    {JSON.stringify(configurationOptionValue, null, 4)}
                </pre>
                <pre className="p-4 bg-dark text-light rounded mt-4">
                    {JSON.stringify(configurationGroup, null, 4)}
                </pre>
            </Story>
        );
    });
});
