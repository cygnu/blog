import { gql } from '@apollo/client'


export const CREATE_USER = gql`
  mutation($email: String!, $password: String!) {
    createUser(input: {
      email: $email,
      password: $password
    }) {
      user {
        id
      }
    }
  }
`

export const GET_TOKEN = gql`
  mutation($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
  }
`

export const VERIFY_TOKEN = gql`
  mutation($token: String) {
    verifyToken(token: $token) {
      payload
    }
  }
`

export const REFRESH_TOKEN = gql`
  mutation($token: String) {
    refreshToken(token: $token) {
      token
    }
  }
`

// export const CREATE_PROFILE = gql`
//   mutation() {
//     createProfile(input: {
//       userProfInput
//     }) {
//       userProfInput {
//         username
//         firstName
//         lastName
//       }
//       local
//       bio
//       bioProfInput {
//         githubUrl
//         qiitaUrl
//         twitterUrl
//         websiteUrl
//       }
//     }
//   }
// `

// export const UPDATE_PROFILE = gql`
//   mutation() {
//     updateProfile(input: {

//     }) {
//       userProfInput {
//         username
//         firstName
//         lastName
//       }
//       local
//       bio
//       bioProfInput {
//         githubUrl
//         qiitaUrl
//         twitterUrl
//         websiteUrl
//       }
//     }
//   }
// `

export const CREATE_LINK_IN_BIO = gql`
  mutation($githubUrl: String!, $qiitaUrl: String, $twitterUrl: String, $websiteUrl: String) {
    createLinkInBio(input: {
      githubUrl: $githubUrl,
      qiitaUrl: $qiitaUrl,
      twitterUrl: $twitterUrl,
      websiteUrl: $websiteUrl
    }) {
      linkInBio {
        githubUrl
        qiitaUrl
        twitterUrl
        websiteUrl
      }
    }
  }
`

export const UPDATE_LINK_IN_BIO = gql`
  mutation($id: Uuid!, $githubUrl: String, $qiitaUrl: String, $twitterUrl: String, $websiteUrl: String) {
    createLinkInBio(input: {
      id: $id
      githubUrl: $githubUrl,
      qiitaUrl: $qiitaUrl,
      twitterUrl: $twitterUrl,
      websiteUrl: $websiteUrl
    }) {
      linkInBio {
        githubUrl
        qiitaUrl
        twitterUrl
        websiteUrl
      }
    }
  }
`

export const ADD_TAG = gql`
  mutation($name: String!) {
    addTag(input: { name: $name }) {
      tag {
        name
      }
    }
  }
`

export const REMOVE_TAG = gql`
  mutation($id: Uuid!) {
    removeTag(input: { id: $id }) {
      tag {
        id
      }
    }
  }
`

export const ADD_CATEGORY = gql`
  mutation($name: String!) {
    addCategory(input: { name: $name }) {
      category {
        name
      }
    }
  }
`

export const REMOVE_CATEGORY = gql`
  mutation($id: Uuid!) {
    removeCategory(input: { id: $id }) {
      category {
        id
      }
    }
  }
`

export const CREATE_POST = gql`
  mutation($title: String!, $description: String, $thumbnail: thumbnail, $content: String!, $tags: [String], $category: String!, $is_publish: Boolean!) {
    createPost(input: {
      title: $title
      description: $description
      thumbnail: $thumbnail
      content: $content
      tags: $tags
      category: $category
      is_publish: $is_publish
    }) {
      post {
        title
        description
        thumbnail
        content
        tags {
          name
        }
        category {
          name
        }
        is_publish
      }
    }
  }
`

export const UPDATE_POST = gql`
  mutation($id: Uuid!, $title: String, $description: String, $thumbnail: thumbnail, $content: String, $tags: [Uuid], $category: String, $is_publish: Boolean!) {
    createPost(input: {
      id: $id
      title: $title
      description: $description
      thumbnail: $thumbnail
      content: $content
      tags: $tags
      category: $category
      is_publish: $is_publish
    }) {
      post {
        id
        title
        description
        thumbnail
        content
        tags {
          name
        }
        category {
          name
        }
        is_publish
      }
    }
  }
`

export const DELETE_POST = gql`
  mutation($id: Uuid!) {
    deletePost(input: { id: $id })
  } {
    post {
      id
    }
  }
`
