import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    Databases;
    buckets;

     constructor() {
        this.client
            .setEndpoint(conf.APPWRITE_URL)
            .setProject(conf.PROJECT_ID);
        this.Databases = new Databases(this.client);
        this.buckets = new buckets(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }){
        try {
            return await this.Databases.createPost(
                conf.DATABASE_ID,
                conf.BUCKET_ID,
                slug,
                {
                    title, 
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log(error)
        } 
    }

    async updatePost(slug, { title, content, featuredImage, status }){
        try {
            return await this.Databases.updateDocument(
                conf.DATABASE_ID,
                conf.BUCKET_ID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    async deletePost(slug) {
        try {
            return await this.Databases.deleteDocument(
                conf.DATABASE_ID,
                conf.BUCKET_ID,
                slug
            )
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }
 
    async getPost(slug) {
        try {
            return await this.Databases.getDocument(
                conf.DATABASE_ID,
                conf.BUCKET_ID,
                slug
            )
        } catch (error) {
            console.log(error);
        }
    }

    async getPosts(queries = [Query.equal("status", "acctive")]) {
            try {
                return await this.Databases.listDocuments(
                    conf.DATABASE_ID,
                    conf.BUCKET_ID,
                    queries
                )
            } catch (error) {
                console.log(error)
            }        
    }

    // file handling
    async fileUpload(file){
        try {
            return await this.buckets.createFile(
                conf.BUCKET_ID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(error)
        }

    }

    async deleteFile(fileId) {
        try {
            return await this.buckets.deleteDocument(
                conf.BUCKET_ID,
                fileId
            )
        } catch (error) {
            console.log(error)
        }
    }

    getFilePreview(fileId) {
        return this.buckets.getFilePreview(
            conf.BUCKET_ID,
            fileId
           )
    }


    getFileDownload(fileId) {
        return this.buckets.getFileDownload(
            conf.BUCKET_ID,
            fileId
        )
    }
}


const Service = new Service();

export default Service;