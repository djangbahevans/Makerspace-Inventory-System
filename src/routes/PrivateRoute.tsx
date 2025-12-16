import { useQuery } from "@apollo/client/react";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { GET_USER_QUERY } from "../queries/Queries";
import type { GetUserQueryData } from "../queries/types";

type Props = PropsWithChildren;

export const PrivateRoute = ({ children }: Props) => {
  const { data, loading } = useQuery<GetUserQueryData>(GET_USER_QUERY);

  if (loading) return null;
  if (!data?.currentUser) return <Navigate to="/" replace />;

  return children;
};

export default PrivateRoute;
