/*if(process.env.NODE_ENV == 'production'){
   const server = process.env.LIVE_URL;
} else if (process.env.NODE_ENV == 'staging'){
    const server = process.env.STAGING_URL;
} else {
    const server = process.env.TEST_URL;
}*/

export const server = process.env.TEST_URL;