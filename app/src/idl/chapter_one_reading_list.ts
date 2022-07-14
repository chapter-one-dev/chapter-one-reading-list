export type ChapterOneReadingList = {
  "version": "0.1.0",
  "name": "chapter_one_reading_list",
  "instructions": [
    {
      "name": "addArticle",
      "accounts": [
        {
          "name": "article",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "collector",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "link",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "article",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "collector",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "link",
            "type": "string"
          },
          {
            "name": "title",
            "type": "string"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "ArticleTitleTooLong",
      "msg": "The provided article title should be 150 characters long maximum."
    },
    {
      "code": 6001,
      "name": "ArticleLinkTooLong",
      "msg": "The provided article link should be 200 characters long maximum."
    },
    {
      "code": 6002,
      "name": "MissingArticleTitle",
      "msg": "An article title must be provided."
    },
    {
      "code": 6003,
      "name": "MissingArticleLink",
      "msg": "An article link must be provided."
    }
  ]
};

export const IDL: ChapterOneReadingList = {
  "version": "0.1.0",
  "name": "chapter_one_reading_list",
  "instructions": [
    {
      "name": "addArticle",
      "accounts": [
        {
          "name": "article",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "collector",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "link",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "article",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "collector",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "link",
            "type": "string"
          },
          {
            "name": "title",
            "type": "string"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "ArticleTitleTooLong",
      "msg": "The provided article title should be 150 characters long maximum."
    },
    {
      "code": 6001,
      "name": "ArticleLinkTooLong",
      "msg": "The provided article link should be 200 characters long maximum."
    },
    {
      "code": 6002,
      "name": "MissingArticleTitle",
      "msg": "An article title must be provided."
    },
    {
      "code": 6003,
      "name": "MissingArticleLink",
      "msg": "An article link must be provided."
    }
  ]
};
