import {createSchemaMetadata} from "./002_create_schema_metadata";
import {addSchemaVersionToBuildings} from "./001_add_schema_version_to_buildings";
import {addIsConstructionToBuildings} from "./003_add_isConstruction_field_to_buildings";


export const migrations = [
    addSchemaVersionToBuildings,
    createSchemaMetadata,
    addIsConstructionToBuildings
].sort((a, b) => a.version - b.version);