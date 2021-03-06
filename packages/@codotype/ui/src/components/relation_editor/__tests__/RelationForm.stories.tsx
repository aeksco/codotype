import * as React from "react";
import { storiesOf } from "@storybook/react";
import { RelationPropertiesForm } from "../RelationPropertiesForm";
import { Story } from "@src/components/dev";
import { RelationInput } from "../RelationFormModal";
import { testState, RelationType, SchemaSource } from "@codotype/types";
const { userSchema, movieSchema } = testState;

// // // //

const testCases: [string, RelationInput][] = [
    [
        "renders",
        {
            id: "test-01",
            type: RelationType.TO_ONE,
            required: false,
            source: SchemaSource.USER,
            destinationSchemaId: userSchema.id,
            sourceSchemaAlias: "Directed Movie",
            destinationSchemaAlias: "Director",
        },
    ],
];

const storyCollection = storiesOf(
    "RelationEditor/RelationPropertiesForm",
    module,
);
testCases.forEach(testCase => {
    storyCollection.add(testCase[0], () => {
        const [relationInput, setRelationInput] = React.useState(testCase[1]);
        return (
            <Story>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card card-body mb-3">
                            <div className="row">
                                <div className="col-sm-12">
                                    <RelationPropertiesForm
                                        schema={movieSchema}
                                        schemas={[userSchema, movieSchema]}
                                        relationInput={relationInput}
                                        onChange={setRelationInput}
                                        supportedRelationTypes={[
                                            RelationType.BELONGS_TO,
                                            RelationType.HAS_AND_BELONGS_TO_MANY,
                                            RelationType.HAS_MANY,
                                            RelationType.HAS_ONE,
                                            RelationType.TO_ONE,
                                            RelationType.TO_MANY,
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Story>
        );
    });
});
