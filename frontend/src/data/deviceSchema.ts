export const C_deviceSchema: any = {
  id: "a3b8515c-274e-4d79-83b3-8bb7eaf25e26",
  name: "device",
  kind: "Device",
  description: null,
  default_filter: "name__value",
  display_labels: ["name__value"],
  attributes: [
    {
      id: "b78eb77a-7733-419e-9c88-5e49327a0b45",
      name: "name",
      kind: "Text",
      label: "Name",
      description: null,
      default_value: null,
      enum: null,
      regex: null,
      max_length: null,
      min_length: null,
      inherited: false,
      unique: true,
      branch: true,
      optional: false,
      order_weight: 1000,
    },
    {
      id: "21d22008-ea69-49db-a983-8e869d6cdda6",
      name: "description",
      kind: "Text",
      label: "Description",
      description: null,
      default_value: null,
      enum: null,
      regex: null,
      max_length: null,
      min_length: null,
      inherited: false,
      unique: false,
      branch: true,
      optional: true,
      order_weight: 2000,
    },
    {
      id: "cddf970e-446d-4fd1-bf73-b4f7577b4cc9",
      name: "type",
      kind: "Text",
      label: "Type",
      description: null,
      default_value: null,
      enum: null,
      regex: null,
      max_length: null,
      min_length: null,
      inherited: false,
      unique: false,
      branch: true,
      optional: false,
      order_weight: 3000,
    },
  ],
  relationships: [
    {
      id: "4aa9d82e-c522-49e1-9d39-5ec613af830e",
      name: "site",
      peer: "Location",
      kind: "Attribute",
      label: "Site",
      description: null,
      identifier: "device__location",
      inherited: false,
      cardinality: "one",
      branch: true,
      optional: false,
      filters: [
        {
          name: "id",
          kind: "Text",
          enum: null,
          object_kind: null,
          description: null,
        },
        {
          name: "type__value",
          kind: "Text",
          enum: null,
          object_kind: null,
          description: null,
        },
        {
          name: "description__value",
          kind: "Text",
          enum: null,
          object_kind: null,
          description: null,
        },
        {
          name: "name__value",
          kind: "Text",
          enum: null,
          object_kind: null,
          description: null,
        },
      ],
      order_weight: 100000,
    },
    {
      id: "7507180c-7424-4066-a9e6-3ec828cecbc4",
      name: "status",
      peer: "Status",
      kind: "Attribute",
      label: "Status",
      description: null,
      identifier: "device__status",
      inherited: false,
      cardinality: "one",
      branch: true,
      optional: false,
      filters: [
        {
          name: "id",
          kind: "Text",
          enum: null,
          object_kind: null,
          description: null,
        },
        {
          name: "description__value",
          kind: "Text",
          enum: null,
          object_kind: null,
          description: null,
        },
        {
          name: "label__value",
          kind: "Text",
          enum: null,
          object_kind: null,
          description: null,
        },
        {
          name: "name__value",
          kind: "Text",
          enum: null,
          object_kind: null,
          description: null,
        },
      ],
      order_weight: 101000,
    },
    {
      id: "4d4dc101-bc52-4128-bda1-1c6f9b00d967",
      name: "role",
      peer: "Role",
      kind: "Attribute",
      label: "Role",
      description: null,
      identifier: "device__role",
      inherited: false,
      cardinality: "one",
      branch: true,
      optional: false,
      filters: [
        {
          name: "id",
          kind: "Text",
          enum: null,
          object_kind: null,
          description: null,
        },
        {
          name: "name__value",
          kind: "Text",
          enum: null,
          object_kind: null,
          description: null,
        },
        {
          name: "description__value",
          kind: "Text",
          enum: null,
          object_kind: null,
          description: null,
        },
        {
          name: "label__value",
          kind: "Text",
          enum: null,
          object_kind: null,
          description: null,
        },
      ],
      order_weight: 102000,
    },
    {
      id: "04716852-9cb9-4e9d-869e-6bec9f3b5f12",
      name: "interfaces",
      peer: "Interface",
      kind: "Component",
      label: "Interfaces",
      description: null,
      identifier: "device__interface",
      inherited: false,
      cardinality: "many",
      branch: true,
      optional: true,
      filters: [
        {
          name: "id",
          kind: "Text",
          enum: null,
          object_kind: null,
          description: null,
        },
        {
          name: "speed__value",
          kind: "Number",
          enum: null,
          object_kind: null,
          description: null,
        },
        {
          name: "mtu__value",
          kind: "Number",
          enum: null,
          object_kind: null,
          description: null,
        },
        {
          name: "name__value",
          kind: "Text",
          enum: null,
          object_kind: null,
          description: null,
        },
        {
          name: "description__value",
          kind: "Text",
          enum: null,
          object_kind: null,
          description: null,
        },
        {
          name: "enabled__value",
          kind: "Boolean",
          enum: null,
          object_kind: null,
          description: null,
        },
      ],
      order_weight: 103000,
    },
    {
      id: "84f08ff3-2792-4566-831f-985a3a74df7d",
      name: "asn",
      peer: "AutonomousSystem",
      kind: "Attribute",
      label: "Asn",
      description: null,
      identifier: "autonomoussystem__device",
      inherited: false,
      cardinality: "one",
      branch: true,
      optional: true,
      filters: [
        {
          name: "id",
          kind: "Text",
          enum: null,
          object_kind: null,
          description: null,
        },
        {
          name: "asn__value",
          kind: "Number",
          enum: null,
          object_kind: null,
          description: null,
        },
        {
          name: "name__value",
          kind: "Text",
          enum: null,
          object_kind: null,
          description: null,
        },
        {
          name: "description__value",
          kind: "Text",
          enum: null,
          object_kind: null,
          description: null,
        },
      ],
      order_weight: 104000,
    },
    {
      id: "00570181-ea0f-4cf8-b023-3d7acc7f9501",
      name: "tags",
      peer: "Tag",
      kind: "Attribute",
      label: "Tags",
      description: null,
      identifier: "device__tag",
      inherited: false,
      cardinality: "many",
      branch: true,
      optional: true,
      filters: [
        {
          name: "id",
          kind: "Text",
          enum: null,
          object_kind: null,
          description: null,
        },
        {
          name: "name__value",
          kind: "Text",
          enum: null,
          object_kind: null,
          description: null,
        },
        {
          name: "description__value",
          kind: "Text",
          enum: null,
          object_kind: null,
          description: null,
        },
      ],
      order_weight: 105000,
    },
  ],
  label: "Device",
  inherit_from: [],
  groups: [],
  branch: true,
  filters: [
    {
      name: "ids",
      kind: "Text",
      enum: null,
      object_kind: null,
      description: null,
    },
    {
      name: "description__value",
      kind: "Text",
      enum: null,
      object_kind: null,
      description: null,
    },
    {
      name: "type__value",
      kind: "Text",
      enum: null,
      object_kind: null,
      description: null,
    },
    {
      name: "name__value",
      kind: "Text",
      enum: null,
      object_kind: null,
      description: null,
    },
    {
      name: "site__id",
      kind: "Object",
      enum: null,
      object_kind: "Location",
      description: null,
    },
    {
      name: "tags__id",
      kind: "Object",
      enum: null,
      object_kind: "Tag",
      description: null,
    },
    {
      name: "asn__id",
      kind: "Object",
      enum: null,
      object_kind: "AutonomousSystem",
      description: null,
    },
    {
      name: "status__id",
      kind: "Object",
      enum: null,
      object_kind: "Status",
      description: null,
    },
    {
      name: "role__id",
      kind: "Object",
      enum: null,
      object_kind: "Role",
      description: null,
    },
  ],
};

export const C_deviceAttributeColumns = [
  { label: "Name", name: "name", kind: "Text" },
  { label: "Description", name: "description", kind: "Text" },
  { label: "Type", name: "type", kind: "Text" },
];

export const C_deviceRelationshipColumns = [
  { label: "Site", name: "site", paginated: false },
  { label: "Status", name: "status", paginated: false },
  { label: "Role", name: "role", paginated: false },
  { label: "Asn", name: "asn", paginated: false },
  { label: "Tags", name: "tags", paginated: true },
];
export const C_deviceObjectColumns = [
  { label: "Name", name: "name", kind: "Text" },
  { label: "Description", name: "description", kind: "Text" },
  { label: "Type", name: "type", kind: "Text" },
  { label: "Site", name: "site", paginated: false },
  { label: "Status", name: "status", paginated: false },
  { label: "Role", name: "role", paginated: false },
  { label: "Asn", name: "asn", paginated: false },
  { label: "Tags", name: "tags", paginated: true },
];
