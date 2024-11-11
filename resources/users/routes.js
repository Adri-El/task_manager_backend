const userServices = require('./services')

const userSchemas = {
  mutation: `
  signup(firstName: String!, lastName: String!, username: String!, password: String!): Auth
  logout: Success
`,
  query: `
  login(username: String!, password: String!): Auth
  get_user: User
  login_status: LoginStatus
`
}


const userResolvers = {
  Mutation: {
    signup: async (payload, context) => {
      try {
        return await userServices.signup(payload);
      } catch (error) {
        throw new Error(error.message);
      }
    },

    logout: async (payload, context) => {
      try {
        return await userServices.logout(context);
      } catch (error) {
        throw new Error(error.message);
      }
    }
  },

  Query: {
    login: async (payload, context) => {
      try {
        return await userServices.login(payload, context);
      } catch (error) {
        throw new Error(error.message);
      }
    },

    login_status: async (payload, context) => {
      try {
        return await userServices.login_status(context);
      } catch (error) {
        throw new Error(error.message);
      }
    },

    get_user: async(payload, context)=>{
      try {
        return await userServices.get_user(context)
      } 
      catch (error) {
        throw new Error(error.message);
      }
    }
  }

};

module.exports = {userSchemas, userResolvers};
