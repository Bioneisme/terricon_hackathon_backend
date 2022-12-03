import {Entity, Property} from "@mikro-orm/core";
import {baseEntity} from "./baseEntity";

@Entity()
export class Records extends baseEntity {
    @Property({type: "string"})
    title!: string;

    @Property({type: "string"})
    fields!: string;


    constructor(title: string, fields: string) {
        super();
        this.title = title;
        this.fields = fields;
    }
}