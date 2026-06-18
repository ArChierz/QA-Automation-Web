export const schema_readUser = {
  "title": "Generated schema for Root",
  "type": "object",
  "properties": {
    "page": {
      "type": "number"
    },
    "per_page": {
      "type": "number"
    },
    "total": {
      "type": "number"
    },
    "total_pages": {
      "type": "number"
    },
    "data": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number"
          },
          "email": {
            "type": "string"
          },
          "first_name": {
            "type": "string"
          },
          "last_name": {
            "type": "string"
          },
          "avatar": {
            "type": "string"
          }
        },
        "required": [
          "id",
          "email",
          "first_name",
          "last_name",
          "avatar"
        ]
      }
    },
    "support": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string"
        },
        "text": {
          "type": "string"
        }
      },
      "required": [
        "url",
        "text"
      ]
    },
    "_meta": {
      "type": "object",
      "properties": {
        "powered_by": {
          "type": "string"
        },
        "docs_url": {
          "type": "string"
        },
        "upgrade_url": {
          "type": "string"
        },
        "example_url": {
          "type": "string"
        },
        "variant": {
          "type": "string"
        },
        "message": {
          "type": "string"
        },
        "cta": {
          "type": "object",
          "properties": {
            "label": {
              "type": "string"
            },
            "url": {
              "type": "string"
            }
          },
          "required": [
            "label",
            "url"
          ]
        },
        "context": {
          "type": "string"
        }
      },
      "required": [
        "powered_by",
        "docs_url",
        "upgrade_url",
        "example_url",
        "variant",
        "message",
        "cta",
        "context"
      ]
    }
  },
  "required": [
    "page",
    "per_page",
    "total",
    "total_pages",
    "data",
    "support",
    "_meta"
  ]
}

export const schema_authLogin = {
  "title": "Generated schema for Root",
  "type": "object",
  "properties": {
    "token": {
      "type": "string"
    },
    "_meta": {
      "type": "object",
      "properties": {
        "powered_by": {
          "type": "string"
        },
        "docs_url": {
          "type": "string"
        },
        "upgrade_url": {
          "type": "string"
        },
        "example_url": {
          "type": "string"
        },
        "variant": {
          "type": "string"
        },
        "message": {
          "type": "string"
        },
        "cta": {
          "type": "object",
          "properties": {
            "label": {
              "type": "string"
            },
            "url": {
              "type": "string"
            }
          },
          "required": [
            "label",
            "url"
          ]
        },
        "context": {
          "type": "string"
        }
      },
      "required": [
        "powered_by",
        "docs_url",
        "upgrade_url",
        "example_url",
        "variant",
        "message",
        "cta",
        "context"
      ]
    }
  },
  "required": [
    "token",
    "_meta"
  ]
}
