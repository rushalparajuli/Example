import z from "zod";
import type { IImage } from "../../common/GlobalType";

export interface ICategoryCreateData {
    name: string,
    status: string,
    image: File
}

export interface ICategoryEditData {
    name: string,
    status: string,
    image?: File | null
}

export interface ICategory {
    _id: string,
    name: string,
    image: IImage,
    status: string,
}

export const CategoryDTO = z.object({
    name: z.string().min(3, "Atleast 3 character is required for name").nonempty("Title is required"),
    status: z.string().regex(/^(active|inactive)$/, "Status can only be either Published or Unpublished").nonempty("Status is required"),
    image: z.file().nonoptional()
})

export const CategoryEditDTO = z.object({
    name: z.string().min(3, "Atleast 3 character is required for name").nonempty("Title is required"),
    status: z.string().regex(/^(active|inactive)$/, "Status can only be either Published or Unpublished").nonempty("Status is required"),
    image: z.file().optional().nullable()
})

