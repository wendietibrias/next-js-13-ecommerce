import { defineType } from "sanity";

export default defineType({
    name:'category',
    title:'Category',
    type:'document',
    fields:[
        {
            name:'title',
            title:'Title',
            type:'string',
            
        },
        {
            name:'slug',
            title:'Slug',
            type:'slug'
        }
    ]
})