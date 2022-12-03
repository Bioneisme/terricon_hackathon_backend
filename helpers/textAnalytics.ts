import {AzureKeyCredential, TextAnalyticsClient, TextAnalyticsError} from "@azure/ai-text-analytics";
import {AI_API_KEY, AI_ENDPOINT} from "../config/settings";
import {medObj} from "../types";

function nameFormatter(text: string): string {
    text = text.replace(/([A-Z])/g, '_$1').trim();
    return text.toLowerCase().slice(1);
}

export async function textAnalytics(documents: string[]): Promise<{ error: boolean, message: TextAnalyticsError | null, data: medObj | null }> {
    const client = new TextAnalyticsClient(AI_ENDPOINT, new AzureKeyCredential(AI_API_KEY));

    const data: medObj = {
        abbreviation: [], body_site_of_condition: [], body_site_of_treatment: [],
        course_of_condition: [], course_of_examination: [], course_of_medication: [],
        course_of_treatment: [], direction_of_body_structure: [], direction_of_condition: [],
        direction_of_examination: [], direction_of_treatment: [], dosage_of_medication: [],
        examination_finds_condition: [], expression_of_gene: [], expression_of_variant: [],
        form_of_medication: [], frequency_of_condition: [], frequency_of_medication: [],
        frequency_of_treatment: [], mutation_type_of_gene: [], mutation_type_of_variant: [],
        qualifier_of_condition: [], relation_of_examination: [], scale_of_condition: [],
        time_of_condition: [], time_of_event: [], time_of_examination: [], time_of_medication: [],
        time_of_treatment: [], unit_of_condition: [], unit_of_examination: [], value_of_condition: [],
        value_of_examination: [], variant_of_gene: [], route_of_medication: [], diagnosis: [],
        symptom_or_sign: [], medication_name: [], treatment_name: []
    };

    const poller = await client.beginAnalyzeHealthcareEntities(documents, "en", {
        includeStatistics: true,
    });

    const results = await poller.pollUntilDone();

    for await (const result of results) {
        if (!result.error) {
            for (const entity of result.entities) {
                const category = nameFormatter(entity.category);
                if (category in data) {
                    // @ts-ignore
                    data[category].push(entity.text);
                }
            }
            if (result.entityRelations.length > 0) {
                for (const relation of result.entityRelations) {
                    let entities: string = '';
                    for (const role of relation.roles) {
                        entities += role.entity.text + ' ';
                    }
                    const type = nameFormatter(relation.relationType);
                    if (type in data) {
                        // @ts-ignore
                        data[type].push(entities);
                    }
                }
            }
        } else return {error: true, message: result.error, data};
    }

    return {error: false, message: null, data};
}