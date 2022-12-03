import {Entity, Property} from "@mikro-orm/core";
import {baseEntity} from "./baseEntity";

@Entity()
export class MedicalForms extends baseEntity {
    @Property({type: "string"})
    original_text!: string;

    @Property({type: "string"})
    abbreviation?: string;

    @Property({type: "string"})
    body_site_of_condition?: string;

    @Property({type: "string"})
    body_site_of_treatment?: string;

    @Property({type: "string"})
    course_of_condition?: string;

    @Property({type: "string"})
    course_of_examination?: string;

    @Property({type: "string"})
    course_of_medication?: string;

    @Property({type: "string"})
    course_of_treatment?: string;

    @Property({type: "string"})
    direction_of_body_structure?: string;

    @Property({type: "string"})
    direction_of_condition?: string;

    @Property({type: "string"})
    direction_of_examination?: string;

    @Property({type: "string"})
    direction_of_treatment?: string;

    @Property({type: "string"})
    dosage_of_medication?: string;

    @Property({type: "string"})
    examination_finds_condition?: string;

    @Property({type: "string"})
    expression_of_gene?: string;

    @Property({type: "string"})
    expression_of_variant?: string;

    @Property({type: "string"})
    form_of_medication?: string;

    @Property({type: "string"})
    frequency_of_condition?: string;

    @Property({type: "string"})
    frequency_of_medication?: string;

    @Property({type: "string"})
    frequency_of_treatment?: string;

    @Property({type: "string"})
    mutation_type_of_gene?: string;

    @Property({type: "string"})
    mutation_type_of_variant?: string;

    @Property({type: "string"})
    qualifier_of_condition?: string;

    @Property({type: "string"})
    relation_of_examination?: string;

    @Property({type: "string"})
    scale_of_condition?: string;

    @Property({type: "string"})
    time_of_condition?: string;

    @Property({type: "string"})
    time_of_event?: string;

    @Property({type: "string"})
    time_of_examination?: string;

    @Property({type: "string"})
    time_of_medication?: string;

    @Property({type: "string"})
    time_of_treatment?: string;

    @Property({type: "string"})
    unit_of_condition?: string;

    @Property({type: "string"})
    unit_of_examination?: string;

    @Property({type: "string"})
    value_of_condition?: string;

    @Property({type: "string"})
    value_of_examination?: string;

    @Property({type: "string"})
    variant_of_gene?: string;

    @Property({type: "string"})
    route_of_medication?: string;

    @Property({type: "string"})
    diagnosis?: string;

    @Property({type: "string"})
    symptom_or_sign?: string;

    @Property({type: "string"})
    medication_name?: string;

    @Property({type: "string"})
    treatment_name?: string;

    constructor(original_text: string, abbreviation: string, body_site_of_condition: string, body_site_of_treatment: string,
                course_of_condition: string, course_of_examination: string, course_of_medication: string,
                course_of_treatment: string, direction_of_body_structure: string, direction_of_condition: string,
                direction_of_examination: string, direction_of_treatment: string, dosage_of_medication: string,
                examination_finds_condition: string, expression_of_gene: string, expression_of_variant: string,
                form_of_medication: string, frequency_of_condition: string, frequency_of_medication: string,
                frequency_of_treatment: string, mutation_type_of_gene: string, mutation_type_of_variant: string,
                qualifier_of_condition: string, relation_of_examination: string, scale_of_condition: string,
                time_of_condition: string, time_of_event: string, time_of_examination: string, time_of_medication: string,
                time_of_treatment: string, unit_of_condition: string, unit_of_examination: string, value_of_condition: string,
                value_of_examination: string, variant_of_gene: string, route_of_medication: string, diagnosis: string,
                symptom_or_sign: string, medication_name: string, treatment_name: string) {
        super();
        this.original_text = original_text;
        this.diagnosis = diagnosis;
        this.symptom_or_sign = symptom_or_sign;
        this.medication_name = medication_name;
        this.treatment_name = treatment_name;
        this.abbreviation = abbreviation;
        this.body_site_of_condition = body_site_of_condition;
        this.body_site_of_treatment = body_site_of_treatment;
        this.course_of_condition = course_of_condition;
        this.course_of_examination = course_of_examination;
        this.course_of_medication = course_of_medication;
        this.course_of_treatment = course_of_treatment;
        this.direction_of_body_structure = direction_of_body_structure;
        this.direction_of_condition = direction_of_condition;
        this.direction_of_examination = direction_of_examination;
        this.direction_of_treatment = direction_of_treatment;
        this.dosage_of_medication = dosage_of_medication;
        this.examination_finds_condition = examination_finds_condition;
        this.expression_of_gene = expression_of_gene;
        this.expression_of_variant = expression_of_variant;
        this.form_of_medication = form_of_medication;
        this.frequency_of_condition = frequency_of_condition;
        this.frequency_of_medication = frequency_of_medication;
        this.frequency_of_treatment = frequency_of_treatment;
        this.mutation_type_of_gene = mutation_type_of_gene;
        this.mutation_type_of_variant = mutation_type_of_variant;
        this.qualifier_of_condition = qualifier_of_condition;
        this.relation_of_examination = relation_of_examination;
        this.route_of_medication = route_of_medication;
        this.scale_of_condition = scale_of_condition;
        this.time_of_condition = time_of_condition;
        this.time_of_event = time_of_event;
        this.time_of_examination = time_of_examination;
        this.time_of_medication = time_of_medication;
        this.time_of_treatment = time_of_treatment;
        this.unit_of_condition = unit_of_condition;
        this.unit_of_examination = unit_of_examination;
        this.value_of_condition = value_of_condition;
        this.value_of_examination = value_of_examination;
        this.variant_of_gene = variant_of_gene;
    }
}