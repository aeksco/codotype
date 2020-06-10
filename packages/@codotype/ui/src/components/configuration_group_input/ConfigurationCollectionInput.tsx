import * as React from "react";
import {
    OptionType,
    OptionValue,
    OptionValueInstance,
    ConfigurationGroupProperty,
    TokenPluralization,
} from "@codotype/types";
import classnames from "classnames";
import { ConfigurationInputChild } from "./ConfigurationInputChild";
import { ConfigurationInputFormGroup } from "./ConfigurationInputFormGroup";
import {
    buildConfigurationGroupPropertyValue,
    makeUniqueId,
} from "@codotype/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// // // //

interface CollectionItem {
    id: string;
    [key: string]: OptionValue;
}

// // // //

function CollectionItemForm(props: {
    properties: ConfigurationGroupProperty[];
    value: CollectionItem;
    identifiers: TokenPluralization;
    onSubmit: (updatedCollectionItem: CollectionItem) => void;
    onCancel: () => void;
}) {
    const { identifiers } = props;
    // NOTE - default value is defined before being passed into CollectionItemForm
    const [formValues, setFormValues] = React.useState<CollectionItem>(
        props.value,
    );

    // Updates formValues state when props.value changes
    // TODO - make sure to define a default value here
    React.useEffect(() => {
        setFormValues({
            ...props.value,
        });
    }, [props.value.id]);

    return (
        <div className="card card-body">
            <form
                onSubmit={e => {
                    e.preventDefault();
                    props.onSubmit(formValues);
                }}
            >
                <p className="lead">
                    {formValues.id ? "Edit" : "New"}{" "}
                    {identifiers.singular.label}
                </p>
                {props.properties.map(
                    (property: ConfigurationGroupProperty) => {
                        // TODO - handle nested instance + collection
                        return (
                            <ConfigurationInputFormGroup
                                enabled={
                                    // @ts-ignore
                                    formValues[property.identifier].enabled
                                }
                                onChangeEnabled={(updatedEnabled: boolean) => {
                                    const updatedPropertyValue: OptionValue =
                                        formValues[property.identifier];
                                    // @ts-ignore
                                    updatedPropertyValue.enabled = updatedEnabled;
                                    const updatedValue: CollectionItem = {
                                        ...formValues,
                                        [property.identifier]: updatedPropertyValue,
                                    };
                                    setFormValues(updatedValue);
                                }}
                                property={property}
                                className="mt-3"
                            >
                                <ConfigurationInputChild
                                    value={formValues[property.identifier]}
                                    property={property}
                                    onChange={(updatedValue: OptionValue) => {
                                        setFormValues({
                                            ...formValues,
                                            [property.identifier]: updatedValue,
                                        });
                                    }}
                                />
                                {/* <pre>{JSON.stringify(props.value, null, 4)}</pre> */}
                            </ConfigurationInputFormGroup>
                        );
                    },
                )}

                <hr />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-success" type="submit">
                        {formValues.id ? "Update" : "Create"}
                    </button>

                    <button
                        className="btn btn-secondary ml-2"
                        onClick={() => {
                            props.onCancel();
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

// // // //

interface ConfigurationCollectionInputProps {
    properties: ConfigurationGroupProperty[];
    label: string;
    value: OptionValue;
    identifiers: TokenPluralization;
    onChange: (updatedVal: OptionValue) => void;
}
export function ConfigurationCollectionInput(
    props: ConfigurationCollectionInputProps,
) {
    const { identifiers, value } = props;
    console.log(value);

    // Stores the current value of the collection
    // @ts-ignore
    const [collectionValue, setCollectionValue] = React.useState<
        CollectionItem[]
        // @ts-ignore
    >([]);
    // >(value.value);

    // New + Edit hooks
    const [
        newCollectionItem,
        setNewCollectionItem,
    ] = React.useState<CollectionItem | null>(null);
    const [
        editCollectionItem,
        setEditCollectionItem,
    ] = React.useState<CollectionItem | null>(null);

    // React.useEffect(() => {
    //     props.onChange({
    //         // @ts-ignore
    //         // ...value,
    //         // value: collectionValue,
    //     });
    // }, [collectionValue]);

    function buildNewCollectionItem() {
        return props.properties.reduce(
            (val, property) => {
                return {
                    ...val,
                    [property.identifier]: buildConfigurationGroupPropertyValue(
                        property,
                    ),
                };
            },
            { id: "" },
        );
    }

    return (
        <div className="row mb-4">
            <div className="col-sm-4">
                <button
                    className="btn btn-block btn-primary"
                    onClick={() => {
                        setEditCollectionItem(null);
                        console.log(buildNewCollectionItem());
                        setNewCollectionItem(buildNewCollectionItem());
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    New {identifiers.singular.label}
                </button>

                <ul className="list-group mt-3">
                    {collectionValue.map(
                        (collectionItem: CollectionItem, i: number) => {
                            return (
                                <li
                                    key={String(i)}
                                    className={classnames(
                                        "list-group-item list-group-item-action",
                                        {
                                            active:
                                                editCollectionItem !== null &&
                                                collectionItem.id ===
                                                    editCollectionItem.id,
                                        },
                                    )}
                                    onClick={() => {
                                        setNewCollectionItem(null);
                                        setEditCollectionItem(collectionItem);
                                    }}
                                >
                                    {JSON.stringify(collectionItem)}
                                </li>
                            );
                        },
                    )}

                    {collectionValue.length === 0 && (
                        <li className="list-group-item">
                            No {identifiers.plural.label} defined
                        </li>
                    )}
                </ul>
            </div>
            <div className="col-sm-8">
                {newCollectionItem !== null && (
                    <CollectionItemForm
                        value={newCollectionItem}
                        identifiers={identifiers}
                        properties={props.properties}
                        onSubmit={updatedCollectionItem => {
                            // Updates collectionValue
                            setCollectionValue([
                                ...collectionValue,
                                {
                                    ...updatedCollectionItem,
                                    id: makeUniqueId(),
                                },
                            ]);

                            // Clears newCollectionItem
                            setNewCollectionItem(null);
                        }}
                        onCancel={() => {
                            setNewCollectionItem(null);
                        }}
                    />
                )}

                {editCollectionItem !== null && (
                    <CollectionItemForm
                        value={editCollectionItem}
                        identifiers={identifiers}
                        properties={props.properties}
                        onSubmit={updatedCollectionItem => {
                            // Updates collectionValue
                            setCollectionValue(
                                collectionValue.map(c => {
                                    if (c.id === editCollectionItem.id) {
                                        return updatedCollectionItem;
                                    }
                                    return c;
                                }),
                            );

                            // Clears newCollectionItem
                            setEditCollectionItem(null);
                        }}
                        onCancel={() => {
                            setEditCollectionItem(null);
                        }}
                    />
                )}

                {editCollectionItem === null && newCollectionItem === null && (
                    <p>Render Documentation Here</p>
                )}
            </div>
            {/* <pre>{JSON.stringify(props.configurationGroup, null, 4)}</pre> */}
        </div>
    );
}
