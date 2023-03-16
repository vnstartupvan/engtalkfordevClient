import { IUserResponse } from '@libs/models/user';
export type IRoom = {
    id: string;
    users: IUserResponse[];
    topic: string;
    level: string;
    userLimit: number;
};

// id: ObjectId,
// url: { type: String, require: true },
// groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// users: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
// }],
// userLimit: { type: Number, default: 10 },
// topic: { type: String, default: 'Any' },
// language: { type: String, default: 'Any' },
// level: { type: String, default: 'Any' },
// }, {
// timestamps: true,
// });
export const roomData = [
    {
        id: 1,
        users: [
            {
                fullname: 'John Smith',
            },
            {
                fullname: 'Tom Folk',
            },
            {
                fullname: 'David Grandy',
            },
            {
                fullname: 'Nobi Nobita',
            },
        ],
        topic: 'React JS',
        level: 'Junior',
        userLimit: 4,
    },
    {
        id: 1,
        users: [
            {
                fullname: 'John Smith',
            },
            {
                fullname: 'Tom Folk',
            },
            {
                fullname: 'David Grandy',
            },
            {
                fullname: 'Nobi Nobita',
            },
        ],
        topic: 'Mongodb JS',
        level: 'Junior',
        userLimit: 4,
    },
    {
        id: 2,
        users: [
            {
                fullname: 'John Smith',
            },
            {
                fullname: 'Tom Folk',
            },
            {
                fullname: 'David Grandy',
            },
        ],
        topic: 'Socket JS',
        level: 'Junior',
        userLimit: 3,
    },
    {
        id: 3,
        users: [
            {
                fullname: 'David Grandy',
            },
            {
                fullname: 'Nobi Nobita',
            },
        ],
        topic: 'Next JS',
        level: 'Junior',
        userLimit: 2,
    },
];

export const userData = [
    {
        fullname: 'John Smith',
    },
    {
        fullname: 'Tom Folk',
    },
    {
        fullname: 'David Grandy',
    },
    {
        fullname: 'Nobi Nobita',
    },
];
