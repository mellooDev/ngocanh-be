require("dotenv").config();

export const config = {
    port: process.env.PORT || 8096,
    limit_size: process.env.LIMIT_SIZE || 3145728,
    db: {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT || 5432),
        username: process.env.DB_USERNAME || "postgres",
        password: process.env.DB_PASSWORD || "root",
        database: process.env.DB_NAME || "project_management_utehy",
    },
    jwt: {
        secret: process.env.JWT_SECRET || "this is the graduation project",
        expiresIn: process.env.JWT_EXPIRES_IN || "2d",
    },
};

export const authConfig = {
    jwtSecret: process.env.JWT_SECRET || "toi yeu ngoc anh",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
    cookieName: "auth_token",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "sao lai refresh",
    refreshExpiresIn: "7d",
    refreshCookieName: "refresh_token",
    emailVerificationExpires: "1d",
    passwordResetExpires: "1h",
};

export const rateLimitConfig = {
    login: {
        windowMs: 24 * 60 * 60 * 1000,
        max: 100
    }
}