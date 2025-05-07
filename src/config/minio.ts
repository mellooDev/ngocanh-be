export const minioConfig = {
    endPoint: process.env.MINIO_ENDPOINT || 'localhost',
    port: parseInt(process.env.MINIO_PORT || '9000'),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY || 'your-access-key',
    secretKey: process.env.MINIO_SECRET_KEY || 'your-secret-key',
    bucketName: process.env.MINIO_BUCKET || 'your-bucket-name',
}