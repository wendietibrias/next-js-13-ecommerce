import { defineType } from "sanity";

export default defineType({
    name:'banner',
    title:'Banner',
    type:'document',
    fields:[
        {
            name:'title',
            type:'string',
            title:'Title'
        },
        {
            name:'description',
            type:'string',
            title:'Description'
        },
        {
            name:'thumbnail',
            type:'image',
            title:'Thumbnail'
        }
    ]
})