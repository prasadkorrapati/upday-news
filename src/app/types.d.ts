export interface Board {
    id: string;
    name: string;
}

// eslint-disable-next-line no-shadow
export enum NewsStatus {
    draft = 'draft',
    published = 'published',
    archive = 'archived'
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

export interface UserDetails {
    userName: string;
    email: string;
}
