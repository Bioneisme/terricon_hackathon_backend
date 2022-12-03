import {Entity, Property} from "@mikro-orm/core";
import {baseEntity} from "./baseEntity";

@Entity()
export class Doctors extends baseEntity {
    @Property({type: "string"})
    IIN!: string;

    @Property({type: "string"})
    name!: string;

    @Property({type: "string"})
    password!: string;

    @Property({type: "string"})
    role!: string;

    constructor(name: string, password: string, IIN: string, role: string) {
        super();
        this.name = name;
        this.password = password;
        this.IIN = IIN;
        this.role = role;
    }
}