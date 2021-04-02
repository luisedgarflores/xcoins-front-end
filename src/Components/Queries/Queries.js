import { gql } from "@apollo/client";

export const GET_AVISOS = gql`
  query getAvisos {
    getAvisos {
      id
      mensaje
      role
      activo
      createdAt
      usuarios {
        id
        nombre
        role
      }
    }
  }
`;

export const GET_AVISO = gql`
  query getAviso {
    getAviso {
      id
      mensaje
      role
      activo
      createdAt
      usuarios{
        id
        nombre
      }
    }
  }
`;

export const GET_CATEGORIAS = gql`
  query getCategorias {
    getCategorias {
      id
      nombre
    }
  }
`;


export const GET_CATEGORIA = gql`
  query getCategoria {
    getCategoria {
      id
      nombre
    }
  }
`;

export const GET_DEPARTAMENTOS = gql`
  query getDepartamentos {
    getDepartamentos {
      id
      nombre
      usuarios {
        id
        nombre
        role
      }
    }
  }
`;

export const GET_DEPARTAMENTO = gql`
  query getDepartamento {
    getDepartamento {
      id
      nombre
      usuarios{
        id
        nombre
      }
      documentos{
        id
      }
    }
  }
`;

export const GET_USUARIOS = gql`
  query getUsuarios {
    getUsuarios {
      id
      nombre
      role
      departamentos {
        id
        name
      }
    }
  }
`;

export const GET_DOCUMENTOS = gql`
  query getDocumentos {
    getDocumentos {
      id
      tipoDoc
      cliente {
        id
        nombre
      }
      status
      periodo
      departamento {
        id
        name
      }
      activo
      createdAt
      categoria {
        id
        nombre
      }
      nombre
    }
  }
`;


export const GET_DOCUMENTO = gql`
  query downloadFile($input: GetDocumentoInput!) {
    downloadFile(input: $input)
  }
`;

export const GET_UPSERT_DOCUMENTO_INFO = gql`
  query getUpsertDocumentoInfo($input: GetUpsertDocumentoInfoInput!) {
    getUpsertDocumentoInfo(input: $input) {
      clientes{
        id
        nombre
      }
      categorias{
        id
        nombre
      }
    }
  }
`;

export const GET_ENTRADA_REPORTES = gql`
  query getEntradaReportes {
    getEntradaReportes {
      id
      fecha
      tipo
    }
  }
`

export const GET_NOTIFICACIONES = gql`
  query getNotificaciones {
    getNotificaciones {
      mensaje
      tipo
    }
  }
`;

export const GET_NOTIFICACION = gql`
  query getNotificacion {
    getNotificacion {
      destinatario
      mensaje
      emisor
      documento
      tipo
    }
  }
`;

export const ME = gql`
  query me {
    me {
      id
      nombre
      role
      departamento {
        id
      }
      correo
      telefono
      razonSocial
      domicilio
      rfc
      avisos {
        id
      }
      notificaciones {
        id
      }
    }
  }
`;

export const USUARIO = gql`
  query usuario {
    usuario {
      id
      nombre
      role
      departamento {
        id
      }
      correo
      telefono
      razonSocial
      domicilio
      rfc
      avisos {
        id
      }
      notificaciones {
        id
      }
    }
  }
`;

export const USUARIOS = gql`
  query usuarios {
    usuarios {
      id
      nombre
      role
      departamento {
        id
      }
      correo
      telefono
      razonSocial
      domicilio
      rfc
      avisos {
        id
      }
      notificaciones {
        id
      }
    }
  }
`;