import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useRouter } from "next/router";
import Link from "@mui/material/Link";

const BreadCrumb: React.FC = () => {
  // const route = useRouter();
  const routes: any[] = ["Dashboard", "Kanban"];
  return (
    <Breadcrumbs>
      {routes?.map((route) => (
        <Link underline="hover" key={route} color="inherit" href="#">
          {route}
        </Link>
      ))}
    </Breadcrumbs>
  );
};
export default BreadCrumb;
