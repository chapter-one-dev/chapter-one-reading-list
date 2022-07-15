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
          "name": "link",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteArticle",
      "accounts": [
        {
          "name": "article",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collector",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
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
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "ArticleLinkTooLong",
      "msg": "The provided article link should be 200 characters long maximum."
    },
    {
      "code": 6001,
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
          "name": "link",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteArticle",
      "accounts": [
        {
          "name": "article",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collector",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
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
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "ArticleLinkTooLong",
      "msg": "The provided article link should be 200 characters long maximum."
    },
    {
      "code": 6001,
      "name": "MissingArticleLink",
      "msg": "An article link must be provided."
    }
  ]
};
