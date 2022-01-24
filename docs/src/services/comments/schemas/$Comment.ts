/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Comment = {
    description: `Comment object delivered by api.`,
    properties: {
        id: {
            type: 'string',
            description: `Id of Comment`,
            isReadOnly: true,
        },
        name: {
            type: 'string',
            description: `Name of the comment author`,
            isRequired: true,
        },
        content: {
            type: 'string',
            description: `Comment Content`,
            isRequired: true,
        },
        profile: {
            type: 'string',
            description: `URL for Profile Picture`,
            isReadOnly: true,
            format: 'uri',
        },
        time: {
            type: 'string',
            description: `Timestamp comment was created at`,
            isReadOnly: true,
            format: 'date-time',
        },
    },
} as const;
