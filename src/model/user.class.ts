export class User {

    firstname: string;
    lastname: string;
    email: string;
    birthDate: number;
    street: string;
    zipCode: number;
    city: string;
    constructor(obj?: any) {
        this.firstname = obj ? obj.firstname : '';
        this.lastname = obj ? obj.lastname : '';
        this.email= obj ? obj.email : '';
        this.birthDate = obj ? obj.birthDate : 0;
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : 0;
        this.city = obj ? obj.city : '';
    }


    public toJson() {
        return {
            firstname: this.firstname,
            lastname: this.lastname,
            email:this.email,
            birthDate: this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
        };
    }
}