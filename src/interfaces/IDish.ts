export default interface IDish{
    id: number;
    name: string;
    description: string | null;
    imgURL: string | null;
    createdAt: Date;
    updatedAt: Date | null;
}