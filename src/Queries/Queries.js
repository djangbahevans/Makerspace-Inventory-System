import gql from 'graphql-tag';


export const EDIT_REQUISITION_MUTATION = gql `
            mutation editRequisitionMutation($id: ID!, $role: String, $returnDate: String!) {
                editRequisition (data: {
                    role: $role
                    returnDate: $returnDate
                },
                id: $id) {
                    _id
                    name
                    role
                    item {
                        name
                    }
                    returnDate
                }
            }
        `

export const CREATE_REQUISITION_MUTATION = gql `
            mutation createRequisitionMutation($name: String!, $item: ID!, $role: String, $returnDate: String!) {
                createRequisition(data: {
                    name: $name
                    item: $item
                    role: $role
                    returnDate: $returnDate
                }) {
                    name
                    item {
                        name
                    }
                        role
                        returnDate
                }
            }
        `

export const GET_NAMES_QUERY = gql `
        {
            stocks {
                name
            }
        }
        `

export const LOAD_REQUISITIONS_QUERY = gql `
        {
            requisitions {
                _id
                name
                role
                returnDate
                item {
                    name
                }
            }
        }
        `

export const ADD_STOCK_MUTATION = gql `
        mutation createStock($name: String!, $quantity: Int!, $numberInStock:Int!) {
            createStock(data: {
                name: $name, 
                quantity: $quantity,
                numberInStock: $numberInStock
            }) {
                _id
            }
        }
        `

export const EDIT_STOCK_MUTATION = gql `
        mutation editStock($id: ID!, $name: String!, $quantity: Int!, $numberInStock:Int!) {
            editStock(data: {
                name: $name,
                quantity: $quantity,
                numberInStock: $numberInStock
            }, id: $id) {
                _id
            }
        }
        `

export const LOAD_STOCKS_QUERY = gql `
        {
            stocks {
                _id
                name
                quantity
                numberInStock
            }
        }
        `

export const LOG_OUT_MUTATION = gql `
        mutation logout {
            logout {
                _id
            }
        }
        `

export const LOGIN_MUTATION = gql `
        mutation login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
                _id
                name
                username
            }
        }
        `

export const GET_USER_QUERY = gql `
        {
            currentUser {
                _id
            }
        }
        `
export const DELETE_REQUISITION_MUTATION = gql `
        mutation deleteRequisition($id: ID!) {
            deleteRequisition(id: $id) {
                _id
            }
        }
    `