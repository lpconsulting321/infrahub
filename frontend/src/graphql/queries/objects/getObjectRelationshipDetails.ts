import Handlebars from "handlebars";

export const getObjectRelationshipsDetails = Handlebars.compile(`query {{kind.value}} {
  {{name}} (ids: ["{{objectid}}"]) {
    {{relationship}} {
      id
      display_label
      {{#each columns}}
      {{this.name}} {
        value
      }
      {{/each}}
      __typename
      _relation__is_visible
      _relation__is_protected
      _updated_at
      _relation__owner {
        id
        display_label
        __typename
      }
      _relation__source {
          id
          display_label
          __typename
      }
    }
  }
}
`);

export const getObjectRelationshipsDetailsPaginated = Handlebars.compile(`query {{kind.value}} {
  {{name}} (ids: ["{{objectid}}"]) {
    edges {
      node {
        {{relationship}}{{#if filters}}({{{filters}}}){{/if}} {
          count
          edges {
            node {
              id
              display_label
              {{#each columns}}
              {{this.name}} {
                value
              }
              {{/each}}
              __typename
              _updated_at
            }
          }
        }
      }
    }
  }
}
`);

// export const getObjectRelationshipsDetailsOnePaginated = Handlebars.compile(`query {{kind.value}} {
//   {{name}} (ids: ["{{objectid}}"]{{#if filters}},{{{filters}}}{{/if}}) {
//     edges {
//       node {
//         {{relationship}}{{#if filters}}({{{filters}}}){{/if}} {
//           count
//           edges {
//             node {
//               id
//               display_label
//               {{#each columns}}
//               {{this.name}} {
//                 value
//               }
//               {{/each}}
//               __typename
//               _updated_at

//               _relation__is_visible
//               _relation__is_protected
//               _relation__owner {
//                 id
//                 display_label
//                 __typename
//               }
//               _relation__source {
//                   id
//                   display_label
//                   __typename
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
// `);
