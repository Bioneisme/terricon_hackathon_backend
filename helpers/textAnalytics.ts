import {AzureKeyCredential, TextAnalyticsClient} from "@azure/ai-text-analytics";
import {AI_API_KEY, AI_ENDPOINT} from "../config/settings";
import translate from "google-translate-api-x";

function nameFormatter(text: string): string {
    text = text.replace(/([A-Z])/g, '_$1').trim();
    return text.toLowerCase().slice(1);
}

async function translator(data: Object): Promise<Object> {

    let translatedData: string[] = [];
    const res = await translate(data, {from: 'ru', to: 'en'});
    for (let resKey in res) {
        // @ts-ignore
        translatedData.push(res[resKey].text);
    }
    return translatedData;
}

export async function textAnalytics(documents: string[]) {
    const client = new TextAnalyticsClient(AI_ENDPOINT, new AzureKeyCredential(AI_API_KEY));

    const data = {
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
        } else console.error("\tError:", result.error);
    }

    console.log(data)
    await translator(data);
}