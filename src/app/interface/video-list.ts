export interface videoList{
    id: string;
    userId: string;
    title: string;
    description: string;
    thumbnailUrl:string;
    videoUrl: string;
    categories:string[];
    educationalTags:[];
    isFavorite:boolean;
    isFeatured:boolean;
    isActive:boolean;
}