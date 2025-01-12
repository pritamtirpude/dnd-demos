export const tabs = [
  {
    id: 1,
    rows: [
      {
        columns: [
          {
            id: 11,
            group: [
              {
                id: 111,
                items: [
                  {
                    name: "branch",
                    label: "branch",
                    type: "text",
                    code: "branch",
                    fieldId: 4682,
                    displayColumnNames: "Code,Name",
                    FieldSet: "ID",
                    entityTypeName: "LeadDocument",
                    viewType: 0,
                    validation: {
                      required: true,
                    },
                  },
                  {
                    name: "leadType",
                    label: "Lead Type",
                    type: "select",
                    code: "branch",
                    fieldId: 4684,
                    displayColumnNames: "Name",
                    FieldSet: "ID",
                    entityTypeName: "LeadDocument",
                    viewType: 0,
                    validation: {
                      required: true,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
