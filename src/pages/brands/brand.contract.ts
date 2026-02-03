import z from "zod";
import type { IImage } from "../../common/GlobalType";

export interface IBrandCreateData {
    name: string,
    status: string,
    logo: File
}

export interface IBrandEditData {
    name: string,
    status: string,
    logo?: File | null
}

export interface IBrand {
    _id: string,
    name: string,
    logo: IImage,
    status: string,
}

export const BrandDTO = z.object({
    name: z.string().min(3, "Atleast 3 character is required for name").nonempty("Title is required"),
    status: z.string().regex(/^(active|inactive)$/, "Status can only be either Published or Unpublished").nonempty("Status is required"),
    logo: z.file().nonoptional()
})

export const BrandEditDTO = z.object({
    name: z.string().min(3, "Atleast 3 character is required for name").nonempty("Title is required"),
    status: z.string().regex(/^(active|inactive)$/, "Status can only be either Published or Unpublished").nonempty("Status is required"),
    logo: z.file().optional().nullable()
})

