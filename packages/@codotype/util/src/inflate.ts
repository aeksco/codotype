import { buildTokenPluralization } from "./buildTokenPluralization";
import { makeUniqueId } from "./makeUniqueId";
import {
  RelationType,
  Schema,
  Relation,
  RelationReference,
  InflatedSchema,
  Project,
  InflatedProject
} from "@codotype/types";

// // // //

export function buildRelationReference(params: {
  relation: Relation;
  sourceSchema: Schema;
  destinationSchema: Schema;
}): RelationReference {
  const { relation, sourceSchema, destinationSchema } = params;

  return {
    id: makeUniqueId(),
    type: relation.type,
    sourceSchemaId: sourceSchema.id,
    destinationSchemaId: destinationSchema.id,
    sourceRelationId: relation.id,
    identifiers: {
      source: {
        canonical: { ...sourceSchema.identifiers },
        alias: buildTokenPluralization(
          relation.sourceSchemaAlias || sourceSchema.identifiers.singular.label
        )
      },
      destination: {
        canonical: { ...destinationSchema.identifiers },
        alias: {
          ...buildTokenPluralization(
            relation.destinationSchemaAlias ||
              destinationSchema.identifiers.singular.label
          )
        }
      }
    }
  };
}

// // // //
// // // //

export function buildRelationReferences(params: {
  schema: Schema;
  schemas: Schema[];
}): RelationReference[] {
  const { schema, schemas } = params;

  // Defines array of RelationReferences we're going to return

  return schemas.reduce((previous: RelationReference[], nextSchema: Schema) => {
    return [
      ...previous,
      ...nextSchema.relations
        .filter((r: Relation) => r.destinationSchemaId === schema.id)
        .map(
          (r: Relation): RelationReference => {
            return buildRelationReference({
              sourceSchema: nextSchema,
              destinationSchema: schema,
              relation: r
            });
          }
        )
    ];
  }, []);
}

// // // //

export function buildInflatedRelations(params: {
  schema: Schema;
  schemas: Schema[];
}): RelationReference[] {
  const { schema, schemas } = params;

  // Defines array of RelationReferences we're going to return
  return [
    ...schema.relations.map(
      (r: Relation): RelationReference => {
        const nextSchema: Schema = schemas.find(
          s => s.id === r.destinationSchemaId
        );

        return buildRelationReference({
          sourceSchema: schema,
          destinationSchema: nextSchema,
          relation: r
        });
      }
    )
  ];
}

// // // //

/**
 * inflateSchema
 * Inflates a single Schema and returns an InflatedSchema instance
 * @param params.schema The Schema instance being inflated
 * @param params.schemas Array of all Schema instances
 * @returns A single InflatedSchema instance
 */
export function inflateSchema(params: {
  schema: Schema;
  schemas: Schema[];
}): InflatedSchema {
  const { schema, schemas } = params;

  return {
    id: schema.id,
    attributes: schema.attributes,
    identifiers: {
      ...schema.identifiers
    },
    relations: buildInflatedRelations({ schema, schemas }),
    references: buildRelationReferences({ schema, schemas }),
    // QUESTION - does anything need to be done for the configuration?
    configuration: schema.configuration
  };
}

// // // //

/**
 * inflateSchemas
 * Inflates each schema in params.schemas
 * @param params.schemas - array of Schema instances being inflated
 * @returns array of InflatedSchema instances
 */
export function inflateSchemas(params: {
  schemas: Schema[];
}): InflatedSchema[] {
  return params.schemas.map(
    (s: Schema): InflatedSchema =>
      inflateSchema({
        schemas: params.schemas,
        schema: s
      })
  );
}

// // // //

/**
 * inflateProject
 * @param params
 */
export function inflateProject(params: { project: Project }): InflatedProject {
  const { project } = params;
  return {
    id: project.id,
    schemas: inflateSchemas({ schemas: project.schemas }),
    configuration: project.configuration,
    generatorId: project.generatorId,
    identifiers: project.identifiers,
    generatorVersion: project.generatorVersion
  };
}
