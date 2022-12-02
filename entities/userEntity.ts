import {Entity, Property} from "@mikro-orm/core";
import {baseEntity} from "./baseEntity";

@Entity()
export class Users extends baseEntity {
    @Property({type: "string"})
    email!: string;

    @Property({type: "string"})
    name!: string;

    @Property({type: "string"})
    password!: string;

    constructor(name: string, password: string, email: string) {
        super();
        this.name = name;
        this.password = password;
        this.email = email;
    }
}