export interface Board {
    id: string;
    name: string;
}

export enum NewsStatus {
    Draft = 'draft',
    Published = 'published',
    Archive = 'archived'
}

export interface News {
    id: string;
    boardId: string;
    author: string;
    title: string;
    description: string;
    imageURL: string;
    createdAt: string;
    status: NewsStatus;
}

export interface BoardNews {
    drafts: News[];
    published: News[];
    archives: News[];
}