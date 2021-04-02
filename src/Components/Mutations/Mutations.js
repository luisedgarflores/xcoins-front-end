import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation signIn($input: SignInInput!) {
    signIn(input: $input) {
      user {
        id
        name
        username
        role
        email
      }
      token {
        token
      }
    }
  }
`;

export const SIGN_UP = gql`
  mutation signUp {
    signUp {
      token
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUsuario($input: DeleteUserInput!) {
    deleteUsuario(input: $input) 
  }
`;

export const CREATE_USUARIO = gql`
  mutation createUsuario($input: CreateUsuarioInput!) {
    createUsuario(input: $input) {
      id
      nombre
    }
  }
`

export const ACCEPT_INVITATION = gql`
  mutation AcceptInvitation($input: AcceptInvitationInput!){
    acceptInvitation(input: $input) {
      invitation
    }
  }
`;

export const CREAR_AVISO = gql`
  mutation createAviso($input: createAvisoInput!) {
    createAviso(input: $input) {
      id
      mensaje
      role
      activo
      createdAt
      usuarios {
        id
        nombre
      }
    }
  }
`;

export const AVISO_LEIDO = gql`
  mutation avisoLeido($input: seHaLeidoInput!) {
    seHaLeido(input: $input) {
      id
      role
    }
  }
`;

export const CREAR_CATEGORIA = gql`
  mutation createCategoria($input: createCategoriaInput!) {
    createCategoria(input: $input) {
      id
      nombre
    }
  }
`;

export const CREAR_DEPARTAMENTO = gql`
  mutation createDepartamento($input: createDepInput!) {
    createDepartamento(input: $input) {
      id
      nombre
      usuarios{
        id
      }
      documentos{
        id
      }
    }
  }
`;

export const DELETE_DOCUMENT = gql`
  mutation deleteDocumento($input: DeleteDocumentoInput!) {
    deleteDocumento(input: $input)
  }
`

export const CREAR_DOCUMENTO = gql`
  mutation createDocumento($input: createDocInput!) {
    createDocumento(input: $input) {
      id
      tipoDoc
      cliente {
        id
        nombre
      }
      status
      periodo
      activo
      createdAt
      categoria {
        id
        nombre
      }
    }
  }
`;

export const UPDATE_DOCUMENTO = gql`
  mutation updateDocumento($input: updateDocumentoInput!) {
    updateDocumento(input: $input)
  }
`;

export const CREAR_ENTRADA_REPORTE = gql`
  mutation createEntradaReporte($input: createEntradaReporteInput!) {
    createEntradaReporte(input: $input) {
      id
      fecha
      tipo
      cliente
      documento
      departamento {
        id
      }
    }
  }
`;

export const CREAR_NOTIFICACION = gql`
  mutation createNotificacion($input: createNotificacionInput!) {
    createNotificacion(input: $input) {
      mensaje
    }
  }
`;