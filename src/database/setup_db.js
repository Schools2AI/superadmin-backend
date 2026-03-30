import pool from "./db.js";

const setupDatabase = async () => {
    try {
        // 1. Create Schools Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS schools (
                school_id INT AUTO_INCREMENT PRIMARY KEY,
                school_name VARCHAR(255) NOT NULL,
                country VARCHAR(100) NOT NULL,
                state VARCHAR(100) NOT NULL,
                city VARCHAR(100) NOT NULL,
                pincode VARCHAR(20) NOT NULL,
                timezone VARCHAR(50) NOT NULL,
                cost DECIMAL(10,2) DEFAULT 0.00,
                student_count INT DEFAULT 0,
                teacher_count INT DEFAULT 0,
                language_preference VARCHAR(50),
                board VARCHAR(50),
                onboard_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                status ENUM('Active','Suspended','Trial','Archived') DEFAULT 'Trial',
                website_enabled BOOLEAN DEFAULT FALSE,
                allowed_domains TEXT,
                class_count INT DEFAULT 0
            )
        `);

        // 2. Create Roles Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS roles (
                id INT AUTO_INCREMENT PRIMARY KEY,
                role VARCHAR(100) NOT NULL
            )
        `);

        // 3. Create Users Table
        await pool.query(`
         CREATE TABLE  IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    school_id BIGINT,
    username VARCHAR(100) ,
    full_name VARCHAR(150),
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    email VARCHAR(150) NOT NULL,
    role_id BIGINT,
    status ENUM('ACTIVE','INACTIVE','SUSPENDED') DEFAULT 'ACTIVE',
    avatar VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_users_school 
        FOREIGN KEY (school_id) REFERENCES schools(id),

    CONSTRAINT fk_users_role 
        FOREIGN KEY (role_id) REFERENCES roles(id)
);
        `);

        // 4. Create Features Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS features (
                id INT AUTO_INCREMENT PRIMARY KEY,
                feature_name VARCHAR(255) NOT NULL,
                description TEXT NULL,
                is_ai BOOLEAN DEFAULT FALSE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // 5. Create OTPs Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS otps (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_identifier VARCHAR(255) NOT NULL,
                otp VARCHAR(10) NOT NULL,
                expires_at DATETIME NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // 6. Create School Features Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS school_features (
                id INT AUTO_INCREMENT PRIMARY KEY,
                school_id INT NOT NULL,
                feature_id INT NOT NULL,
                is_enabled BOOLEAN DEFAULT FALSE,
                enabled_at DATETIME NULL,
                FOREIGN KEY (school_id) REFERENCES schools(school_id) ON DELETE CASCADE,
                FOREIGN KEY (feature_id) REFERENCES features(id) ON DELETE CASCADE
            )
        `);

        // 7. Create Permissions Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS permissions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL UNIQUE,
                description VARCHAR(255) NULL
            )
        `);

        // 8. Create Role Permissions Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS role_permissions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                role_id INT NOT NULL,
                permission_id INT NOT NULL,
                FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
                FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
            )
        `);

        // SEEDING INITIAL DATA

        // Seed Roles if empty
        const [roles] = await pool.query("SELECT COUNT(*) as count FROM roles");
        if (roles[0].count === 0) {
            await pool.query(
                "INSERT INTO roles (role, school_id) VALUES ('SUPER_ADMIN', NULL)",
            );
            console.log("Seeded roles table.");
        }

        // Seed Features if empty
        const [features] = await pool.query(
            "SELECT COUNT(*) as count FROM features",
        );
        if (features[0].count === 0) {
            await pool.query(`
                INSERT INTO features (feature_name, description) VALUES
                ('AI Chatbot', 'Interactive AI chatbot for student queries and assistance'),
                ('AI Notes Generation', 'Automatically generate study notes using AI'),
                ('AI Summarization', 'Summarize long content into concise explanations'),
                ('AI Practice Questions & Smart Assessment', 'Generate practice questions and evaluate student performance'),
                ('AI Voice Tutor', 'Voice-based AI tutor for interactive learning'),
                ('English Speaking & Practice Bot', 'Improve English speaking and conversation skills'),
                ('AI Essay Writing Assistant', 'AI-powered essay writing support for students'),
                ('Student Activity History', 'Track and display student learning activities'),
                ('Student Profile', 'Manage student personal and academic profiles'),
                ('Feedback System', 'Collect and manage feedback from students'),
                ('Support Ticket System', 'Handle support requests and issue tracking'),
                ('Presentation Generation', 'Generate presentations automatically using AI')
            `);
            console.log("Seeded features table.");
        }

        // Seed Permissions if empty
        const [perms] = await pool.query(
            "SELECT COUNT(*) as count FROM permissions",
        );
        if (perms[0].count === 0) {
            await pool.query(`
                INSERT INTO permissions (name, description) VALUES
                ('SCHOOL:CREATE', 'Create schools'),
                ('SCHOOL:EDIT', 'Edit schools'),
                ('SCHOOL:DELETE', 'Delete schools'),
                ('SCHOOL:VIEW', 'View schools')
            `);
            console.log("Seeded permissions table.");
        }

        // Seed Role Permissions if empty (linking SUPER_ADMIN to all initial permissions)
        const [rolePerms] = await pool.query(
            "SELECT COUNT(*) as count FROM role_permissions",
        );
        if (rolePerms[0].count === 0) {
            const [adminRole] = await pool.query(
                "SELECT id FROM roles WHERE role = 'SUPER_ADMIN' LIMIT 1",
            );
            const [allPerms] = await pool.query("SELECT id FROM permissions");

            if (adminRole.length > 0 && allPerms.length > 0) {
                const values = allPerms
                    .map((p) => `(${adminRole[0].id}, ${p.id})`)
                    .join(",");
                await pool.query(
                    `INSERT INTO role_permissions (role_id, permission_id) VALUES ${values}`,
                );
                console.log("Seeded role_permissions table.");
            }
        }

        console.log("Database setup completed successfully.");
    } catch (error) {
        console.error("Error setting up database:", error);
        throw error;
    }
};

export default setupDatabase;
