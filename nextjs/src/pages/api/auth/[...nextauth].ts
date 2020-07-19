import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Github from '../../../auth/providers/Github';
const options = {
	site: process.env.SITE || 'http://localhost:3000',
	// Configure one or more authentication providers
	providers: [
		Github({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET
		}),
		Providers.Credentials({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: 'Email',
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: {
				username: { label: "Username", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" }
			},
			authorize: async (credentials) => {
				// Add logic here to look up the user from the credentials supplied
				const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }

				if (user) {
					// Any object returned will be saved in `user` property of the JWT
					return Promise.resolve(user)
				} else {
					// If you return null or false then the credentials will be rejected
					return Promise.resolve(null)
				}
			}
		})
	],
	//   https://next-auth.js.org/configuration/callbacks
	callbacks: {
		signin: async (profile, account, metadata) => {
			return Promise.resolve(true);
		},
		// jwt: async (token, oAuthProfile) => {}
		// redirect: async (url, baseUrl) => { },
		// session: async (session, token) => { },
	},
	events: {
		signin: async (message) => { /* on successful sign in */ },
		signout: async (message) => { /* on signout */ },
		createUser: async (message) => { /* user created */ },
		linkAccount: async (message) => { /* account linked to a user */ },
		session: async (message) => { /* session is active */ },
		error: async (message) => { /* error in authentication flow */ }
	}

	// A database is optional, but required to persist accounts in a database
	//   database: process.env.DATABASE_URL,
}

export default (req, res) => NextAuth(req, res, options);