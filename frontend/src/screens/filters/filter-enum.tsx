import { useEffect, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { classNames } from "../../App";
import { useAtom } from "jotai";
import { schemaState } from "../../state/atoms/schema.atom";
import { gql } from "graphql-request";
import { graphQLClient } from "../..";
import ErrorScreen from "../error-screen/error-screen";
import LoadingScreen from "../loading-screen/loading-screen";
import { comboxBoxFilterState } from "../../state/atoms/filters.atom";
import { components } from "../../infraops";

interface Props {
  filter: components["schemas"]["FilterSchema"];
}

declare var Handlebars: any;
const template = Handlebars.compile(`query {{kind.value}} {
    {{name}} {
        id
        display_label
    }
}
`);

export default function FilterComboEnum(props: Props) {
  const { filter } = props;
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useAtom(comboxBoxFilterState);
  const [objectRows, setObjectRows] = useState<any[] | undefined>();
  const currentFilter = filters.filter((row) => row.name === filter.name);
  const enums: string[] = (filter.enum as any) || [];

  const filteredRows =
    query === ""
      ? enums
      : enums.filter((row) => {
          return row.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      value={currentFilter.length ? currentFilter[0] : null}
      onChange={(selected: any) => {
        setFilters([
          ...filters.filter((row) => row.name !== filter.name),
          {
            value: selected,
            display_label: selected,
            name: filter.name,
          },
        ]);
      }}
    >
      <Combobox.Label className="block text-sm font-medium text-gray-700">
        {filter.name}
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(row: any) => (row ? row.display_label : "")}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredRows.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredRows.map((row) => (
              <Combobox.Option
                key={row}
                value={row}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected ? "font-semibold" : ""
                      )}
                    >
                      {row}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
