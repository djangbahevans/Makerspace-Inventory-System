export type ID = string;

export type CurrentUser = {
  _id: ID;
};

export type GetUserQueryData = {
  currentUser: CurrentUser | null;
};

export type LoginMutationData = {
  login: {
    _id: ID;
    name: string;
    username: string;
  } | null;
};

export type LoginMutationVars = {
  username: string;
  password: string;
};

export type LogoutMutationData = {
  logout: {
    _id: ID;
  } | null;
};

export type Stock = {
  _id: ID;
  name: string;
  quantity: number;
  numberInStock: number;
};

export type StocksQueryData = {
  stocks: Stock[];
};

export type StockName = {
  name: string;
};

export type GetNamesQueryData = {
  stocks: StockName[];
};

export type AddStockMutationData = {
  createStock: Stock | null;
};

export type AddStockMutationVars = {
  name: string;
  quantity: number;
  numberInStock: number;
};

export type EditStockMutationData = {
  editStock: Stock | null;
};

export type EditStockMutationVars = {
  id: ID;
  quantity: number;
  numberInStock: number;
};

export type RequisitionItem = {
  name: string;
  _id?: ID;
};

export type Requisition = {
  _id: ID;
  name: string;
  role: string | null;
  returnDate: string;
  item: RequisitionItem;
};

export type RequisitionsQueryData = {
  requisitions: Requisition[];
};

export type CreateRequisitionMutationData = {
  createRequisition: Requisition | null;
};

export type CreateRequisitionMutationVars = {
  name: string;
  item: ID;
  role?: string | null;
  returnDate: string;
};

export type EditRequisitionMutationData = {
  editRequisition: Requisition | null;
};

export type EditRequisitionMutationVars = {
  id: ID;
  role?: string | null;
  returnDate: string;
};

export type DeleteRequisitionMutationData = {
  deleteRequisition: {
    _id: ID;
    item: {
      _id: ID;
      name: string;
    };
  } | null;
};

export type DeleteRequisitionMutationVars = {
  id: ID;
};
