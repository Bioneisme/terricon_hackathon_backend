CREATE TABLE IF NOT EXISTS medical_forms
(
    id SERIAL NOT NULL PRIMARY KEY,
    original_text text NOT NULL,
    translated_text text NOT NULL,
    form_type character varying (50) NOT NULL,
    ptn_name character varying (100) NOT NULL,
    ptn_gender character varying (5) NOT NULL,
    ptn_iin character varying (20) NOT NULL,
    ptn_number character varying (50) NOT NULL,
    ptn_address character varying (100) NOT NULL,
    ptn_dd character varying (50) NOT NULL,
    doctor_id integer,
    pdf_url text,
    abbreviation text,
    body_site_of_condition text,
    body_site_of_treatment text,
    course_of_condition text,
    course_of_examination text,
    course_of_medication text,
    course_of_treatment text,
    direction_of_body_structure text,
    direction_of_condition text,
    direction_of_examination text,
    direction_of_treatment text,
    dosage_of_medication text,
    examination_finds_condition text,
    expression_of_gene text,
    expression_of_variant text,
    form_of_medication text,
    frequency_of_condition text,
    frequency_of_medication text,
    frequency_of_treatment text,
    mutation_type_of_gene text,
    mutation_type_of_variant text,
    qualifier_of_condition text,
    relation_of_examination text,
    scale_of_condition text,
    time_of_condition text,
    time_of_event text,
    time_of_examination text,
    route_of_medication text,
    variant_of_gene text,
    value_of_examination text,
    value_of_condition text,
    unit_of_examination text,
    unit_of_condition text,
    time_of_treatment text,
    time_of_medication text,
    diagnosis text,
    medication_name text,
    symptom_or_sign text,
    treatment_name text,
    created_at character varying(50) NOT NULL,
    updated_at character varying(50) NOT NULL,
    CONSTRAINT medical_forms_doctor_id_fkey FOREIGN KEY (doctor_id)
    REFERENCES public.doctors (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID
);

CREATE TABLE IF NOT EXISTS doctors
(
    id SERIAL NOT NULL PRIMARY KEY,
    IIN character varying(20) NOT NULL,
    name character varying(100) NOT NULL,
    role character varying(20) NOT NULL,
    password character varying(255) NOT NULL,
    created_at character varying(50) NOT NULL,
    updated_at character varying(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS records
(
    id SERIAL NOT NULL PRIMARY KEY,
    title character varying(50) NOT NULL,
    fields text NOT NULL,
    created_at character varying(50) NOT NULL,
    updated_at character varying(50) NOT NULL
);