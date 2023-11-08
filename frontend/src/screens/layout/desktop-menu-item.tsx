import { NavLink, useParams } from "react-router-dom";
import useFilters from "../../hooks/useFilters";
import { classNames } from "../../utils/common";

interface Props {
  path: string;
  title: string | undefined;
}

const getActiveStatus = (isActive: boolean, path: string, params?: any) => {
  if (!isActive) {
    return false;
  }

  if (window.location.pathname.includes("/groups")) {
    if (path === "/groups") {
      // Do not be active if it's the /groups menu item,
      // and we are displaying /groups/kind
      return !params.groupname;
    }
  }

  return true;
};

export const DropDownMenuItem = (props: Props) => {
  const { path } = props;

  const params = useParams();
  const [, setFilters] = useFilters();
  const onClickMenuItem = () => setFilters();

  return (
    <NavLink to={path} onClick={onClickMenuItem}>
      {({ isActive }) => {
        const isItemActive = getActiveStatus(isActive, path, params);

        return (
          <div
            className={classNames(
              "p-2 m-1 group flex w-full items-center rounded-md text-sm font-medium text-gray-600",
              isItemActive ? "bg-gray-300" : "hover:bg-gray-100 hover:text-gray-900"
            )}>
            {props.title}
          </div>
        );
      }}
    </NavLink>
  );
};
