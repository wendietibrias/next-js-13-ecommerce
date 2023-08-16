import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './sanityClient';

const builder = imageUrlBuilder(sanityClient);

const urlFor = (source : any) => {
    return builder.image(source)
}

export default urlFor;