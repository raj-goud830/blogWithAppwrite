import { Client, Condition, ID} from "appwrite";
import conf from "../conf/conf";
export class AuthService { 
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.APPWRITE_URL)
            .setProject(conf.PROJECT_ID);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
       try {
           const userAccount = await this.account.create(ID.unique(), email, password, name);
              return userAccount;
       } catch (error) {
        throw error;
       }    
    }

    async logIn({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password); 
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
           return await this.account.get();
        } catch (error) {
            console.log(error);
        }

        return null;
    }

    async logOut() { 
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authSerivce = new AuthService();

export default AuthService;