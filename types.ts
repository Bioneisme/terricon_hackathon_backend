import {Request} from "express";
import {Users} from "./entities";

export type UserRequest = Request & { user: Users | undefined, locals: Date };

export type medObj = {
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