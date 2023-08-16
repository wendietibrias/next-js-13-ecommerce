import { createClient } from "next-sanity";

export const sanityClient = createClient({
    projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset:process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn:true,
    apiVersion: '2023-05-03'
});