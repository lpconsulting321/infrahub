import { constructPathForIpam } from "@/screens/ipam/common/utils";
import {
  IP_ADDRESS_GENERIC,
  IP_PREFIX_GENERIC,
  IPAM_QSP,
  IPAM_ROUTE,
} from "@/screens/ipam/constants";
import { store } from "@/state";
import { profilesAtom, schemaState } from "@/state/atoms/schema.atom";
import { constructPath, overrideQueryParams } from "./fetch";
import { RESOURCE_GENERIC_KIND } from "@/screens/resource-manager/constants";

const regex = /^Related/; // starts with Related

export const getObjectDetailsUrl = (nodeId: string, nodeType: string): string => {
  const peerKind: string = nodeType?.replace(regex, "");

  return `/objects/${peerKind}/${nodeId}`;
};

export const getObjectDetailsUrl2 = (
  objectKind: string,
  objectId?: string,
  overrideParams?: overrideQueryParams[]
) => {
  const nodes = store.get(schemaState);
  const profiles = store.get(profilesAtom);
  const schema = [...nodes, ...profiles].find(({ kind }) => kind === objectKind);
  if (!schema) return constructPath("/", overrideParams);

  const inheritFrom = schema.inherit_from;

  if (inheritFrom?.includes(IP_PREFIX_GENERIC)) {
    return constructPathForIpam(`${IPAM_ROUTE.PREFIXES}/${objectId}`, overrideParams);
  }

  if (inheritFrom?.includes(IP_ADDRESS_GENERIC)) {
    return constructPathForIpam(`${IPAM_ROUTE.ADDRESSES}/${objectId}`, [
      { name: IPAM_QSP.TAB, value: "ip-details" },
      ...(overrideParams ?? []),
    ]);
  }

  if (inheritFrom?.includes(RESOURCE_GENERIC_KIND)) {
    return constructPathForIpam(`/resource-manager/${objectId}`, overrideParams);
  }

  const path = objectId ? `/objects/${objectKind}/${objectId}` : `/objects/${objectKind}`;
  return constructPath(path, overrideParams);
};
