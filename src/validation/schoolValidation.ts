import { z } from "zod";

const schema = z
    .object({
        name: z.string().nonempty(),

        // role_id: z.number().positive(),

        // school_id: z.number().positive(),

        email: z.email(),

        mobileNo: z.string(),
        // password: z.string().min(6),

        timeZone: z.string(),

        description: z.string().optional(),

        schoolName: z.string().min(2),

        country: z.string().min(2),

        state: z.string().min(2),

        city: z.string().min(2),

        pincode: z.string(),

        cost: z.number().positive(),

        studentCount: z.number().positive(),

        teacherCount: z.number().positive(),

        language: z.string().min(1),

        board: z.enum(["CBSE", "ICSE", "State", "IB", "IGCSE"]),

        status: z.enum(["Active", "Inactive"]),

        website: z.boolean(),

        domains: z.string().optional(),
        classCount: z.number().positive(),
    })
    .strict();

export const schoolValidation = (obj: newSchool) => {
    return schema.parse(obj);
};

export type newSchool = z.infer<typeof schema>;
