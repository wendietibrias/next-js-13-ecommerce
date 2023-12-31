import { defineType,defineField } from "sanity"

export default defineType({
    name:"product",
    title:"Product",
    type:"document",
    fields:[
        {
            name:'title',
            title:'Title',
            type:'string'
        },
        {
            name:'price',
            title:'Price',
            type:'number'
        },
        {
            name:'description',
            title:'Description',
            type:'text'
        },
        {
             name:'category',
             type:'reference',
             title:'Category',
             to:[{ type:'category' }]
        },
        {
            name:'stock',
            title:'Stock',
            type:'number'
        },
        {
            name:'slug',
            title:'Slug',
            type:'slug'
        },
        {
            name:'excerpt',
            title:'Excerpt',
            type:'string'
        },
        {
            name:'recommended',
            title:'Recommended',
            type:'boolean',
        },
        {
            name:'thumbnail',
            title:'Thumbnail',
            type:'image'
        },
        {
            name:'images',
            title:'Images',
            type:'array',
            of:[
                defineField({
                    name:'image',
                    type:'image',
                    title:'Image'
                })
            ]
        }
    ]
})