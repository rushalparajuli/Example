import { useForm } from "react-hook-form";
import { TableHedaer } from "../../components/ui/TableHeader";
import { useAuth } from "../../hooks/auth";
import { CategoryDTO, type ICategoryCreateData } from "./category.contract";
import { FormLabel } from "../../components/form/FormLabel";
import { FileInput, FormInputControl, SelectInput } from "../../components/form/FormInput";
import { FormCancelButton, FormSubmitButton } from "../../components/form/FormAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axiosInstance from "../../config/axios.config";
import { useNavigate } from "react-router";

export default function CategoryCreatePage() {
    const { loggedInUser } = useAuth()
    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<ICategoryCreateData>({
        defaultValues: {
            name: "",
            status: "",
            image: {} as File
        },
        resolver: zodResolver(CategoryDTO)
    })
    const navigate = useNavigate()
    const submitHandler = async (data: ICategoryCreateData) => {
        try {
            await axiosInstance.post("/category", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            toast.success("Category created successfully!")
            navigate(`/${loggedInUser?.role}/categories`)
        }
        catch (error: any) {
            console.error("Category create error:", error?.response || error)

            toast.error(
                error?.response?.data?.message ||
                "Could not create category at this moment, try again later!!!"
            )
        }
    }
    return (<section className="flex flex-col gap-6">
        <TableHedaer title="Category Create Page" showSearch={false} btnTxt="<-Go Back" btnUrl={`/${loggedInUser?.role}/categories`} />
        <div className="overflow-x-auto rounded-lg shadow bg-gray-200 p-5">
            <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-5">
                <div className="flex">
                    <FormLabel htmlFor="title" >Name:</FormLabel>
                    <div className="w-3/4">
                        <FormInputControl
                            control={control}
                            name="name"
                            type="text"
                            placeholder="Enter category name here..."
                            errMsg={errors.name?.message}
                        />
                    </div>
                </div>
                <div className="flex">
                    <FormLabel htmlFor="status" >Status:</FormLabel>
                    <div className="w-3/4">
                        <SelectInput
                            name="status"
                            control={control}
                            errMsg={errors.status?.message}
                            options={[
                                { label: "Published", value: "active" },
                                { label: "Unpublished", value: "inactive" }
                            ]}
                        />
                    </div>
                </div>
                <div className="flex">
                    <FormLabel htmlFor="image" >Logo:</FormLabel>
                    <div className="w-3/4">
                        <FileInput
                            name="image"
                            control={control}
                            errMsg={errors.image?.message} />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row w-full  justify-end">
                    <div className="w-3/4 flex gap-3">
                        <FormCancelButton disabled={isSubmitting} label="Reset" />
                        <FormSubmitButton disabled={isSubmitting} label="Submit" />
                    </div>
                </div>
            </form>
        </div>
    </section>)
}