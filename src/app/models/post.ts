export class Post {

    id?: number;
    name: string;
    header: string;
    body: string;
    imageURL: string;

    constructor(name: string, header: string, body: string, imageURL: string, id?: number) {
        this.id = id;
        this.name = name;
        this.header = header;
        this.body = body;
        this.imageURL = imageURL;

    }

}
