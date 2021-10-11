export const server = (process.env.NODE_ENV == 'production') ? process.env.LIVE_URL
    : (process.env.NODE_ENV == 'staging') ? process.env.STAGING_URL
    : process.env.TEST_URL;