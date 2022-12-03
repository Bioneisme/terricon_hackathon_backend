import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";
import {AI_API_KEY, AI_ENDPOINT} from "../config/settings";

export async function textAnalytics(documents: string[]) {
    const client = new TextAnalyticsClient(AI_ENDPOINT, new AzureKeyCredential(AI_API_KEY));

    const poller = await client.beginAnalyzeHealthcareEntities(documents, "en", {
        includeStatistics: true,
    });

    const results = await poller.pollUntilDone();

    for await (const result of results) {
        console.log(`- Document ${result.id}`);
        if (!result.error) {
            console.log("\tRecognized Entities:");
            for (const entity of result.entities) {
                console.log(`\t- Entity "${entity.text}" of type ${entity.category}`);
                // if (entity.dataSources.length > 0) {
                //     console.log("\t and it can be referenced in the following data sources:");
                //     for (const ds of entity.dataSources) {
                //         console.log(`\t\t- ${ds.name} with Entity ID: ${ds.entityId}`);
                //     }
                // }
            }
            if (result.entityRelations.length > 0) {
                console.log(`\tRecognized relations between entities:`);
                for (const relation of result.entityRelations) {
                    console.log(
                        `\t\t- Relation of type ${relation.relationType} found between the following entities:`
                    );
                    for (const role of relation.roles) {
                        console.log(`\t\t\t- "${role.entity.text}" with the role ${role.name}`);
                    }
                }
            }
        } else console.error("\tError:", result.error);
    }
}