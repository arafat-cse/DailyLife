export interface videoList{
    id: string;
    userId: string;
    title: string;
    description: string;
    thumbnailUrl:string;
    videoUrl: string;
    categories:[];
    educationalTags:[];
    isFavorite:boolean;
    isFeatured:boolean;
    isActive:boolean;
}