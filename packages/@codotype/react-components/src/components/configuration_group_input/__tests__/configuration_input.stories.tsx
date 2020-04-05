import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ConfigurationInput, buildConfigurationGroupValue } from "../component";
import { OptionValueInstance } from "../../types";
import {
    ComponentBuilderConfigurationGroup,
    ApiExamplesConfigurationGroup,
    ComponentBuilderConfigurationGroupPropertySingleDropdown,
    ComponentBuilderConfigurationGroupPropertyWithInstance,
    ComponentBuilderConfigurationGroupPropertyWithInstance01,
} from "./test_state";
import { Story } from "@src/components/dev";

// // // //

storiesOf("ConfigurationEditor/ConfigurationInput", module).add(
    "renders",
    () => {
        const [count, increment] = React.useReducer(i => i + 1, 0);
        const [configurationOptionValue, setVal] = React.useState<
            OptionValueInstance
        >(
            buildConfigurationGroupValue(
                ComponentBuilderConfigurationGroup.properties,
            ),
        );

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
    },
);

storiesOf("ConfigurationEditor/ConfigurationInput", module).add(
    "single dropdown",
    () => {
        const [count, increment] = React.useReducer(i => i + 1, 0);
        const [configurationOptionValue, setVal] = React.useState<
            OptionValueInstance
        >(
            buildConfigurationGroupValue([
                ComponentBuilderConfigurationGroupPropertySingleDropdown,
            ]),
        );

        return (
            <Story>
                <ConfigurationInput
                    configurationGroup={{
                        ...ComponentBuilderConfigurationGroup,
                        properties: [
                            ComponentBuilderConfigurationGroupPropertySingleDropdown,
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
    },
);

storiesOf("ConfigurationEditor/ConfigurationInput", module).add(
    "nested instance",
    () => {
        const [count, increment] = React.useReducer(i => i + 1, 0);
        const [configurationOptionValue, setVal] = React.useState<
            OptionValueInstance
        >(
            buildConfigurationGroupValue([
                ComponentBuilderConfigurationGroupPropertyWithInstance,
            ]),
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
    },
);

storiesOf("ConfigurationEditor/ConfigurationInput", module).add(
    "instance",
    () => {
        const [count, increment] = React.useReducer(i => i + 1, 0);
        const [configurationOptionValue, setVal] = React.useState<
            OptionValueInstance
        >(
            buildConfigurationGroupValue([
                ComponentBuilderConfigurationGroupPropertyWithInstance01,
            ]),
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
    },
);

storiesOf("ConfigurationEditor/ConfigurationInput", module).add(
    "API Examples - LIST Variant",
    () => {
        const [count, increment] = React.useReducer(i => i + 1, 0);
        const [configurationOptionValue, setVal] = React.useState<
            OptionValueInstance
        >(
            buildConfigurationGroupValue(
                ApiExamplesConfigurationGroup.properties,
            ),
        );

        return (
            <Story>
                <ConfigurationInput
                    configurationGroup={ApiExamplesConfigurationGroup}
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
    },
);

storiesOf("ConfigurationEditor/ConfigurationInput", module).add(
    "API Examples - SIDEBYSIDE Variant",
    () => {
        const [count, increment] = React.useReducer(i => i + 1, 0);
        const [configurationOptionValue, setVal] = React.useState<
            OptionValueInstance
        >(
            buildConfigurationGroupValue(
                ApiExamplesConfigurationGroup.properties,
            ),
        );

        return (
            <Story>
                <ConfigurationInput
                    configurationGroup={{
                        ...ApiExamplesConfigurationGroup,
                        variant: "SIDEBYSIDE",
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
    },
);